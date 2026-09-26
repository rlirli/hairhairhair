#!/usr/bin/env node
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { rubrics } from "./content-generation/rubrics.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const defaultOutputRoot = join(projectRoot, "generated", "content-matrices");
const schemaVersion = "1.0.0";

function usage() {
  return `Generate a hairstyle profile candidate matrix and a standalone visualizer.

Usage:
  pnpm generate:content -- --hairstyle <id-or-slug> [--output-dir <path>]

Options:
  --hairstyle  Required hairstyle id or slug from src/data/hairstyles.ts
  --output-dir Output root (default: generated/content-matrices)
  --help       Show this help
`;
}

function parseArgs(args) {
  const options = { hairstyle: undefined, outputRoot: defaultOutputRoot };
  args = args.filter((arg) => arg !== "--");
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--help" || arg === "-h") return { ...options, help: true };
    if (arg === "--hairstyle" || arg === "--output-dir") {
      const value = args[index + 1];
      if (!value || value.startsWith("--")) throw new Error(`${arg} requires a value.`);
      if (arg === "--hairstyle") options.hairstyle = value;
      else options.outputRoot = resolve(process.cwd(), value);
      index += 1;
      continue;
    }
    throw new Error(`Unknown option: ${arg}`);
  }
  if (!options.hairstyle) throw new Error("--hairstyle is required.");
  return options;
}

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function statusFor(score, thresholds) {
  if (score >= thresholds.plausible) return "plausible";
  if (score >= thresholds.needsReview) return "needs-review";
  return "challenging";
}

function assessment(criteria, weights, profile, thresholds) {
  const factors = Object.entries(weights).map(([dimension, weight]) => ({
    dimension,
    value: profile[dimension],
    weight,
    score: criteria[dimension][profile[dimension]].score,
    rationale: criteria[dimension][profile[dimension]].rationale,
  }));
  const value = Number(factors.reduce((sum, factor) => sum + factor.score * factor.weight, 0).toFixed(2));
  return {
    score: value,
    status: statusFor(value, thresholds),
    factors,
  };
}

function describe(style, rubric, profile) {
  const pattern = rubric.labels.pattern[profile.pattern];
  const length = rubric.labels.length[profile.length];
  const coverage = rubric.labels.coverage[profile.coverage];
  return `${style.name} interpretation for ${pattern} hair at ${length}, with ${coverage}. ${rubric.descriptionCue}`;
}

function htmlSafeJson(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c").replaceAll(">", "\\u003e").replaceAll("&", "\\u0026");
}

async function run() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(usage());
    return;
  }

  const catalogUrl = pathToFileURL(join(projectRoot, "src", "data", "hairstyles.ts"));
  const { hairstyles } = await import(catalogUrl.href);
  const style = hairstyles.find(
    (candidate) => candidate.id === options.hairstyle || candidate.slug === options.hairstyle,
  );
  if (!style) {
    const available = hairstyles.map((candidate) => `${candidate.slug} (${candidate.id})`).join(", ");
    throw new Error(`Hairstyle "${options.hairstyle}" was not found. Available styles: ${available}`);
  }

  const rubric = rubrics[style.id];
  if (!rubric) {
    throw new Error(
      `No reviewed prototype rubric exists for "${style.slug}". Add one to scripts/content-generation/rubrics.mjs before generating assessments.`,
    );
  }

  const { dimensions, criteria, weights } = rubric;
  if (!weights.realism || !weights.feasibility) {
    throw new Error(`Rubric ${rubric.id} must define separate realism and feasibility weights.`);
  }
  if (
    !Number.isFinite(rubric.thresholds?.plausible) ||
    !Number.isFinite(rubric.thresholds?.needsReview) ||
    rubric.thresholds.needsReview > 1 ||
    rubric.thresholds.needsReview < 0 ||
    rubric.thresholds.plausible < 0 ||
    rubric.thresholds.plausible > 1 ||
    rubric.thresholds.needsReview >= rubric.thresholds.plausible
  ) {
    throw new Error(`Rubric ${rubric.id} must define ordered status thresholds between 0 and 1.`);
  }
  if (!rubric.descriptionCue?.trim()) throw new Error(`Rubric ${rubric.id} must define a description cue.`);
  for (const dimension of ["pattern", "length", "coverage"]) {
    if (!dimensions[dimension]?.length) throw new Error(`Rubric ${rubric.id} has no ${dimension} candidates.`);
    for (const value of dimensions[dimension]) {
      if (!criteria[dimension]?.[value])
        throw new Error(`Rubric ${rubric.id} is missing criteria for ${dimension}=${value}.`);
    }
  }
  for (const [assessmentType, assessmentWeights] of Object.entries(weights)) {
    const totalWeight = Object.values(assessmentWeights).reduce((total, weight) => total + weight, 0);
    if (
      Object.keys(assessmentWeights).some((dimension) => !dimensions[dimension]) ||
      Object.values(assessmentWeights).some((weight) => !Number.isFinite(weight) || weight < 0 || weight > 1) ||
      Math.abs(totalWeight - 1) > 0.000001
    ) {
      throw new Error(`Rubric ${rubric.id} ${assessmentType} weights must cover known dimensions and sum to 1.`);
    }
  }
  for (const dimension of Object.keys(dimensions)) {
    for (const value of dimensions[dimension]) {
      const criterion = criteria[dimension][value];
      if (
        !Number.isFinite(criterion.score) ||
        criterion.score < 0 ||
        criterion.score > 1 ||
        !criterion.rationale?.trim()
      ) {
        throw new Error(`Rubric ${rubric.id} has an invalid criterion for ${dimension}=${value}.`);
      }
    }
  }

  const candidates = [];
  for (const pattern of dimensions.pattern) {
    for (const length of dimensions.length) {
      for (const coverage of dimensions.coverage) {
        const profile = { pattern, length, coverage };
        const candidateId = `${style.slug}-${pattern}-${length}-${coverage}`;
        candidates.push({
          candidateId,
          hairstyleId: style.id,
          hairstyleSlug: style.slug,
          profile,
          description: describe(style, rubric, profile),
          realismAssessment: assessment(criteria, weights.realism, profile, rubric.thresholds),
          feasibilityAssessment: assessment(criteria, weights.feasibility, profile, rubric.thresholds),
          reviewStatus: "unreviewed",
          provenance: {
            method: "deterministic-editorial-rubric",
            rubricId: rubric.id,
            rubricVersion: rubric.version,
            schemaVersion,
            sourceSummary: style.summary,
            sourceIds: style.sourceIds,
          },
        });
      }
    }
  }

  const fingerprint = createHash("sha256")
    .update(
      stableJson({
        hairstyleId: style.id,
        rubricId: rubric.id,
        rubricVersion: rubric.version,
        candidates,
      }),
    )
    .digest("hex")
    .slice(0, 12);
  const snapshotId = `matrix-${fingerprint}`;
  const matrix = {
    schemaVersion,
    snapshotId,
    generatedAt: new Date().toISOString(),
    hairstyle: { id: style.id, slug: style.slug, name: style.name, summary: style.summary },
    rubric: {
      id: rubric.id,
      version: rubric.version,
      method: "deterministic-editorial-rubric",
      thresholds: rubric.thresholds,
    },
    dimensions,
    candidateCount: candidates.length,
    statusCounts: candidates.reduce((counts, candidate) => {
      counts[candidate.realismAssessment.status] = (counts[candidate.realismAssessment.status] ?? 0) + 1;
      return counts;
    }, {}),
    candidates,
  };

  const outputDir = join(options.outputRoot, style.slug, snapshotId);
  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, "matrix.json"), `${JSON.stringify(matrix, null, 2)}\n`);
  const template = await readFile(
    join(projectRoot, "scripts", "content-generation", "visualizer.template.html"),
    "utf8",
  );
  await writeFile(join(outputDir, "index.html"), template.replace("__MATRIX_JSON__", htmlSafeJson(matrix)));

  process.stdout.write(`Generated ${candidates.length} candidates for ${style.name}.\n`);
  process.stdout.write(`Snapshot: ${outputDir}\n`);
  process.stdout.write(`Visualizer: ${join(outputDir, "index.html")}\n`);
}

run().catch((error) => {
  process.stderr.write(`Content matrix generation failed: ${error.message}\n`);
  process.exitCode = 1;
});
