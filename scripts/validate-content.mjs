import Ajv2020 from "ajv/dist/2020.js";
import { readdir, readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const content = join(root, "src/content");
const schemaDir = join(content, "schemas");
const entitySchemas = {
  "classification-systems": "classification-system.schema.json",
  "hair-types": "hair-type.schema.json",
  hairstyles: "hairstyle.schema.json",
  sources: "source.schema.json",
  "style-examples": "style-example.schema.json",
  people: "person.schema.json",
  appearances: "appearance.schema.json",
  media: "media.schema.json",
  "natural-profiles": "natural-profile.schema.json",
  compatibility: "compatibility.schema.json",
};

const ajv = new Ajv2020({ allErrors: true, strict: false });
ajv.addFormat("uri", {
  type: "string",
  validate(value) {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  },
});
ajv.addFormat("date", {
  type: "string",
  validate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
  },
});

async function filesIn(folder) {
  try {
    return (await readdir(folder, { withFileTypes: true }))
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map((entry) => entry.name)
      .sort();
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
}

async function loadCollection(name) {
  const schema = JSON.parse(await readFile(join(schemaDir, entitySchemas[name]), "utf8"));
  const validate = ajv.compile(schema);
  const items = [];
  for (const filename of await filesIn(join(content, name))) {
    const path = join(content, name, filename);
    const item = JSON.parse(await readFile(path, "utf8"));
    const recordId = name === "compatibility" ? item.hairstyleId : item.id;
    if (filename !== `${recordId}.json`) {
      errors.push(`${name}/${filename}: filename must match record id "${recordId}.json"`);
    }
    if (!validate(item)) {
      for (const issue of validate.errors ?? [])
        errors.push(`${name}/${filename}${issue.instancePath || "/"}: ${issue.message}`);
    }
    items.push(item);
  }
  return items;
}

const errors = [];
const collections = {};
for (const name of Object.keys(entitySchemas)) collections[name] = await loadCollection(name);

function indexById(records, label) {
  const index = new Map();
  for (const record of records) {
    if (!record?.id) continue;
    if (index.has(record.id)) errors.push(`${label}: duplicate id "${record.id}"`);
    index.set(record.id, record);
  }
  return index;
}
const systems = indexById(collections["classification-systems"], "classification-systems");
const hairTypes = indexById(
  collections["hair-types"].filter((item) => !item.subtypeCode),
  "hair-types",
);
const hairSubtypes = indexById(
  collections["hair-types"].filter((item) => item.subtypeCode),
  "hair-subtypes",
);
const styles = indexById(collections.hairstyles, "hairstyles");
const sources = indexById(collections.sources, "sources");
const examples = indexById(collections["style-examples"], "style-examples");
const people = indexById(collections.people, "people");
const media = indexById(collections.media, "media");
const profiles = indexById(collections["natural-profiles"], "natural-profiles");
const compatibilityKeys = new Set();

for (const subtype of hairSubtypes.values()) {
  if (!hairTypes.has(subtype.hairTypeId))
    errors.push(`hair-types/${subtype.id}: unknown parent hair type "${subtype.hairTypeId}"`);
  if (!systems.has(subtype.classificationSystemId))
    errors.push(`hair-types/${subtype.id}: unknown classification system "${subtype.classificationSystemId}"`);
}
for (const style of styles.values()) {
  for (const id of [...(style.sourceIds ?? []), style.inventedAt?.sourceId, style.inventor?.sourceId].filter(Boolean)) {
    if (!sources.has(id)) errors.push(`hairstyles/${style.id}: unknown source "${id}"`);
  }
  for (const id of style.relatedStyleIds ?? [])
    if (!styles.has(id)) errors.push(`hairstyles/${style.id}: unknown related hairstyle "${id}"`);
}
for (const example of examples.values()) {
  if (!media.has(example.imageId)) errors.push(`style-examples/${example.id}: unknown media "${example.imageId}"`);
  for (const id of example.hairstyleIds)
    if (!styles.has(id)) errors.push(`style-examples/${example.id}: unknown hairstyle "${id}"`);
}
for (const record of collections.compatibility) {
  if (!styles.has(record.hairstyleId)) errors.push(`compatibility/${record.hairstyleId}: unknown hairstyle`);
  for (const assessment of record.assessments ?? []) {
    for (const criterion of assessment.criteria ?? []) {
      if (criterion.dimension === "hair-type") {
        if (!hairTypes.has(criterion.valueId) && !hairSubtypes.has(criterion.valueId))
          errors.push(`compatibility/${record.hairstyleId}: unknown hair-type valueId "${criterion.valueId}"`);
      } else {
        errors.push(
          `compatibility/${record.hairstyleId}: unsupported dimension "${criterion.dimension}"; add its content collection and validator mapping first`,
        );
      }
    }
    const style = styles.get(record.hairstyleId);
    if (assessment.variationId && !style?.variations.some((variation) => variation.id === assessment.variationId)) {
      errors.push(`compatibility/${record.hairstyleId}: unknown variationId "${assessment.variationId}"`);
    }
    const criteriaKey = (assessment.criteria ?? [])
      .map(({ dimension, valueId }) => `${dimension}=${valueId}`)
      .sort()
      .join("&");
    const key = `${record.hairstyleId}:${criteriaKey}:${assessment.variationId ?? ""}`;
    if (compatibilityKeys.has(key)) errors.push(`compatibility: duplicate score relation "${key}"`);
    compatibilityKeys.add(key);
  }
}
for (const person of people.values())
  if (person.heroImageId && !media.has(person.heroImageId))
    errors.push(`people/${person.id}: unknown heroImageId "${person.heroImageId}"`);
for (const appearance of collections.appearances) {
  if (!people.has(appearance.personId))
    errors.push(`appearances/${appearance.id}: unknown personId "${appearance.personId}"`);
  if (!media.has(appearance.imageId))
    errors.push(`appearances/${appearance.id}: unknown imageId "${appearance.imageId}"`);
  for (const observation of appearance.observations ?? [])
    if (!styles.has(observation.hairstyleId))
      errors.push(`appearances/${appearance.id}: unknown hairstyleId "${observation.hairstyleId}"`);
}
for (const profile of profiles.values()) {
  if (!people.has(profile.personId))
    errors.push(`natural-profiles/${profile.id}: unknown personId "${profile.personId}"`);
  const hairTypeId = profile.hairTypeId?.value;
  const subtypeId = profile.hairSubtypeId?.value;
  if (hairTypeId && !hairTypes.has(hairTypeId))
    errors.push(`natural-profiles/${profile.id}: unknown hairTypeId "${hairTypeId}"`);
  if (subtypeId && !hairSubtypes.has(subtypeId))
    errors.push(`natural-profiles/${profile.id}: unknown hairSubtypeId "${subtypeId}"`);
  if (subtypeId && hairSubtypes.get(subtypeId)?.hairTypeId !== hairTypeId)
    errors.push(`natural-profiles/${profile.id}: hair subtype does not belong to its selected hair type`);
}
for (const record of collections.media) {
  const assetPath = resolve(content, record.asset);
  if (!assetPath.startsWith(`${resolve(content, "assets")}/`))
    errors.push(`media/${record.id}: asset path escapes the content assets directory`);
  else {
    try {
      if (!(await stat(assetPath)).isFile()) errors.push(`media/${record.id}: asset is not a file: ${record.asset}`);
    } catch {
      errors.push(`media/${record.id}: missing asset ${record.asset}`);
    }
  }
}

if (errors.length) {
  console.error(`Content validation failed (${errors.length} issues):\n- ${errors.join("\n- ")}`);
  process.exitCode = 1;
} else {
  const total = Object.values(collections).reduce((sum, records) => sum + records.length, 0);
  console.log(
    `Content validation passed: ${total} records across ${Object.keys(entitySchemas).length} collections; ${compatibilityKeys.size} compatibility assessments.`,
  );
}
