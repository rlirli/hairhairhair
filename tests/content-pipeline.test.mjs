import Ajv2020 from "ajv/dist/2020.js";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";

const repo = resolve(new URL("..", import.meta.url).pathname);
const schemaDir = join(repo, "src/content/schemas");
const validatorPath = join(repo, "scripts/validate-content.mjs");

async function makeContentRoot() {
  const root = await mkdtemp(join(tmpdir(), "hhh-content-pipeline-"));
  await mkdir(join(root, "schemas"), { recursive: true });
  for (const file of [
    "appearance.schema.json",
    "classification-system.schema.json",
    "compatibility.schema.json",
    "hair-type.schema.json",
    "hairstyle.schema.json",
    "media.schema.json",
    "natural-profile.schema.json",
    "person.schema.json",
    "source.schema.json",
    "style-example.schema.json",
  ]) {
    await writeFile(join(root, "schemas", file), await readFile(join(schemaDir, file)));
  }
  for (const name of [
    "appearances",
    "classification-systems",
    "compatibility",
    "hair-types",
    "hairstyles",
    "media",
    "natural-profiles",
    "people",
    "sources",
    "style-examples",
    "assets/people",
  ])
    await mkdir(join(root, name), { recursive: true });
  return root;
}

async function writeRecord(root, collection, filename, value) {
  await writeFile(join(root, collection, filename), `${JSON.stringify(value, null, 2)}\n`);
}

function runValidator(contentRoot) {
  return spawnSync(process.execPath, [validatorPath], {
    cwd: repo,
    encoding: "utf8",
    env: { ...process.env, HHH_CONTENT_ROOT: contentRoot },
  });
}

const publishedStyle = {
  id: "hairstyle-published",
  guidePublicationStatus: "published",
  slug: "published",
  name: "Published",
  kind: "cut",
  summary: "A complete guide.",
  intro: ["Intro."],
  variations: [],
  consultation: { intro: "Intro.", questions: [], sampleRequest: "Request." },
  considerations: [],
  sourceIds: [],
  relatedStyleIds: [],
};

test("task result schema accepts empty and collection-specific result envelopes", async () => {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  ajv.addFormat("uri", (value) => {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  });
  ajv.addFormat("date", (value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
  });
  const entityFiles = [
    "appearance",
    "classification-system",
    "compatibility",
    "hair-type",
    "hairstyle",
    "media",
    "natural-profile",
    "person",
    "source",
    "style-example",
  ];
  for (const name of entityFiles) {
    const schema = JSON.parse(await readFile(join(schemaDir, `${name}.schema.json`), "utf8"));
    ajv.addSchema(schema);
  }
  const resultSchema = JSON.parse(await readFile(join(repo, "public/schemas/content-task-result.schema.json"), "utf8"));
  const validate = ajv.compile(resultSchema);
  assert.equal(validate({ task: "catalog scan", status: "partial", records: [], assets: [] }), true);
  assert.equal(
    validate({
      task: "guide update",
      status: "complete",
      assets: [],
      records: [{ collection: "hairstyles", record: publishedStyle }],
    }),
    true,
  );
  const imageReviewResult = {
    task: "appearance-asset-ingestion",
    status: "complete",
    records: [],
    assets: [],
    findings: {
      imageUseReview: {
        candidates: [
          {
            candidateId: "photo-a",
            analysis: {
              status: "allowed",
              reason: "The supplied policy permits temporary visual analysis.",
              evidence: [{ url: "https://example.com/policy", supports: "Temporary visual analysis is allowed." }],
            },
            publication: {
              status: "needs-review",
              reason: "The photographer's authority to grant the license is unresolved.",
              evidence: [{ url: "https://example.com/photo", supports: "The page does not identify the rightsholder." }],
            },
          },
        ],
      },
    },
  };
  assert.equal(validate(imageReviewResult), true);
  const reverseDecision = structuredClone(imageReviewResult);
  reverseDecision.findings.imageUseReview.candidates[0].analysis.status = "prohibited";
  reverseDecision.findings.imageUseReview.candidates[0].publication.status = "allowed";
  assert.equal(validate(reverseDecision), true);
  const invalidReview = structuredClone(imageReviewResult);
  invalidReview.findings.imageUseReview.candidates[0].analysis.status = "not-permitted";
  assert.equal(validate(invalidReview), false);
  assert.equal(validate({ task: "bad", status: "complete", records: [], assets: [], extra: true }), false);
});

test("validator accepts a minimal stub but rejects incomplete draft and published guides", async (t) => {
  const root = await makeContentRoot();
  t.after(() => rm(root, { recursive: true, force: true }));
  await writeRecord(root, "hairstyles", "hairstyle-minimal.json", {
    id: "hairstyle-minimal",
    guidePublicationStatus: "stub",
  });
  let result = runValidator(root);
  assert.equal(result.status, 0, result.stderr);

  await rm(join(root, "hairstyles", "hairstyle-minimal.json"));
  for (const status of ["draft", "published"]) {
    await writeRecord(root, "hairstyles", `hairstyle-incomplete-${status}.json`, {
      id: `hairstyle-incomplete-${status}`,
      guidePublicationStatus: status,
    });
    result = runValidator(root);
    assert.equal(result.status, 1, `${status} should fail validation`);
    assert.match(result.stderr, /Content validation failed/);
    await rm(join(root, "hairstyles", `hairstyle-incomplete-${status}.json`));
  }
});

test("validator accepts unlinked observations with a warning", async (t) => {
  const root = await makeContentRoot();
  t.after(() => rm(root, { recursive: true, force: true }));
  await writeRecord(root, "people", "person-test.json", {
    id: "person-test",
    slug: "test",
    name: "Test",
    description: "Test person.",
    sources: [],
  });
  await writeRecord(root, "appearances", "appearance-test.json", {
    id: "appearance-test",
    personId: "person-test",
    event: "Test event",
    taken: { value: "2020", precision: "year", sourceUrl: "https://example.com/event" },
    observations: [{ visualDescription: "A hairstyle not yet matched to the catalog." }],
  });
  const result = runValidator(root);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stderr, /observation has no hairstyleId yet/);
});

test("validator rejects unknown hairstyle IDs and missing reported source references", async (t) => {
  const root = await makeContentRoot();
  t.after(() => rm(root, { recursive: true, force: true }));
  await writeRecord(root, "people", "person-test.json", {
    id: "person-test",
    slug: "test",
    name: "Test",
    description: "Test person.",
    sources: [],
  });
  await writeRecord(root, "appearances", "appearance-test.json", {
    id: "appearance-test",
    personId: "person-test",
    event: "Test event",
    taken: { value: "2020", precision: "year", sourceUrl: "https://example.com/event" },
    observations: [
      { hairstyleId: "hairstyle-missing" },
      { reportedHairstyle: { description: "A named style", sourceId: "source-missing" } },
    ],
  });
  const result = runValidator(root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /unknown hairstyleId "hairstyle-missing"/);
  assert.match(result.stderr, /reported hairstyle references unknown source "source-missing"/);
});

test("validator rejects style examples that lack a linked hairstyle", async (t) => {
  const root = await makeContentRoot();
  t.after(() => rm(root, { recursive: true, force: true }));
  await writeRecord(root, "people", "person-test.json", {
    id: "person-test",
    slug: "test",
    name: "Test",
    description: "Test person.",
    sources: [],
  });
  await writeRecord(root, "media", "image-test.json", {
    id: "image-test",
    kind: "image",
    alt: "Test photo",
    asset: "assets/people/image-test.jpg",
    provenance: { origin: "system" },
  });
  await writeFile(join(root, "assets/people/image-test.jpg"), "test asset");
  await writeRecord(root, "style-examples", "example-test.json", {
    id: "example-test",
    imageId: "image-test",
    hairstyleIds: ["hairstyle-published"],
  });
  await writeRecord(root, "hairstyles", "hairstyle-published.json", publishedStyle);
  await writeRecord(root, "appearances", "appearance-test.json", {
    id: "appearance-test",
    personId: "person-test",
    event: "Test event",
    taken: { value: "2020", precision: "year", sourceUrl: "https://example.com/event" },
    observations: [{ styleExampleId: "example-test" }],
  });
  const result = runValidator(root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /styleExampleId "example-test" must reference an example for its linked hairstyle/);
});
