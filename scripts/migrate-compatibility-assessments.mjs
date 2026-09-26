import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const directory = join(root, "src/content/compatibility");
const apply = process.argv.includes("--apply");
for (const arg of process.argv.slice(2))
  if (!["--apply", "--dry-run"].includes(arg)) throw new Error(`Unknown option: ${arg}`);
const files = (await readdir(directory)).filter((file) => file.endsWith(".json")).sort();
const changes = [];
const errors = [];
let scoreCount = 0;
for (const file of files) {
  const path = join(directory, file);
  const before = await readFile(path, "utf8");
  const record = JSON.parse(before);
  if (record.assessments) continue;
  if (!Array.isArray(record.scores)) {
    errors.push(`${file}: expected a scores array`);
    continue;
  }
  const assessments = record.scores.map((row) => {
    if (row.hairstyleId !== record.hairstyleId) errors.push(`${file}: row has mismatched hairstyleId`);
    if (row.score !== null && (typeof row.score !== "number" || row.score < 0 || row.score > 1))
      errors.push(`${file}: score must remain in 0.0..1.0`);
    scoreCount += 1;
    const { hairstyleId: _hairstyleId, hairTypeId, ...details } = row;
    return { criteria: [{ dimension: "hair-type", valueId: hairTypeId }], ...details };
  });
  changes.push([path, `${JSON.stringify({ hairstyleId: record.hairstyleId, assessments }, null, 2)}\n`]);
}
if (errors.length) throw new Error(`Migration preflight failed:\n- ${errors.join("\n- ")}`);
console.log(
  `${apply ? "Apply" : "Dry run"} preflight passed: ${changes.length} hairstyle files, ${scoreCount} scores; all numeric scores remain within 0.0..1.0.`,
);
if (!apply) console.log("No files changed. Re-run with --apply to migrate the assessment rows.");
else {
  for (const [path, contents] of changes) await writeFile(path, contents);
  console.log(`Migrated ${changes.length} files.`);
}
