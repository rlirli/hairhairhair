import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import {
  appendArrayVariable,
  createSchemaValidator,
  parseArrayVariable,
  planHairstyleImport,
  updateObjectArrayField,
} from "../scripts/import-hairstyles.mjs";

const emptyExisting = () => ({
  sources: [],
  hairstyles: [],
  styleExamples: [],
  compatibility: [],
  media: [],
  assetFiles: [],
  hairTypeIds: ["hair-type-1"],
});

test("published package schema compiles and rejects an incomplete payload", async () => {
  const schema = JSON.parse(
    await readFile(new URL("../public/schemas/hairstyle-package.schema.json", import.meta.url)),
  );
  const validate = createSchemaValidator(schema);

  assert.ok(validate({}).some((error) => error.includes("required property")));
  const invalidHairstyle = validate({
    sources: [],
    hairstyle: {},
    styleExamples: [],
    compatibility: [],
    media: [],
    imagePrompts: [],
  });
  assert.ok(invalidHairstyle.some((error) => error.startsWith("/hairstyle ")));
});

function packageFor({
  slug = "sample-style",
  id = "hairstyle-sample-style",
  relatedStyleIds = [],
  sourceIds = ["sample-source"],
} = {}) {
  const fileName = "sample-style-example.png";
  const mediaId = "sample-style-example";
  return {
    folderName: slug,
    pngFiles: [fileName],
    imagePaths: { [fileName]: "/inbox/" + fileName },
    payload: {
      sources: [
        {
          id: "sample-source",
          title: "Source",
          url: "https://example.com",
          publisher: "Example",
          reviewedAt: "2026-01-01",
        },
      ],
      hairstyle: { id, slug, name: "Sample Style", variations: [], sourceIds, relatedStyleIds },
      styleExamples: [{ id: "sample-example", hairstyleIds: [id], imageId: mediaId }],
      compatibility: [{ hairstyleId: id, hairTypeId: "hair-type-1", score: 0.8, provenance: "estimated" }],
      media: [
        {
          id: mediaId,
          fileName,
          alt: "Example",
          provenance: { kind: "generated", provider: "OpenAI", promptKey: mediaId, background: "opaque" },
        },
      ],
      imagePrompts: [{ mediaId, prompt: "A sample prompt." }],
    },
  };
}

test("import planner adds package records and makes existing related-style links reciprocal", () => {
  const existing = emptyExisting();
  existing.hairstyles.push({ id: "hairstyle-existing", variations: [], relatedStyleIds: [] });
  const plan = planHairstyleImport([packageFor({ relatedStyleIds: ["hairstyle-existing"] })], existing, () => []);

  assert.deepEqual(plan.errors, []);
  assert.equal(plan.newHairstyles.length, 1);
  assert.equal(plan.newExamples.length, 1);
  assert.equal(plan.newCompatibility.length, 1);
  assert.deepEqual(plan.reciprocalUpdates, { "hairstyle-existing": ["hairstyle-sample-style"] });
});

test("import planner rejects duplicate hairstyle IDs", () => {
  const packageData = packageFor();
  const plan = planHairstyleImport([packageData, structuredClone(packageData)], emptyExisting(), () => []);

  assert.ok(plan.errors.some((error) => error.includes('hairstyle id "hairstyle-sample-style" already exists')));
});

test("import planner rejects unresolved source references", () => {
  const second = packageFor({ slug: "another-style", id: "hairstyle-another-style", sourceIds: ["missing-source"] });
  const plan = planHairstyleImport([second], emptyExisting(), () => []);

  assert.ok(plan.errors.some((error) => error.includes('missing source id "missing-source"')));
});

test("TypeScript data helpers append records and update a selected nested array", () => {
  const file = 'export const entries = [{ id: "one", relatedStyleIds: [] }];\n';
  const updated = updateObjectArrayField(file, "fixture.ts", "entries", "one", "relatedStyleIds", [
    "style-b",
    "style-a",
  ]);
  const appended = appendArrayVariable(updated, "fixture.ts", "entries", ['{ id: "two", relatedStyleIds: [] }']);

  assert.deepEqual(parseArrayVariable(appended, "fixture.ts", "entries"), [
    { id: "one", relatedStyleIds: ["style-a", "style-b"] },
    { id: "two", relatedStyleIds: [] },
  ]);
});
