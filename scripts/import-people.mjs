import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  applyImport,
  assertDestinations,
  contentRoot,
  json,
  packageValidator,
  readCollection,
  readPackages,
  root,
} from "./content-package-utils.mjs";

const inbox = join(root, "inbox-people");
const archive = join(inbox, "archive");
const schemaPath = join(root, "public/schemas/person-package.schema.json");

export function partitionProposedObservations(observations) {
  return {
    confirmed: observations.filter((item) => !item.hairstyleId.startsWith("PROPOSED-")),
    proposed: observations.filter((item) => item.hairstyleId.startsWith("PROPOSED-")),
  };
}

// Kept as a pure package preflight helper for the legacy package-validation unit tests.
export function validatePackages(packages, data, validatePayload) {
  const errors = [];
  const peopleIds = new Set(data.personIds);
  const slugs = new Set(data.slugs);
  const photoIds = new Set(data.photoIds);
  const appearanceIds = new Set(data.appearanceIds);
  const profileIds = new Set(data.profileIds);
  const styleIds = data.styleIds;
  const folders = new Set();
  const planned = [];
  const proposedHairstyles = [];
  for (const item of packages) {
    const { folderName, payload } = item;
    if (folders.has(folderName)) errors.push(`${folderName}: duplicate inbox folder.`);
    folders.add(folderName);
    for (const error of validatePayload(payload)) errors.push(`${folderName}/payload.json: ${error}`);
    if (
      !payload?.person ||
      !Array.isArray(payload?.photographs) ||
      !Array.isArray(payload?.appearances) ||
      !payload?.naturalProfile
    )
      continue;
    const { person, naturalProfile: profile } = payload;
    if (folderName !== person.slug) errors.push(`${folderName}: folder must match person slug ${person.slug}.`);
    if (peopleIds.has(person.id)) errors.push(`${folderName}: person id ${person.id} already exists.`);
    peopleIds.add(person.id);
    if (slugs.has(person.slug)) errors.push(`${folderName}: person slug ${person.slug} already exists.`);
    slugs.add(person.slug);
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
    ]) {
      if (profile[key]?.value === null && profile[key]?.provenance?.confidence !== "low")
        errors.push(`${folderName}: ${key} may be null only with low confidence.`);
    }
    const localPhotos = new Set();
    for (const photo of payload.photographs) {
      if (localPhotos.has(photo.id)) errors.push(`${folderName}: duplicate photo id ${photo.id}.`);
      localPhotos.add(photo.id);
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
    }
    if (!localPhotos.has(person.heroImageId))
      errors.push(`${folderName}: heroImageId must reference a package photograph.`);
    if (profileIds.has(`natural-profile-${person.slug}`))
      errors.push(`${folderName}: profile id natural-profile-${person.slug} already exists.`);
    profileIds.add(`natural-profile-${person.slug}`);
    const usedPhotos = new Set();
    for (const appearance of payload.appearances) {
      if (appearanceIds.has(appearance.id))
        errors.push(`${folderName}: appearance id ${appearance.id} already exists.`);
      appearanceIds.add(appearance.id);
      if (!localPhotos.has(appearance.imageId))
        errors.push(`${folderName}: appearance ${appearance.id} references unknown photo ${appearance.imageId}.`);
      usedPhotos.add(appearance.imageId);
      for (const observation of appearance.observations) {
        if (!observation.hairstyleId.startsWith("PROPOSED-") && !styleIds.has(observation.hairstyleId)) {
          errors.push(
            `${folderName}: appearance ${appearance.id} references unknown hairstyle ${observation.hairstyleId}; use PROPOSED-<kebab-case> only for a clearly distinct missing style.`,
          );
        }
        if (observation.hairstyleId.startsWith("PROPOSED-"))
          proposedHairstyles.push({
            folderName,
            appearanceId: appearance.id,
            id: observation.hairstyleId,
            note: observation.note,
          });
      }
    }
    for (const id of localPhotos)
      if (!usedPhotos.has(id)) errors.push(`${folderName}: photo ${id} is not used by an appearance.`);
    planned.push(item);
  }
  return { errors: [...new Set(errors)], planned, proposedHairstyles };
}

function planPackages(packages, validatePayload, data) {
  const errors = [];
  const outputs = new Map();
  const copies = [];
  const people = new Map(data.people.map((item) => [item.id, item]));
  const slugs = new Set(data.people.map((item) => item.slug));
  const profiles = new Map(data.naturalProfiles.map((item) => [item.id, item]));
  const appearances = new Map(data.appearances.map((item) => [item.id, item]));
  const media = new Map(data.media.map((item) => [item.id, item]));
  const hairstyles = new Map(data.hairstyles.map((item) => [item.id, item]));
  const usedFolders = new Set();
  const proposals = [];
  for (const item of packages) {
    const { folderName, payload, imageFiles } = item;
    if (usedFolders.has(folderName)) errors.push(`${folderName}: duplicate package folder.`);
    usedFolders.add(folderName);
    for (const error of validatePayload(payload)) errors.push(`${folderName}/payload.json ${error}`);
    if (
      !payload?.person ||
      !payload?.naturalProfile ||
      !Array.isArray(payload?.photographs) ||
      !Array.isArray(payload?.appearances)
    )
      continue;
    const person = payload.person;
    const profileId = `natural-profile-${person.slug}`;
    if (folderName !== person.slug) errors.push(`${folderName}: folder must match person slug "${person.slug}".`);
    if (people.has(person.id)) errors.push(`${folderName}: person id "${person.id}" already exists.`);
    if (slugs.has(person.slug)) errors.push(`${folderName}: person slug "${person.slug}" already exists.`);
    people.set(person.id, person);
    slugs.add(person.slug);
    if (profiles.has(profileId)) errors.push(`${folderName}: natural profile id "${profileId}" already exists.`);
    if (payload.naturalProfile.personId && payload.naturalProfile.personId !== person.id)
      errors.push(`${folderName}: naturalProfile.personId must match "${person.id}".`);
    if (payload.naturalProfile.id && payload.naturalProfile.id !== profileId)
      errors.push(`${folderName}: naturalProfile.id must be "${profileId}".`);
    const profile = { ...payload.naturalProfile, id: profileId, personId: person.id };
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
    ]) {
      if (profile[key]?.value === null && profile[key]?.provenance?.confidence !== "low")
        errors.push(`${folderName}: ${key} may be null only with low confidence.`);
    }
    profiles.set(profileId, profile);

    const localMedia = new Map();
    const fileSet = new Set(imageFiles);
    for (const photo of payload.photographs) {
      if (localMedia.has(photo.id) || media.has(photo.id))
        errors.push(`${folderName}: media id "${photo.id}" already exists.`);
      if (
        basename(photo.fileName) !== photo.fileName ||
        photo.fileName.replace(/\.(?:jpe?g|png|webp)$/i, "") !== photo.id
      )
        errors.push(`${folderName}: media id must match a safe image filename stem "${photo.fileName}".`);
      if (!fileSet.has(photo.fileName)) errors.push(`${folderName}: image file is missing: "${photo.fileName}".`);
      if (
        photo.provenance?.licenseType === "licensed" &&
        (photo.provenance.costFree !== true ||
          photo.provenance.commercialUse !== true ||
          photo.provenance.derivativesAllowed !== true)
      )
        errors.push(`${folderName}: licensed photo ${photo.id} must allow cost-free commercial use and derivatives.`);
      if (
        ["licensed", "public-domain"].includes(photo.provenance?.licenseType) &&
        (!photo.provenance.attribution ||
          !photo.provenance.creator ||
          !photo.provenance.licenseUrl ||
          !photo.provenance.rightsEvidenceUrl ||
          !photo.provenance.rightsBasis)
      )
        errors.push(`${folderName}: photo ${photo.id} lacks required credit or rights evidence.`);
      localMedia.set(photo.id, photo);
      media.set(photo.id, photo);
    }
    for (const filename of imageFiles)
      if (![...localMedia.values()].some((photo) => photo.fileName === filename))
        errors.push(`${folderName}: image "${filename}" has no photograph record.`);
    if (!localMedia.has(person.heroImageId))
      errors.push(`${folderName}: heroImageId must reference one package photograph.`);

    const usedImages = new Set();
    for (const appearance of payload.appearances) {
      if (appearances.has(appearance.id))
        errors.push(`${folderName}: appearance id "${appearance.id}" already exists.`);
      if (!localMedia.has(appearance.imageId))
        errors.push(
          `${folderName}: appearance "${appearance.id}" references unknown package media "${appearance.imageId}".`,
        );
      usedImages.add(appearance.imageId);
      const { value, precision } = appearance.taken;
      if (
        (precision === "year" && !/^\d{4}$/.test(value)) ||
        (precision === "day" &&
          (!/^\d{4}-\d{2}-\d{2}$/.test(value) ||
            Number.isNaN(Date.parse(value)) ||
            new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) !== value))
      )
        errors.push(`${folderName}: invalid date/precision in appearance "${appearance.id}".`);
      for (const observation of appearance.observations) {
        if (observation.hairstyleId.startsWith("PROPOSED-"))
          proposals.push({
            folderName,
            appearanceId: appearance.id,
            id: observation.hairstyleId,
            note: observation.note,
          });
        else if (!hairstyles.has(observation.hairstyleId))
          errors.push(
            `${folderName}: appearance "${appearance.id}" references unknown hairstyle "${observation.hairstyleId}".`,
          );
      }
      appearances.set(appearance.id, appearance);
    }
    for (const photoId of localMedia.keys())
      if (!usedImages.has(photoId)) errors.push(`${folderName}: photograph "${photoId}" is not used in an appearance.`);
    if (payload.photographs.length !== imageFiles.length)
      errors.push(`${folderName}: every supplied image must have exactly one photograph record.`);
  }

  if (errors.length) return { errors: [...new Set(errors)], outputs, copies, packages, proposals };
  for (const item of packages) {
    const { person, naturalProfile, photographs, appearances: packageAppearances } = item.payload;
    const profile = { ...naturalProfile, id: `natural-profile-${person.slug}`, personId: person.id };
    outputs.set(join(contentRoot, "people", `${person.id}.json`), json(person));
    outputs.set(join(contentRoot, "natural-profiles", `${profile.id}.json`), json(profile));
    for (const appearance of packageAppearances) {
      const confirmed = partitionProposedObservations(appearance.observations).confirmed;
      outputs.set(
        join(contentRoot, "appearances", `${appearance.id}.json`),
        json({ ...appearance, personId: person.id, observations: confirmed }),
      );
    }
    for (const photo of photographs) {
      const { fileName, provenance: incomingProvenance, ...photoFields } = photo;
      const provenance = { origin: "system", ...incomingProvenance };
      delete provenance.costFree;
      delete provenance.commercialUse;
      delete provenance.derivativesAllowed;
      outputs.set(
        join(contentRoot, "media", `${photo.id}.json`),
        json({
          id: photo.id,
          kind: "image",
          alt: photoFields.alt,
          ...(photoFields.objectPosition ? { objectPosition: photoFields.objectPosition } : {}),
          provenance,
          asset: `assets/people/${fileName}`,
        }),
      );
      copies.push({
        source: join(item.folderPath, fileName),
        destination: join(contentRoot, "assets/people", fileName),
      });
    }
  }
  return { errors: [], outputs, copies, packages, proposals };
}

function parseArgs(args) {
  let apply = false;
  for (const arg of args) {
    if (arg === "--apply") apply = true;
    else if (arg === "--help" || arg === "-h") return { help: true };
    else if (arg !== "--dry-run") throw new Error(`Unknown option: ${arg}`);
  }
  if (args.includes("--apply") && args.includes("--dry-run")) throw new Error("Choose either --apply or --dry-run.");
  return { apply };
}

export async function main(args = process.argv.slice(2)) {
  const options = parseArgs(args);
  if (options.help) {
    console.log(
      "Usage: npm run import:people [-- --dry-run|--apply]\nDefault is a read-only dry run. Apply writes validated JSON records, copies photographs, and archives packages.",
    );
    return;
  }
  const { packages, skipped } = await readPackages(inbox);
  if (!packages.length) {
    console.log("No people packages found.");
    if (skipped.length) console.log(`Skipped: ${skipped.join(", ")}`);
    return;
  }
  const validatePayload = await packageValidator(schemaPath);
  const [people, naturalProfiles, appearances, media, hairstyles] = await Promise.all([
    readCollection("people"),
    readCollection("natural-profiles"),
    readCollection("appearances"),
    readCollection("media"),
    readCollection("hairstyles"),
  ]);
  const plan = planPackages(packages, validatePayload, { people, naturalProfiles, appearances, media, hairstyles });
  if (plan.errors.length) throw new Error(`Import preflight failed:\n- ${plan.errors.join("\n- ")}`);
  await assertDestinations(plan.outputs, plan.copies, packages, archive);
  console.log(`${options.apply ? "Apply" : "Dry run"} plan:`);
  console.log(`- People: ${packages.map((item) => item.payload.person.name).join(", ")}`);
  console.log(`- JSON outputs: ${plan.outputs.size}; photographs: ${plan.copies.length}`);
  console.log(`- Outputs: ${[...plan.outputs.keys()].map((path) => path.slice(root.length + 1)).join(", ")}`);
  console.log(
    `- Archive destinations: ${packages.map((item) => `inbox-people/archive/${item.folderName}`).join(", ")}`,
  );
  if (plan.proposals.length) {
    console.log("- Proposed hairstyles kept in the archived package; not imported as confirmed observations:");
    for (const proposal of plan.proposals)
      console.log(`  - ${proposal.id} in ${proposal.folderName}/${proposal.appearanceId}: ${proposal.note}`);
  }
  if (skipped.length) console.log(`- Skipped: ${skipped.join(", ")}`);
  if (!options.apply) {
    console.log("Preview only; no files changed. Re-run with --apply to import.");
    return;
  }
  await applyImport({ outputs: plan.outputs, copies: plan.copies, folders: packages, inboxPath: inbox });
  console.log("Person package import complete.");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
