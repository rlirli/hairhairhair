import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { execFile } from "node:child_process";
import {
  copyFile,
  cp,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  realpath,
  rename,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { extname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { z } from "zod";

const execFileAsync = promisify(execFile);
const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const contentRoot = join(root, "src/content");
const validatorPath = join(root, "scripts/validate-content.mjs");
const entityCollections = [
  "classification-systems",
  "hair-types",
  "hairstyles",
  "compatibility",
  "style-examples",
  "people",
  "appearances",
  "sources",
  "media",
  "natural-profiles",
];
const recordCollections = new Set(entityCollections);
const idPattern = /^[a-z0-9][a-z0-9_-]*$/;
let writeQueue = Promise.resolve();

function textResult(value, isError = false) {
  return {
    content: [{ type: "text", text: typeof value === "string" ? value : JSON.stringify(value, null, 2) }],
    isError,
  };
}

function safeCollection(collection) {
  if (!recordCollections.has(collection)) throw new Error(`Unknown collection: ${collection}`);
  return collection;
}

function recordId(collection, record) {
  return collection === "compatibility" ? record.hairstyleId : record.id;
}

function recordPath(collection, id) {
  safeCollection(collection);
  if (!idPattern.test(id)) throw new Error(`Invalid record id: ${id}`);
  return join(contentRoot, collection, `${id}.json`);
}

function json(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

async function listRecords(collection) {
  const directory = join(contentRoot, safeCollection(collection));
  const names = (await readdir(directory)).filter((name) => name.endsWith(".json")).sort();
  return Promise.all(names.map(async (name) => JSON.parse(await readFile(join(directory, name), "utf8"))));
}

const summaryFields = {
  "classification-systems": ["id", "name", "title", "code", "description"],
  "hair-types": ["id", "code", "slug", "name", "pattern", "description"],
  hairstyles: ["id", "slug", "name", "kind", "summary", "relatedStyleIds", "guidePublicationStatus"],
  compatibility: ["hairstyleId"],
  "style-examples": ["id", "title", "caption", "hairstyleIds", "imageId"],
  people: ["id", "slug", "name", "heroImageId", "occupation", "summary"],
  appearances: ["id", "personId", "title", "date", "imageId", "sourceIds", "observations"],
  sources: ["id", "title", "publisher", "url", "reviewedAt"],
  media: ["id", "kind", "alt", "asset"],
  "natural-profiles": [
    "id",
    "personId",
    "hairTypeId",
    "hairSubtypeId",
    "naturalHairColor",
    "naturalSkinTone",
    "hairThickness",
    "hairDensity",
  ],
};

function clipText(value, maxLength) {
  if (typeof value !== "string" || value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trimEnd()}…`;
}

function truncateStrings(value, maxLength) {
  if (typeof value === "string") return clipText(value, maxLength);
  if (Array.isArray(value)) return value.map((item) => truncateStrings(item, maxLength));
  if (value && typeof value === "object")
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, truncateStrings(item, maxLength)]));
  return value;
}

function summarizeRecord(collection, record) {
  const summary = {};
  for (const key of summaryFields[collection] ?? ["id", "name", "title", "slug"]) {
    if (!Object.hasOwn(record, key)) continue;
    if (key === "observations" && collection === "appearances") {
      summary.observations = record.observations.map((observation) => ({
        ...(observation.hairstyleId ? { hairstyleId: observation.hairstyleId } : {}),
        ...(observation.styleExampleId ? { styleExampleId: observation.styleExampleId } : {}),
        ...(observation.reportedHairstyle ? { reportedHairstyle: observation.reportedHairstyle } : {}),
        ...(observation.visualDescription ? { visualDescription: observation.visualDescription } : {}),
        ...(observation.preCatalogCandidates ? { preCatalogCandidates: observation.preCatalogCandidates } : {}),
        ...(observation.catalogMatchReasoning ? { catalogMatchReasoning: observation.catalogMatchReasoning } : {}),
      }));
    } else if (collection === "natural-profiles" && record[key] && typeof record[key] === "object") {
      summary[key] = Object.hasOwn(record[key], "value") ? record[key].value : record[key];
    } else if (key === "relatedStyleIds" || key === "hairstyleIds" || key === "sourceIds") {
      summary[key] = record[key];
    } else if (key === "summary" || key === "caption" || key === "description" || key === "title") {
      summary[key] = clipText(record[key], key === "summary" ? 320 : 180);
    } else {
      summary[key] = record[key];
    }
  }
  if (collection === "hairstyles") {
    summary.variationCount = record.variations?.length ?? 0;
    summary.variations = (record.variations ?? []).map(({ id, name }) => ({ id, name }));
    summary.sourceCount = record.sourceIds?.length ?? 0;
  } else if (collection === "compatibility") {
    summary.assessmentCount = record.assessments?.length ?? 0;
    summary.dimensions = [
      ...new Set(
        (record.assessments ?? []).flatMap((assessment) => assessment.criteria.map(({ dimension }) => dimension)),
      ),
    ];
  }
  return summary;
}

async function relatedHairstyleSummaries(record) {
  const related = await Promise.all(
    (record.relatedStyleIds ?? []).map(async (id) => {
      try {
        return summarizeRecord("hairstyles", JSON.parse(await readFile(recordPath("hairstyles", id), "utf8")));
      } catch {
        return { id, missing: true };
      }
    }),
  );
  return related;
}

function readCursor(cursor, collection) {
  if (!cursor) return null;
  try {
    const value = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"));
    if (value.version !== 1 || value.collection !== collection || !Number.isInteger(value.offset) || value.offset < 0)
      throw new Error();
    if (!Number.isInteger(value.limit) || value.limit < 1 || value.limit > 300) throw new Error();
    if (!["summary", "standard", "full"].includes(value.detail)) throw new Error();
    if (!["ids", "summaries"].includes(value.includeRelations)) throw new Error();
    return value;
  } catch {
    throw new Error("Invalid cursor for this collection.");
  }
}

function makeCursor({ collection, offset, limit, detail, includeRelations }) {
  return Buffer.from(JSON.stringify({ version: 1, collection, offset, limit, detail, includeRelations })).toString(
    "base64url",
  );
}

async function listRecordPage({ collection, detail, limit, cursor, includeRelations }) {
  const page = readCursor(cursor, collection);
  const pageLimit = limit ?? page?.limit ?? 300;
  const pageDetail = detail ?? page?.detail ?? "summary";
  const relationMode = includeRelations ?? page?.includeRelations ?? "ids";
  const offset = page?.offset ?? 0;
  const names = (await readdir(join(contentRoot, safeCollection(collection))))
    .filter((name) => name.endsWith(".json"))
    .sort();
  const selected = names.slice(offset, offset + pageLimit);
  const records = await Promise.all(
    selected.map(async (name) => {
      const record = JSON.parse(await readFile(join(contentRoot, collection, name), "utf8"));
      const output =
        pageDetail === "full"
          ? record
          : pageDetail === "standard"
            ? truncateStrings(record, 600)
            : summarizeRecord(collection, record);
      if (collection === "hairstyles" && relationMode === "summaries")
        output.relatedStyles = await relatedHairstyleSummaries(record);
      return output;
    }),
  );
  const nextOffset = offset + selected.length;
  const hasMore = nextOffset < names.length;
  return {
    collection,
    detail: pageDetail,
    includeRelations: relationMode,
    limit: pageLimit,
    offset,
    total: names.length,
    records,
    hasMore,
    nextCursor: hasMore
      ? makeCursor({
          collection,
          offset: nextOffset,
          limit: pageLimit,
          detail: pageDetail,
          includeRelations: relationMode,
        })
      : null,
  };
}

async function validateWithEnv(contentDirectory) {
  try {
    const { stdout, stderr } = await execFileAsync(process.execPath, [validatorPath], {
      cwd: root,
      env: { ...process.env, HHH_CONTENT_ROOT: contentDirectory },
      maxBuffer: 4 * 1024 * 1024,
    });
    return { valid: true, output: `${stdout}${stderr}`.trim() };
  } catch (error) {
    const output = [error.stdout, error.stderr].filter(Boolean).join("\n").trim();
    return { valid: false, output: output || error.message };
  }
}

async function withWriteLock(callback) {
  const prior = writeQueue;
  let release;
  writeQueue = new Promise((resolveLock) => {
    release = resolveLock;
  });
  await prior;
  try {
    return await callback();
  } finally {
    release();
  }
}

async function prepareValidationWorkspace({ collection, id, record, records, asset }) {
  const workspace = await mkdtemp(join(tmpdir(), "hairhairhair-mcp-"));
  const stagedContent = join(workspace, "content");
  await mkdir(stagedContent, { recursive: true });
  try {
    for (const folder of [...entityCollections, "schemas"]) {
      const source = join(contentRoot, folder);
      await cp(source, join(stagedContent, folder), { recursive: true });
    }
    const sourceAssets = join(contentRoot, "assets");
    const stagedAssets = join(stagedContent, "assets");
    await mkdir(stagedAssets, { recursive: true });
    for (const category of await readdir(sourceAssets)) {
      const source = join(sourceAssets, category);
      if (asset && category === asset.category) await cp(source, join(stagedAssets, category), { recursive: true });
      else await symlink(source, join(stagedAssets, category), "dir");
    }
    if (asset && !(await lstat(join(stagedAssets, asset.category)).catch(() => null))) {
      await mkdir(join(stagedAssets, asset.category), { recursive: true });
    }
    if (asset) {
      const stagedAsset = join(stagedAssets, asset.category, asset.filename);
      await copyFile(asset.sourcePath, stagedAsset, 1);
    }
    const stagedRecords = records ?? [{ collection, id, record }];
    for (const item of stagedRecords)
      await writeFile(join(stagedContent, item.collection, `${item.id}.json`), json(item.record));
    const result = await validateWithEnv(stagedContent);
    return { workspace, result };
  } catch (error) {
    await rm(workspace, { recursive: true, force: true });
    throw error;
  }
}

async function applyRecords({ records, asset = undefined }) {
  const destinations = new Set();
  const originals = new Map();
  const tempFiles = [];
  const writtenFiles = [];
  for (const item of records) {
    const destination = recordPath(item.collection, item.id);
    if (destinations.has(destination)) throw new Error(`Duplicate write in batch: ${item.collection}/${item.id}.json`);
    destinations.add(destination);
    try {
      originals.set(destination, await readFile(destination));
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      originals.set(destination, undefined);
    }
    const exists = originals.get(destination) !== undefined;
    if (item.action === "create" && exists) throw new Error(`${item.collection}/${item.id}.json already exists.`);
    if (item.action === "update" && !exists) throw new Error(`${item.collection}/${item.id}.json does not exist.`);
  }
  const { workspace, result } = await prepareValidationWorkspace({ records, asset });
  try {
    if (!result.valid) throw new Error(`Content validation failed:\n${result.output}`);
    if (asset) {
      await mkdir(join(contentRoot, "assets", asset.category), { recursive: true });
      await copyFile(asset.sourcePath, join(contentRoot, "assets", asset.category, asset.filename), 1);
    }
    try {
      for (const item of records) {
        const destination = recordPath(item.collection, item.id);
        const temporary = `${destination}.mcp-${process.pid}-${Date.now()}-${tempFiles.length}.tmp`;
        await writeFile(temporary, json(item.record), { flag: "wx" });
        tempFiles.push([temporary, destination]);
      }
      for (const [temporary, destination] of tempFiles) {
        await rename(temporary, destination);
        writtenFiles.push(destination);
      }
      const finalValidation = await validateWithEnv(contentRoot);
      if (!finalValidation.valid) throw new Error(`Post-write validation failed:\n${finalValidation.output}`);
    } catch (error) {
      for (const temporary of tempFiles) await rm(temporary[0], { force: true });
      for (const destination of writtenFiles.reverse()) {
        const previous = originals.get(destination);
        if (previous) await writeFile(destination, previous);
        else await rm(destination, { force: true });
      }
      if (asset) await rm(join(contentRoot, "assets", asset.category, asset.filename), { force: true });
      throw error;
    }
    return {
      written: records.map(({ collection, id }) => `${collection}/${id}.json`),
      asset: asset ? `assets/${asset.category}/${asset.filename}` : undefined,
    };
  } finally {
    await rm(workspace, { recursive: true, force: true });
  }
}

async function listPendingPackageNames(packageType) {
  const base = packageType === "hairstyle" ? "inbox-hairstyles" : "inbox-people";
  const directory = join(root, base);
  return (await readdir(directory, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && entry.name !== "archive")
    .map((entry) => entry.name)
    .sort();
}

function searchTokens(value) {
  const stopwords = new Set([
    "and",
    "cut",
    "cuts",
    "for",
    "hair",
    "haircut",
    "haircuts",
    "hairstyle",
    "hairstyles",
    "style",
    "styles",
    "the",
    "with",
  ]);
  return new Set(
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase()
      .match(/[\p{L}\p{N}]+/gu)
      ?.filter((token) => token.length > 2 && !stopwords.has(token)) ?? [],
  );
}

function scoreHairstyle(style, terms) {
  if (!terms.size) return 0;
  const name = searchTokens(`${style.name} ${style.slug}`);
  const variationNames = searchTokens((style.variations ?? []).map(({ name }) => name).join(" "));
  const summary = searchTokens(style.summary ?? "");
  const details = searchTokens(
    [
      ...(style.intro ?? []),
      ...(style.considerations ?? []),
      ...(style.variations ?? []).map(({ description }) => description),
    ].join(" "),
  );
  let score = 0;
  for (const term of terms) {
    if (name.has(term)) score += 5;
    else if (variationNames.has(term)) score += 3;
    else if (summary.has(term)) score += 2;
    else if (details.has(term)) score += 1;
  }
  return score;
}

async function makeHairstyleGenerationContext(query, limit) {
  const styles = await listRecords("hairstyles");
  const terms = searchTokens(query);
  const ranked = styles
    .map((style) => ({ style, score: scoreHairstyle(style, terms) }))
    .sort((left, right) => right.score - left.score || left.style.id.localeCompare(right.style.id));
  const matchCount = ranked.filter(({ score }) => score > 0).length;
  const fallback = matchCount === 0;
  const selected = (fallback ? [...ranked].sort((a, b) => a.style.id.localeCompare(b.style.id)) : ranked)
    .slice(0, limit)
    .map(({ style, score }) => ({ style, score }));
  const selectedIds = new Set(selected.map(({ style }) => style.id));
  const relatedIds = new Set(selected.flatMap(({ style }) => style.relatedStyleIds ?? []));
  for (const id of selectedIds) relatedIds.delete(id);
  const relatedStyles = await Promise.all(
    [...relatedIds].sort().map(async (id) => {
      try {
        return summarizeRecord("hairstyles", JSON.parse(await readFile(recordPath("hairstyles", id), "utf8")));
      } catch {
        return { id, missing: true };
      }
    }),
  );
  return {
    query,
    matching: "lexical token overlap; related styles are expanded one level only",
    matchCount,
    usedCatalogFallback: fallback,
    candidates: selected.map(({ style, score }) => ({ ...summarizeRecord("hairstyles", style), matchScore: score })),
    relatedStyles,
    hasMore: (fallback ? styles.length : matchCount) > selected.length,
  };
}

const server = new McpServer({ name: "hairhairhair-content", version: "1.0.0" });

server.registerTool(
  "content_list",
  {
    title: "List content records",
    description:
      "List records with a compact summary by default. limit defaults to 300 and is capped at 300. Use standard or full detail only when needed. For hairstyles, includeRelations=summaries adds shallow summaries for each relatedStyleId.",
    inputSchema: z.object({
      collection: z.enum(entityCollections),
      detail: z.enum(["summary", "standard", "full"]).optional(),
      limit: z.number().int().min(1).max(300).optional(),
      cursor: z.string().optional(),
      includeRelations: z.enum(["ids", "summaries"]).optional(),
    }),
  },
  async ({ collection, detail, limit, cursor, includeRelations }) => {
    try {
      return textResult(await listRecordPage({ collection, detail, limit, cursor, includeRelations }));
    } catch (error) {
      return textResult(error.message, true);
    }
  },
);

server.registerTool(
  "hairstyle_generation_context",
  {
    title: "Find existing and related hairstyles for generation",
    description:
      "Find compact existing-style candidates for a proposed hairstyle, then expand their directly related styles as summaries. Uses simple lexical overlap, not semantic search. If no terms match, returns a compact catalog fallback. Does not return full nested hairstyle records.",
    inputSchema: z.object({ query: z.string().min(1), limit: z.number().int().min(1).max(50).optional() }),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async ({ query, limit = 12 }) => {
    try {
      return textResult(await makeHairstyleGenerationContext(query, limit));
    } catch (error) {
      return textResult(error.message, true);
    }
  },
);

server.registerTool(
  "content_get",
  {
    title: "Get content record",
    description:
      "Read one Git-tracked record by collection and stable ID. Compatibility records use their hairstyleId as ID.",
    inputSchema: z.object({ collection: z.enum(entityCollections), id: z.string() }),
  },
  async ({ collection, id }) => {
    try {
      return textResult(JSON.parse(await readFile(recordPath(collection, id), "utf8")));
    } catch (error) {
      return textResult(error.message, true);
    }
  },
);

server.registerTool(
  "content_search",
  {
    title: "Search content",
    description:
      "Search record text across one or more Git-tracked content collections. Returns compact summaries by default; full detail is opt-in. limit defaults to 20 and is capped at 100.",
    inputSchema: z.object({
      query: z.string().min(1),
      collections: z.array(z.enum(entityCollections)).optional(),
      detail: z.enum(["summary", "standard", "full"]).optional(),
      limit: z.number().int().min(1).max(100).optional(),
    }),
  },
  async ({ query, collections = entityCollections, detail = "summary", limit = 20 }) => {
    const needle = query.toLocaleLowerCase();
    const matches = [];
    let totalMatches = 0;
    for (const collection of collections) {
      for (const record of await listRecords(collection)) {
        if (!JSON.stringify(record).toLocaleLowerCase().includes(needle)) continue;
        totalMatches += 1;
        if (matches.length < limit) {
          const output =
            detail === "full"
              ? record
              : detail === "standard"
                ? truncateStrings(record, 600)
                : summarizeRecord(collection, record);
          matches.push({ collection, record: output });
        }
      }
    }
    return textResult({ query, detail, limit, matches, totalMatches, truncated: totalMatches > matches.length });
  },
);

server.registerTool(
  "content_validate",
  {
    title: "Validate all content",
    description: "Run JSON Schema and cross-record validation, including relationship IDs and linked image assets.",
    inputSchema: z.object({}),
  },
  async () => {
    const result = await validateWithEnv(contentRoot);
    return textResult(result, !result.valid);
  },
);

server.registerTool(
  "content_write_record",
  {
    title: "Create or update content record",
    description:
      "Create, update, or upsert one record in any content collection. Every write is first staged and checked against schemas and all cross-record relationships. apply=false is a no-write dry run; set apply=true only after reviewing it.",
    inputSchema: z.object({
      collection: z.enum(entityCollections),
      action: z.enum(["create", "update", "upsert"]).default("upsert"),
      record: z.record(z.string(), z.unknown()),
      apply: z.boolean().default(false),
    }),
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: false },
  },
  async ({ collection, action, record, apply }) => {
    try {
      const id = recordId(collection, record);
      if (typeof id !== "string" || !idPattern.test(id))
        throw new Error("Record must have a valid stable id (compatibility uses hairstyleId).");
      const destination = recordPath(collection, id);
      let exists = true;
      try {
        await lstat(destination);
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
        exists = false;
      }
      if (action === "create" && exists) throw new Error(`${collection}/${id}.json already exists.`);
      if (action === "update" && !exists) throw new Error(`${collection}/${id}.json does not exist.`);
      if (!apply) {
        const item = { collection, id, record, action };
        const { workspace, result } = await prepareValidationWorkspace({ records: [item] });
        await rm(workspace, { recursive: true, force: true });
        if (!result.valid) throw new Error(`Dry-run validation failed:\n${result.output}`);
        return textResult({ dryRun: true, action, file: relative(root, destination), validation: result.output });
      }
      const written = await withWriteLock(() => applyRecords({ records: [{ collection, id, record, action }] }));
      return textResult({ dryRun: false, ...written, validation: "passed" });
    } catch (error) {
      return textResult(error.message, true);
    }
  },
);

server.registerTool(
  "content_write_records",
  {
    title: "Create or update related content records",
    description:
      "Create or update up to 50 related records as one validated change set. Use this when adding a person, appearances, profiles, hairstyles, examples, or compatibility records that refer to one another. apply=false is a no-write dry run; set apply=true only after reviewing it.",
    inputSchema: z.object({
      records: z
        .array(
          z.object({
            collection: z.enum(entityCollections),
            action: z.enum(["create", "update", "upsert"]).default("upsert"),
            record: z.record(z.string(), z.unknown()),
          }),
        )
        .min(1)
        .max(50),
      apply: z.boolean().default(false),
    }),
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: false },
  },
  async ({ records, apply }) => {
    try {
      const changes = records.map(({ collection, action, record }) => {
        const id = recordId(collection, record);
        if (typeof id !== "string" || !idPattern.test(id))
          throw new Error(`Record in ${collection} must have a valid stable id (compatibility uses hairstyleId).`);
        return { collection, id, record, action };
      });
      const seen = new Set();
      for (const item of changes) {
        const path = recordPath(item.collection, item.id);
        if (seen.has(path)) throw new Error(`Duplicate record in change set: ${item.collection}/${item.id}.json`);
        seen.add(path);
        const exists = Boolean(
          await lstat(path).catch((error) => (error.code === "ENOENT" ? null : Promise.reject(error))),
        );
        if (item.action === "create" && exists) throw new Error(`${item.collection}/${item.id}.json already exists.`);
        if (item.action === "update" && !exists) throw new Error(`${item.collection}/${item.id}.json does not exist.`);
      }
      if (!apply) {
        const { workspace, result } = await prepareValidationWorkspace({ records: changes });
        await rm(workspace, { recursive: true, force: true });
        if (!result.valid) throw new Error(`Dry-run validation failed:\n${result.output}`);
        return textResult({
          dryRun: true,
          files: changes.map(({ collection, id }) => `src/content/${collection}/${id}.json`),
          validation: result.output,
        });
      }
      const written = await withWriteLock(() => applyRecords({ records: changes }));
      return textResult({ dryRun: false, ...written, validation: "passed" });
    } catch (error) {
      return textResult(error.message, true);
    }
  },
);

server.registerTool(
  "content_add_image",
  {
    title: "Add image and media record",
    description:
      "Copy a local image into Git-tracked src/content/assets and create its media JSON record. The image must be JPG, PNG, or WebP and at most 20 MB. apply=false validates a staged copy without changing the repository.",
    inputSchema: z.object({
      id: z.string(),
      category: z.enum(["hair-types", "hairstyles", "people"]),
      sourcePath: z.string(),
      alt: z.string().min(1),
      provenance: z.record(z.string(), z.unknown()),
      objectPosition: z.string().optional(),
      transparentBackground: z.boolean().optional(),
      apply: z.boolean().default(false),
    }),
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: false },
  },
  async ({ id, category, sourcePath, alt, provenance, objectPosition, transparentBackground, apply }) => {
    try {
      if (!idPattern.test(id)) throw new Error(`Invalid media id: ${id}`);
      if (!isAbsolute(sourcePath)) throw new Error("sourcePath must be an absolute local file path.");
      const resolvedSource = await realpath(sourcePath);
      const extension = extname(resolvedSource).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".webp"].includes(extension)) throw new Error("Image must be JPG, PNG, or WebP.");
      const imageStat = await lstat(resolvedSource);
      if (!imageStat.isFile() || imageStat.size <= 0 || imageStat.size > 20 * 1024 * 1024)
        throw new Error("Image must be a non-empty regular file no larger than 20 MB.");
      const filename = `${id}${extension}`;
      const asset = { category, filename, sourcePath: resolvedSource };
      const record = {
        id,
        kind: "image",
        alt,
        ...(objectPosition ? { objectPosition } : {}),
        ...(transparentBackground !== undefined ? { transparentBackground } : {}),
        provenance,
        asset: `assets/${category}/${filename}`,
      };
      const mediaDestination = recordPath("media", id);
      const assetDestination = join(contentRoot, "assets", category, filename);
      if (await lstat(mediaDestination).catch(() => null)) throw new Error(`media/${id}.json already exists.`);
      if (await lstat(assetDestination).catch(() => null))
        throw new Error(`Asset already exists: assets/${category}/${filename}`);
      if (!apply) {
        const { workspace, result } = await prepareValidationWorkspace({ collection: "media", id, record, asset });
        await rm(workspace, { recursive: true, force: true });
        if (!result.valid) throw new Error(`Dry-run validation failed:\n${result.output}`);
        return textResult({
          dryRun: true,
          record: `src/content/media/${id}.json`,
          asset: `src/content/assets/${category}/${filename}`,
          validation: result.output,
        });
      }
      const written = await withWriteLock(() =>
        applyRecords({ records: [{ collection: "media", id, record, action: "create" }], asset }),
      );
      return textResult({ dryRun: false, ...written, validation: "passed" });
    } catch (error) {
      return textResult(error.message, true);
    }
  },
);

server.registerTool(
  "content_import_package",
  {
    title: "Import a content package",
    description:
      "Preview or import one existing inbox-hairstyles or inbox-people package, including linked records and images. Imports are dry-run by default; set apply=true only after reviewing the preview.",
    inputSchema: z.object({
      type: z.enum(["hairstyle", "person"]),
      packageId: z.string(),
      apply: z.boolean().default(false),
    }),
    annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: false },
  },
  async ({ type, packageId, apply }) => {
    try {
      if (!idPattern.test(packageId)) throw new Error(`Invalid package folder name: ${packageId}`);
      const names = await listPendingPackageNames(type);
      if (!names.includes(packageId)) throw new Error(`Package not found in inbox: ${packageId}`);
      const script = join(root, `scripts/import-${type === "hairstyle" ? "hairstyles" : "people"}.mjs`);
      const args = [script, "--package", packageId, apply ? "--apply" : "--dry-run"];
      const { stdout, stderr } = await withWriteLock(() =>
        execFileAsync(process.execPath, args, { cwd: root, maxBuffer: 4 * 1024 * 1024 }),
      );
      return textResult({ dryRun: !apply, output: `${stdout}${stderr}`.trim() });
    } catch (error) {
      const output = [error.stdout, error.stderr].filter(Boolean).join("\n").trim();
      return textResult(output || error.message, true);
    }
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
