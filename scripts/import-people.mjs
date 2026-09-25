import Ajv2020 from "ajv/dist/2020.js";
import { copyFile, mkdir, readFile, readdir, rename, stat, unlink, writeFile } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as prettier from "prettier";
import ts from "typescript";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const inbox = join(root, "inbox-people");
const archive = join(inbox, "archive");
const paths = {
  people: join(root, "src/data/people.ts"),
  profiles: join(root, "src/data/natural-profiles.ts"),
  hairstyles: join(root, "src/data/hairstyles.ts"),
  schema: join(root, "public/schemas/person-package.schema.json"),
  assets: join(root, "src/assets/people"),
};

function die(message) {
  throw new Error(message);
}
function stringProperty(node, key) {
  if (!ts.isObjectLiteralExpression(node)) return undefined;
  const item = node.properties.find(
    (p) => ts.isPropertyAssignment(p) && (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) && p.name.text === key,
  );
  return item && ts.isStringLiteralLike(item.initializer) ? item.initializer.text : undefined;
}
function records(source, fileName, name) {
  const file = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  for (const statement of file.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const decl of statement.declarationList.declarations) {
      if (
        ts.isIdentifier(decl.name) &&
        decl.name.text === name &&
        decl.initializer &&
        ts.isArrayLiteralExpression(decl.initializer)
      )
        return [...decl.initializer.elements];
    }
  }
  die(`Could not find array ${name} in ${fileName}.`);
}
function ids(source, file, name) {
  return new Set(
    records(source, file, name)
      .map((node) => stringProperty(node, "id"))
      .filter(Boolean),
  );
}
function arrayEnd(source, fileName, name) {
  const file = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  for (const statement of file.statements)
    if (ts.isVariableStatement(statement))
      for (const d of statement.declarationList.declarations) {
        if (
          ts.isIdentifier(d.name) &&
          d.name.text === name &&
          d.initializer &&
          ts.isArrayLiteralExpression(d.initializer)
        )
          return d.initializer.end - 1;
      }
  die(`Could not locate ${name} array.`);
}
function append(source, file, name, items) {
  if (!items.length) return source;
  const end = arrayEnd(source, file, name);
  return source.slice(0, end) + items.map((item) => JSON.stringify(item)).join(",\n") + ",\n" + source.slice(end);
}
function safeVariable(id) {
  const value = id.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
  if (!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(value)) die(`Photo id cannot form a TypeScript import name: ${id}`);
  return value;
}
function tsValue(value, imageVars = new Map(), key = "") {
  if (key === "image" && typeof value === "string" && imageVars.has(value)) return imageVars.get(value);
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((x) => tsValue(x, imageVars)).join(", ")}]`;
  return `{ ${Object.entries(value)
    .map(([k, v]) => `${k}: ${tsValue(v, imageVars, k)}`)
    .join(", ")} }`;
}
function addImports(source, imports) {
  if (!imports.length) return source;
  const lines = [...source.matchAll(/^import .*;\r?$/gm)];
  if (!lines.length) die("Could not locate imports in src/data/people.ts.");
  const last = lines.at(-1);
  const end = last.index + last[0].length;
  return source.slice(0, end) + "\n" + imports.join("\n") + source.slice(end);
}
async function formatted(source, path) {
  return prettier.format(source, { ...((await prettier.resolveConfig(path)) ?? {}), filepath: path });
}
function parseArgs(args) {
  let apply = false,
    mode;
  for (const arg of args) {
    if (arg === "--apply" || arg === "--dry-run") {
      const next = arg === "--apply" ? "apply" : "dry-run";
      if (mode && mode !== next) die("Use either --apply or --dry-run, not both.");
      mode = next;
      apply = next === "apply";
    } else if (arg === "--help" || arg === "-h") return { help: true };
    else die(`Unknown option ${arg}.`);
  }
  return { apply };
}
function validateSchema(schema) {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  ajv.addFormat("uri", {
    type: "string",
    validate: (value) => {
      try {
        return ["http:", "https:"].includes(new URL(value).protocol);
      } catch {
        return false;
      }
    },
  });
  const validate = ajv.compile(schema);
  return (payload) =>
    validate(payload) ? [] : (validate.errors ?? []).map((e) => `${e.instancePath || "/"} ${e.message}`);
}
async function loadPackages() {
  const entries = await readdir(inbox, { withFileTypes: true });
  const folders = entries
    .filter((x) => x.isDirectory() && x.name !== "archive")
    .sort((a, b) => a.name.localeCompare(b.name));
  const packages = [],
    skipped = [];
  for (const folder of folders) {
    const dir = join(inbox, folder.name);
    try {
      const payload = JSON.parse(await readFile(join(dir, "payload.json"), "utf8"));
      const files = (await readdir(dir, { withFileTypes: true }))
        .filter((x) => x.isFile() && /\.(?:jpe?g|png|webp)$/i.test(x.name))
        .map((x) => x.name);
      packages.push({ folderName: folder.name, dir, payload, files });
    } catch (e) {
      skipped.push(`${folder.name} (${e.message})`);
    }
  }
  return { packages, skipped };
}
export function partitionProposedObservations(observations) {
  return {
    confirmed: observations.filter((item) => !item.hairstyleId.startsWith("PROPOSED-")),
    proposed: observations.filter((item) => item.hairstyleId.startsWith("PROPOSED-")),
  };
}

export function validatePackages(packages, data, validatePayload) {
  const errors = [],
    peopleIds = new Set(data.personIds),
    slugs = new Set(data.slugs),
    photoIds = new Set(data.photoIds),
    appearanceIds = new Set(data.appearanceIds),
    profileIds = new Set(data.profileIds),
    styleIds = data.styleIds;
  const folders = new Set(),
    planned = [],
    proposedHairstyles = [];
  for (const item of packages) {
    const { folderName, payload } = item;
    if (folders.has(folderName)) errors.push(`${folderName}: duplicate inbox folder.`);
    folders.add(folderName);
    for (const err of validatePayload(payload)) errors.push(`${folderName}/payload.json: ${err}`);
    if (
      !payload?.person ||
      !Array.isArray(payload?.photographs) ||
      !Array.isArray(payload?.appearances) ||
      !payload?.naturalProfile
    )
      continue;
    const person = payload.person,
      profile = payload.naturalProfile;
    if (folderName !== person.slug) errors.push(`${folderName}: folder must match person slug ${person.slug}.`);
    if (peopleIds.has(person.id)) errors.push(`${folderName}: person id ${person.id} already exists.`);
    peopleIds.add(person.id);
    if (slugs.has(person.slug)) errors.push(`${folderName}: person slug ${person.slug} already exists.`);
    slugs.add(person.slug);
    if (profile.personId && profile.personId !== person.id)
      errors.push(`${folderName}: naturalProfile.personId must be omitted or match ${person.id}.`);
    profile.personId = person.id;
    if (profile.id && profile.id !== `natural-profile-${person.slug}`)
      errors.push(`${folderName}: naturalProfile.id must be natural-profile-${person.slug} or omitted.`);
    profile.id = `natural-profile-${person.slug}`;
    if (profile.hairTypeId.value === null && profile.hairSubtypeId.value !== null)
      errors.push(`${folderName}: subtype cannot be set when broad hair type is unknown.`);
    if (profile.hairSubtypeId.value && profile.hairTypeId.value !== profile.hairSubtypeId.value.replace(/[a-d]$/, ""))
      errors.push(`${folderName}: hair subtype must belong to the selected broad type.`);
    for (const key of [
      "hairTypeId",
      "hairSubtypeId",
      "naturalHairColor",
      "naturalSkinTone",
      "hairThickness",
      "hairDensity",
    ])
      if (profile[key]?.value === null && profile[key]?.provenance?.confidence !== "low")
        errors.push(`${folderName}: ${key} may be null only with low confidence.`);
    const localPhotos = new Set(),
      photoRecords = new Map();
    for (const photo of payload.photographs) {
      if (localPhotos.has(photo.id)) errors.push(`${folderName}: duplicate photo id ${photo.id}.`);
      localPhotos.add(photo.id);
      photoRecords.set(photo.id, photo);
      if (photoIds.has(photo.id)) errors.push(`${folderName}: photo id ${photo.id} already exists.`);
      photoIds.add(photo.id);
      if (!item.files.includes(photo.fileName)) errors.push(`${folderName}: missing image ${photo.fileName}.`);
      if (
        basename(photo.fileName) !== photo.fileName ||
        !/^([a-z0-9]+-)*[a-z0-9]+\.(jpg|jpeg|png|webp)$/i.test(photo.fileName)
      )
        errors.push(`${folderName}: unsafe image filename ${photo.fileName}.`);
      if (photo.fileName.replace(/\.(?:jpe?g|png|webp)$/i, "") !== photo.id)
        errors.push(`${folderName}: photo id must match filename stem ${photo.fileName}.`);
      const rights = photo.provenance ?? {};
      if (
        rights.licenseType === "licensed" &&
        (rights.costFree !== true || rights.commercialUse !== true || rights.derivativesAllowed !== true)
      )
        errors.push(`${folderName}: licensed photo ${photo.id} must permit cost-free commercial use and derivatives.`);
      if (
        ["licensed", "public-domain"].includes(rights.licenseType) &&
        (!rights.attribution ||
          !rights.creator ||
          !rights.licenseUrl ||
          !rights.rightsEvidenceUrl ||
          !rights.rightsBasis)
      )
        errors.push(`${folderName}: photo ${photo.id} lacks required rights and attribution information.`);
    }
    for (const file of item.files)
      if (!payload.photographs.some((p) => p.fileName === file))
        errors.push(`${folderName}: image ${file} has no photograph record.`);
    if (!localPhotos.has(person.heroImageId))
      errors.push(`${folderName}: heroImageId must reference a package photograph.`);
    if (profileIds.has(profile.id)) errors.push(`${folderName}: profile id ${profile.id} already exists.`);
    profileIds.add(profile.id);
    const usedPhotos = new Set();
    for (const appearance of payload.appearances) {
      if (appearanceIds.has(appearance.id))
        errors.push(`${folderName}: appearance id ${appearance.id} already exists.`);
      appearanceIds.add(appearance.id);
      if (!localPhotos.has(appearance.imageId))
        errors.push(`${folderName}: appearance ${appearance.id} references unknown photo ${appearance.imageId}.`);
      usedPhotos.add(appearance.imageId);
      const { value, precision } = appearance.taken;
      if (
        (precision === "year" && !/^\d{4}$/.test(value)) ||
        (precision === "day" &&
          (!/^\d{4}-\d{2}-\d{2}$/.test(value) ||
            Number.isNaN(Date.parse(value)) ||
            new Date(value + "T00:00:00Z").toISOString().slice(0, 10) !== value))
      )
        errors.push(`${folderName}: invalid date/precision on ${appearance.id}.`);
      for (const obs of appearance.observations) {
        if (obs.hairstyleId.startsWith("PROPOSED-")) {
          proposedHairstyles.push({ folderName, appearanceId: appearance.id, id: obs.hairstyleId, note: obs.note });
        } else if (!styleIds.has(obs.hairstyleId)) {
          errors.push(
            `${folderName}: appearance ${appearance.id} references unknown hairstyle ${obs.hairstyleId}; use PROPOSED-<kebab-case> only for a clearly distinct missing style.`,
          );
        }
      }
    }
    for (const id of localPhotos)
      if (!usedPhotos.has(id)) errors.push(`${folderName}: photo ${id} is not used by an appearance.`);
    const total = item.files.length;
    if (payload.photographs.length !== total)
      errors.push(`${folderName}: every supplied image must have one photograph record.`);
    planned.push(item);
  }
  return { errors: [...new Set(errors)], planned, proposedHairstyles };
}
async function prepareOutputs(packages) {
  let peopleSource = await readFile(paths.people, "utf8"),
    profilesSource = await readFile(paths.profiles, "utf8");
  const peopleRecords = [],
    appearances = [],
    naturalProfiles = [],
    imports = [],
    imageCopies = [];
  for (const item of packages) {
    const { person, naturalProfile, photographs, appearances: packageAppearances } = item.payload;
    peopleRecords.push(person);
    appearances.push(
      ...packageAppearances.map((a) => ({
        ...a,
        observations: partitionProposedObservations(a.observations).confirmed,
        personId: person.id,
      })),
    );
    naturalProfiles.push(naturalProfile);
    for (const photo of photographs) {
      const variable = safeVariable(photo.id);
      imports.push(`import ${variable} from "../assets/people/${photo.fileName}";`);
      const { fileName, ...rest } = photo;
      const provenance = { origin: "system", ...rest.provenance };
      delete provenance.costFree;
      delete provenance.commercialUse;
      delete provenance.derivativesAllowed;
      imageCopies.push({ source: join(item.dir, fileName), dest: join(paths.assets, fileName) });
      const rec = {
        id: photo.id,
        kind: "image",
        image: photo.id,
        alt: photo.alt,
        ...(photo.objectPosition ? { objectPosition: photo.objectPosition } : {}),
        provenance,
      };
      peopleRecords.push({ __photoRecord: rec, __variable: variable });
    }
  }
  const personOnly = peopleRecords.filter((x) => !x.__photoRecord);
  const photoOnly = peopleRecords.filter((x) => x.__photoRecord);
  peopleSource = addImports(peopleSource, imports);
  peopleSource = append(peopleSource, paths.people, "people", personOnly);
  peopleSource = append(peopleSource, paths.people, "appearances", appearances);
  const photoCode = photoOnly.map((x) =>
    tsValue({ ...x.__photoRecord, image: x.__photoRecord.id }, new Map([[x.__photoRecord.id, x.__variable]])),
  );
  const photoEnd = arrayEnd(peopleSource, paths.people, "personPhotographs");
  peopleSource =
    peopleSource.slice(0, photoEnd) +
    photoCode.join(",\n") +
    (photoCode.length ? ",\n" : "") +
    peopleSource.slice(photoEnd);
  profilesSource = append(profilesSource, paths.profiles, "naturalProfiles", naturalProfiles);
  return {
    outputs: new Map([
      [paths.people, await formatted(peopleSource, paths.people)],
      [paths.profiles, await formatted(profilesSource, paths.profiles)],
    ]),
    imageCopies,
  };
}
async function assertNoConflicts(packages, imageCopies) {
  for (const item of packages)
    for (const target of [join(archive, item.folderName)]) {
      try {
        await stat(target);
        die(`Destination already exists: ${target}`);
      } catch (e) {
        if (e.code !== "ENOENT") throw e;
      }
    }
  for (const image of imageCopies)
    try {
      await stat(image.dest);
      die(`Photo destination already exists: ${basename(image.dest)}`);
    } catch (e) {
      if (e.code !== "ENOENT") throw e;
    }
}
async function apply(outputs, packages, imageCopies) {
  const originals = new Map(),
    temps = [],
    copied = [],
    written = [],
    moved = [];
  try {
    for (const [path, content] of outputs) {
      originals.set(path, await readFile(path, "utf8"));
      const temp = `${path}.people-import-tmp`;
      await writeFile(temp, content, { flag: "wx" });
      temps.push([temp, path]);
    }
    await mkdir(archive, { recursive: true });
    for (const image of imageCopies) {
      await copyFile(image.source, image.dest, 1);
      copied.push(image.dest);
    }
    for (const [temp, dest] of temps) {
      await rename(temp, dest);
      written.push(dest);
    }
    for (const item of packages) {
      const dest = join(archive, item.folderName);
      await rename(item.dir, dest);
      moved.push([dest, item.dir]);
    }
  } catch (error) {
    for (const [from, to] of moved.reverse()) await rename(from, to).catch(() => {});
    for (const path of written.reverse()) {
      const temp = `${path}.rollback-tmp`;
      await writeFile(temp, originals.get(path))
        .then(() => rename(temp, path))
        .catch(() => unlink(temp).catch(() => {}));
    }
    for (const path of copied.reverse()) await unlink(path).catch(() => {});
    for (const [temp] of temps) await unlink(temp).catch(() => {});
    throw new Error(`Import failed; rollback attempted. ${error.message}`);
  }
}
async function loadExisting() {
  const [people, schema, hairstyleSource] = await Promise.all([
    readFile(paths.people, "utf8"),
    readFile(paths.schema, "utf8").catch(() => "{}"),
    readFile(paths.hairstyles, "utf8"),
  ]);
  const profileSource = await readFile(paths.profiles, "utf8");
  const photoNodes = records(people, paths.people, "personPhotographs");
  const appearancesNodes = records(people, paths.people, "appearances");
  const hairstyleNodes = records(hairstyleSource, paths.hairstyles, "hairstyles");
  return {
    personIds: ids(people, paths.people, "people"),
    slugs: new Set(records(people, paths.people, "people").map((x) => stringProperty(x, "slug"))),
    photoIds: new Set(photoNodes.map((x) => stringProperty(x, "id"))),
    appearanceIds: new Set(appearancesNodes.map((x) => stringProperty(x, "id"))),
    profileIds: ids(profileSource, paths.profiles, "naturalProfiles"),
    styleIds: new Set(hairstyleNodes.map((x) => stringProperty(x, "id"))),
    schema: JSON.parse(schema),
  };
}
async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(
      "Usage: npm run import:people [-- --apply|--dry-run]\nDefault is preview; --apply imports valid folders and archives them.\n",
    );
    return;
  }
  const { packages, skipped } = await loadPackages();
  if (!packages.length) {
    process.stdout.write("No people packages found.\n" + (skipped.length ? `Skipped: ${skipped.join(", ")}\n` : ""));
    return;
  }
  const existing = await loadExisting();
  const validate = validateSchema(existing.schema);
  const plan = validatePackages(packages, existing, validate);
  if (plan.errors.length) die("Import preflight failed:\n- " + plan.errors.join("\n- "));
  const { outputs, imageCopies } = await prepareOutputs(plan.planned);
  await assertNoConflicts(plan.planned, imageCopies);
  const changed = [];
  for (const [path, contents] of outputs) if (contents !== (await readFile(path, "utf8"))) changed.push(path);
  process.stdout.write(`${options.apply ? "Import plan" : "Dry run plan"}:\n`);
  process.stdout.write(
    `- People: ${plan.planned.map((x) => x.payload.person.name).join(", ")}\n- Photos: ${imageCopies.length}\n- Files to update: ${changed.map((x) => x.slice(root.length + 1)).join(", ")}\n- Archive: ${plan.planned.map((x) => `inbox-people/archive/${x.folderName}`).join(", ")}\n`,
  );
  if (plan.proposedHairstyles.length) {
    process.stdout.write("- Proposed hairstyles (kept in archived package; not imported as confirmed IDs):\n");
    for (const proposal of plan.proposedHairstyles)
      process.stdout.write(`  - ${proposal.id} in ${proposal.folderName}/${proposal.appearanceId}: ${proposal.note}\n`);
  }
  if (skipped.length) process.stdout.write(`- Skipped folders: ${skipped.join(", ")}\n`);
  if (!options.apply) {
    process.stdout.write("Preview only; no files changed. Re-run with --apply to import.\n");
    return;
  }
  await apply(outputs, plan.planned, imageCopies);
  process.stdout.write("Import complete; source folders archived.\n");
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    await main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
