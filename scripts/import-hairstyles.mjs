import { readFile } from "node:fs/promises";
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

const inbox = join(root, "inbox-hairstyles");
const archive = join(inbox, "archive");
const schemaPath = join(root, "public/schemas/hairstyle-package.schema.json");
const promptPath = join(root, "docs/media/hairstyle-image-prompts.md");

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, stable(value[key])]),
    );
  return value;
}
const same = (left, right) => JSON.stringify(stable(left)) === JSON.stringify(stable(right));
const byId = (records) => new Map(records.map((record) => [record.id, record]));
const keyForAssessment = (assessment) =>
  [
    assessment.criteria
      .map(({ dimension, valueId }) => `${dimension}=${valueId}`)
      .sort()
      .join("&"),
    assessment.variationId ?? "",
  ].join(":");

async function makePlan(packages, validatePayload, data) {
  const errors = [];
  const outputs = new Map();
  const copies = [];
  const incomingStyles = new Map();
  const incomingSources = new Map();
  const incomingMedia = new Map();
  const incomingExamples = new Map();
  const styleById = byId(data.hairstyles);
  const sourceById = byId(data.sources);
  const mediaById = byId(data.media);
  const exampleById = byId(data.styleExamples);
  const hairTypeIds = new Set(data.hairTypes.map((item) => item.id));
  const usedFolderNames = new Set();

  for (const item of packages) {
    const { folderName, payload, imageFiles } = item;
    if (usedFolderNames.has(folderName)) errors.push(`${folderName}: duplicate package folder.`);
    usedFolderNames.add(folderName);
    for (const error of validatePayload(payload)) errors.push(`${folderName}/payload.json ${error}`);
    const style = payload?.hairstyle;
    if (!style) continue;
    if (folderName !== style.slug) errors.push(`${folderName}: folder name must match hairstyle slug "${style.slug}".`);
    if (styleById.has(style.id) || incomingStyles.has(style.id))
      errors.push(`${folderName}: hairstyle id "${style.id}" already exists.`);
    if ([...styleById.values(), ...incomingStyles.values()].some((record) => record.slug === style.slug))
      errors.push(`${folderName}: hairstyle slug "${style.slug}" already exists.`);
    incomingStyles.set(style.id, style);
    if (style.inventedAt?.sourceId && !style.sourceIds.includes(style.inventedAt.sourceId))
      errors.push(`${folderName}: inventedAt.sourceId must also be included in sourceIds.`);
    if (style.inventor?.sourceId && !style.sourceIds.includes(style.inventor.sourceId))
      errors.push(`${folderName}: inventor.sourceId must also be included in sourceIds.`);

    for (const source of payload.sources ?? []) {
      const prior = incomingSources.get(source.id) ?? sourceById.get(source.id);
      if (prior && !same(prior, source))
        errors.push(`${folderName}: source id "${source.id}" conflicts with existing source data.`);
      incomingSources.set(source.id, source);
    }
    for (const example of payload.styleExamples ?? []) {
      if (incomingExamples.has(example.id) || exampleById.has(example.id))
        errors.push(`${folderName}: style-example id "${example.id}" already exists.`);
      if (!example.hairstyleIds.includes(style.id))
        errors.push(`${folderName}: style example "${example.id}" must reference "${style.id}".`);
      incomingExamples.set(example.id, example);
    }
    const localMedia = new Set();
    const imageFileNames = new Set(imageFiles);
    for (const media of payload.media ?? []) {
      if (localMedia.has(media.id) || incomingMedia.has(media.id) || mediaById.has(media.id))
        errors.push(`${folderName}: media id "${media.id}" already exists.`);
      localMedia.add(media.id);
      if (basename(media.fileName) !== media.fileName || media.fileName.replace(/\.png$/i, "") !== media.id)
        errors.push(`${folderName}: media id must match the PNG filename stem "${media.fileName}".`);
      if (!imageFileNames.has(media.fileName))
        errors.push(`${folderName}: image file is missing: "${media.fileName}".`);
      incomingMedia.set(media.id, media);
    }
    for (const filename of imageFiles)
      if (!localMedia.size || ![...(payload.media ?? [])].some((media) => media.fileName === filename))
        errors.push(`${folderName}: image "${filename}" has no media record.`);
    for (const example of payload.styleExamples ?? [])
      if (!localMedia.has(example.imageId))
        errors.push(`${folderName}: example "${example.id}" references unknown package media "${example.imageId}".`);
    if (new Set((payload.styleExamples ?? []).map((example) => example.imageId)).size !== localMedia.size)
      errors.push(`${folderName}: every package image must be used by exactly one style example.`);

    const promptIds = new Set();
    for (const prompt of payload.imagePrompts ?? []) {
      if (promptIds.has(prompt.mediaId))
        errors.push(`${folderName}: duplicate image prompt for media "${prompt.mediaId}".`);
      promptIds.add(prompt.mediaId);
      if (!localMedia.has(prompt.mediaId))
        errors.push(`${folderName}: image prompt references unknown media "${prompt.mediaId}".`);
    }
    for (const media of payload.media ?? []) {
      if (!promptIds.has(media.id)) errors.push(`${folderName}: media "${media.id}" has no image prompt.`);
      if (media.provenance.promptKey !== media.id)
        errors.push(`${folderName}: promptKey must match media id "${media.id}".`);
    }

    const assessmentKeys = new Set();
    for (const assessment of payload.compatibility ?? []) {
      if (
        assessment.criteria.some(({ dimension, valueId }) => dimension === "hair-type" && !hairTypeIds.has(valueId))
      ) {
        errors.push(`${folderName}: compatibility references an unknown hair-type value.`);
      }
      if (assessment.criteria.some(({ dimension }) => dimension !== "hair-type")) {
        errors.push(`${folderName}: only the hair-type compatibility dimension is currently importable.`);
      }
      const key = keyForAssessment(assessment);
      if (assessmentKeys.has(key)) errors.push(`${folderName}: duplicate compatibility assessment "${key}".`);
      assessmentKeys.add(key);
      if (assessment.variationId && !style.variations.some((variation) => variation.id === assessment.variationId))
        errors.push(`${folderName}: compatibility references unknown variation "${assessment.variationId}".`);
    }
  }

  const combinedStyles = new Set([...styleById.keys(), ...incomingStyles.keys()]);
  const combinedSources = new Set([...sourceById.keys(), ...incomingSources.keys()]);
  for (const [folder, packageItem] of packages.map((item) => [item.folderName, item])) {
    const style = packageItem.payload?.hairstyle;
    if (!style) continue;
    for (const id of [...(style.sourceIds ?? []), style.inventedAt?.sourceId, style.inventor?.sourceId].filter(
      Boolean,
    )) {
      if (!combinedSources.has(id)) errors.push(`${folder}: hairstyle references missing source "${id}".`);
    }
    for (const id of style.relatedStyleIds ?? [])
      if (id === style.id || !combinedStyles.has(id))
        errors.push(`${folder}: relatedStyleIds references invalid hairstyle "${id}".`);
    for (const example of packageItem.payload.styleExamples ?? [])
      for (const id of example.hairstyleIds)
        if (!combinedStyles.has(id)) errors.push(`${folder}: style example references missing hairstyle "${id}".`);
  }

  if (errors.length) return { errors: [...new Set(errors)], outputs, copies, packages };

  const updatePaths = new Set();
  for (const item of packages) {
    const { payload, folderName, folderPath } = item;
    const style = payload.hairstyle;
    for (const source of payload.sources) {
      if (!sourceById.has(source.id)) outputs.set(join(contentRoot, "sources", `${source.id}.json`), json(source));
    }
    outputs.set(join(contentRoot, "hairstyles", `${style.id}.json`), json(style));
    for (const example of payload.styleExamples)
      outputs.set(join(contentRoot, "style-examples", `${example.id}.json`), json(example));
    outputs.set(
      join(contentRoot, "compatibility", `${style.id}.json`),
      json({ hairstyleId: style.id, assessments: payload.compatibility }),
    );
    for (const media of payload.media) {
      const { fileName, provenance, ...record } = media;
      outputs.set(
        join(contentRoot, "media", `${media.id}.json`),
        json({
          ...record,
          kind: "image",
          provenance: {
            origin: "system",
            aiGeneration: { provider: provenance.provider, promptKey: provenance.promptKey },
          },
          ...(media.transparentBackground !== undefined ? { transparentBackground: media.transparentBackground } : {}),
          asset: `assets/hairstyles/${fileName}`,
        }),
      );
      copies.push({
        source: join(folderPath, fileName),
        destination: join(contentRoot, "assets/hairstyles", fileName),
      });
    }
    for (const relatedId of style.relatedStyleIds) {
      const related = styleById.get(relatedId);
      if (!related || related.relatedStyleIds.includes(style.id)) continue;
      const path = join(contentRoot, "hairstyles", `${related.id}.json`);
      outputs.set(path, json({ ...related, relatedStyleIds: [...related.relatedStyleIds, style.id].sort() }));
      updatePaths.add(path);
    }
    const promptRows = payload.imagePrompts.map((item) => {
      const media = payload.media.find((record) => record.id === item.mediaId);
      return `## ${item.mediaId}\n\nAsset: \`src/content/assets/hairstyles/${media.fileName}\`\n\n${item.prompt.trim()}`;
    });
    const existingPrompts = await readFile(promptPath, "utf8");
    const missingRows = promptRows.filter((row) => !existingPrompts.includes(`## ${row.split("\n")[0].slice(3)}`));
    if (missingRows.length) {
      outputs.set(promptPath, `${existingPrompts.trimEnd()}\n\n${missingRows.join("\n\n")}\n`);
      updatePaths.add(promptPath);
    }
  }
  return { errors: [], outputs, copies, packages, updatePaths };
}

function parseArgs(args) {
  let apply = false;
  for (const arg of args) {
    if (arg === "--apply") apply = true;
    else if (arg !== "--dry-run" && arg !== "--help" && arg !== "-h") throw new Error(`Unknown option: ${arg}`);
    else if ((arg === "--help" || arg === "-h") && args.length !== 1) throw new Error("Use --help by itself.");
    else if (arg === "--help" || arg === "-h") return { help: true };
  }
  if (args.includes("--apply") && args.includes("--dry-run")) throw new Error("Choose either --apply or --dry-run.");
  return { apply };
}

export async function main(args = process.argv.slice(2)) {
  const options = parseArgs(args);
  if (options.help) {
    console.log(
      "Usage: npm run import:hairstyles [-- --dry-run|--apply]\nDefault is a read-only dry run. Apply writes validated content records, copies image files, updates prompts, and archives packages.",
    );
    return;
  }
  const { packages, skipped } = await readPackages(inbox);
  if (!packages.length) {
    console.log("No hairstyle packages found.");
    if (skipped.length) console.log(`Skipped: ${skipped.join(", ")}`);
    return;
  }
  const validatePayload = await packageValidator(schemaPath);
  const [hairstyles, sources, examples, media, hairTypes] = await Promise.all([
    readCollection("hairstyles"),
    readCollection("sources"),
    readCollection("style-examples"),
    readCollection("media"),
    readCollection("hair-types"),
  ]);
  const data = { hairstyles, sources, styleExamples: examples, media, hairTypes };
  const plan = await makePlan(packages, validatePayload, data);
  if (plan.errors.length) throw new Error(`Import preflight failed:\n- ${plan.errors.join("\n- ")}`);
  await assertDestinations(plan.outputs, plan.copies, packages, archive, plan.updatePaths);
  console.log(`${options.apply ? "Apply" : "Dry run"} plan:`);
  console.log(`- Packages: ${packages.map((item) => item.folderName).join(", ")}`);
  console.log(`- JSON outputs: ${plan.outputs.size}; image files: ${plan.copies.length}`);
  console.log(`- Outputs: ${[...plan.outputs.keys()].map((path) => path.slice(root.length + 1)).join(", ")}`);
  console.log(
    `- Archive destinations: ${packages.map((item) => `inbox-hairstyles/archive/${item.folderName}`).join(", ")}`,
  );
  if (skipped.length) console.log(`- Skipped: ${skipped.join(", ")}`);
  if (!options.apply) {
    console.log("Preview only; no files changed. Re-run with --apply to import.");
    return;
  }
  await applyImport({ outputs: plan.outputs, copies: plan.copies, folders: packages, inboxPath: inbox });
  console.log("Hairstyle package import complete.");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
