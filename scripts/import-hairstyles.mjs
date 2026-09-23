/**
 * Import hairstyle packages from inbox-hairstyles/ into the repository.
 *
 * Input
 *   Add one subfolder per hairstyle. Each folder contains payload.json and the
 *   PNG files named by payload.media. payload.json must follow
 *   public/schemas/hairstyle-package.schema.json.
 *
 * Usage
 *   npm run import:hairstyles
 *   npm run import:hairstyles -- --apply
 *
 * Options
 *   (default)  Preview the import plan; do not change files.
 *   --dry-run  Explicitly request the same preview.
 *   --apply    Validate all packages, update the data and prompt files, copy
 *              their PNGs, run the hairstyle sorter, and archive source folders.
 *
 * How it works
 *   Validates payloads against the JSON Schema, checks IDs, references, and
 *   destination conflicts, then prints the planned changes. Apply mode performs
 *   the changes and moves imported folders to inbox-hairstyles/archive/.
 */
import Ajv2020 from "ajv/dist/2020.js";
import { execFile } from "node:child_process";
import { copyFile, mkdir, readFile, readdir, rename, stat, unlink, writeFile } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import * as prettier from "prettier";
import ts from "typescript";

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, stable(value[key])]),
    );
  }
  return value;
}

function sameValue(left, right) {
  return JSON.stringify(stable(left)) === JSON.stringify(stable(right));
}

function addUnique(map, key, value, label, errors, allowIdentical = false) {
  if (map.has(key)) {
    if (allowIdentical && sameValue(map.get(key), value)) return false;
    errors.push(label + ' duplicates "' + key + '".');
    return false;
  }
  map.set(key, value);
  return true;
}

function rowKey(row) {
  return [row.hairstyleId, row.hairTypeId, row.variationId ?? ""].join(":");
}

function setOf(items) {
  return new Set(items);
}

export function createSchemaValidator(schema) {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  ajv.addFormat("uri", {
    type: "string",
    validate(value) {
      try {
        const url = new URL(value);
        return url.protocol === "https:" || url.protocol === "http:";
      } catch {
        return false;
      }
    },
  });
  ajv.addFormat("date", {
    type: "string",
    validate(value) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
      const parsed = new Date(value + "T00:00:00Z");
      return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
    },
  });
  const validate = ajv.compile(schema);
  return (payload) => {
    if (validate(payload)) return [];
    return (validate.errors ?? []).map((error) => {
      const location = error.instancePath || "/";
      return location + " " + (error.message ?? "is invalid");
    });
  };
}

export function planHairstyleImport(packages, existing, validatePayload) {
  const errors = [];
  const sourceMap = new Map(existing.sources.map((record) => [record.id, record]));
  const newSourceMap = new Map();
  const existingStyles = new Map(existing.hairstyles.map((record) => [record.id, structuredClone(record)]));
  const styleMap = new Map(existingStyles);
  const incomingStyles = [];
  const examplesById = new Map(existing.styleExamples.map((record) => [record.id, record]));
  const mediaById = new Map(existing.media.map((record) => [record.id, record]));
  const compatibilityByKey = new Map(existing.compatibility.map((record) => [rowKey(record), record]));
  const styleIds = setOf(existing.hairstyles.map((record) => record.id));
  const slugs = setOf(existing.hairstyles.map((record) => record.slug));
  const variationIds = new Set(existing.hairstyles.flatMap((record) => record.variations.map((item) => item.id)));
  const exampleIds = setOf(existing.styleExamples.map((record) => record.id));
  const mediaIds = setOf(existing.media.map((record) => record.id));
  const assetFiles = setOf(existing.assetFiles);
  const hairTypeIds = setOf(existing.hairTypeIds);
  const importedFolders = [];
  const importedImages = [];
  const folders = new Set();
  const acceptedPackages = [];

  for (const item of packages) {
    const label = item.folderName;
    if (folders.has(label)) errors.push('Inbox folder "' + label + '" appears more than once.');
    folders.add(label);

    const schemaErrors = validatePayload(item.payload);
    for (const message of schemaErrors) errors.push(label + "/payload.json: " + message);
    if (schemaErrors.length) continue;
    acceptedPackages.push(item);

    const payload = structuredClone(item.payload);
    const style = payload.hairstyle;
    if (!style || typeof style !== "object") continue;
    if (label !== style.slug) {
      errors.push(label + ': folder name must match hairstyle slug "' + style.slug + '".');
    }
    if (styleIds.has(style.id)) errors.push(label + ': hairstyle id "' + style.id + '" already exists.');
    if (slugs.has(style.slug)) errors.push(label + ': hairstyle slug "' + style.slug + '" already exists.');
    styleIds.add(style.id);
    slugs.add(style.slug);

    const localSources = new Map();
    for (const source of payload.sources ?? []) {
      if (!addUnique(localSources, source.id, source, label + " source ids", errors, true)) continue;
      const current = sourceMap.get(source.id) ?? newSourceMap.get(source.id);
      if (current) {
        if (!sameValue(current, source))
          errors.push(label + ': source id "' + source.id + '" conflicts with existing source data.');
      } else {
        newSourceMap.set(source.id, source);
      }
    }
    for (const variation of style.variations ?? []) {
      if (variationIds.has(variation.id)) errors.push(label + ': variation id "' + variation.id + '" already exists.');
      variationIds.add(variation.id);
    }
    for (const relatedId of style.relatedStyleIds ?? []) {
      if (relatedId === style.id) errors.push(label + ": a hairstyle cannot be related to itself.");
    }

    incomingStyles.push({ label, style });
    styleMap.set(style.id, style);

    const mediaMap = new Map();
    for (const media of payload.media ?? []) {
      if (!addUnique(mediaMap, media.id, media, label + " media ids", errors)) continue;
      if (mediaIds.has(media.id)) errors.push(label + ': media id "' + media.id + '" already exists.');
      mediaIds.add(media.id);
      if (media.fileName.replace(/\.png$/i, "") !== media.id) {
        errors.push(label + ': media id "' + media.id + '" must match filename "' + media.fileName + '".');
      }
      if (media.provenance.promptKey !== media.id) {
        errors.push(label + ': media promptKey must match media id "' + media.id + '".');
      }
      if (assetFiles.has(media.fileName))
        errors.push(label + ': asset filename "' + media.fileName + '" already exists.');
      assetFiles.add(media.fileName);
      if (!item.pngFiles.includes(media.fileName)) {
        errors.push(label + ': PNG "' + media.fileName + '" is missing from the inbox folder.');
      } else {
        importedImages.push({
          folderName: label,
          fileName: media.fileName,
          sourcePath: item.imagePaths[media.fileName],
        });
      }
    }

    const pngNames = item.pngFiles;
    for (const fileName of pngNames) {
      if (!(payload.media ?? []).some((media) => media.fileName === fileName)) {
        errors.push(label + ': PNG "' + fileName + '" has no media record.');
      }
    }

    const promptMap = new Map();
    for (const prompt of payload.imagePrompts ?? []) {
      if (!addUnique(promptMap, prompt.mediaId, prompt, label + " image prompts", errors)) continue;
      if (!mediaMap.has(prompt.mediaId))
        errors.push(label + ': prompt references missing media id "' + prompt.mediaId + '".');
    }
    for (const media of payload.media ?? []) {
      if (!promptMap.has(media.id)) errors.push(label + ': media id "' + media.id + '" has no image prompt.');
    }

    const exampleImages = new Set();
    for (const example of payload.styleExamples ?? []) {
      if (exampleIds.has(example.id)) errors.push(label + ': style example id "' + example.id + '" already exists.');
      exampleIds.add(example.id);
      if (!example.hairstyleIds.includes(style.id)) {
        errors.push(label + ': style example "' + example.id + '" must include hairstyle id "' + style.id + '".');
      }
      if (exampleImages.has(example.imageId))
        errors.push(label + ': more than one example uses image id "' + example.imageId + '".');
      exampleImages.add(example.imageId);
      if (!mediaMap.has(example.imageId))
        errors.push(label + ': style example references missing media id "' + example.imageId + '".');
      if (example.imageId !== mediaMap.get(example.imageId)?.id) {
        errors.push(label + ': style example imageId must match its media id "' + example.imageId + '".');
      }
    }
    if (exampleImages.size !== mediaMap.size)
      errors.push(label + ": each media image must be used by exactly one style example.");

    for (const row of payload.compatibility ?? []) {
      if (row.hairstyleId !== style.id)
        errors.push(label + ': compatibility row must use hairstyle id "' + style.id + '".');
      if (!hairTypeIds.has(row.hairTypeId)) errors.push(label + ': unknown hairTypeId "' + row.hairTypeId + '".');
      if (row.variationId && !style.variations.some((variation) => variation.id === row.variationId)) {
        errors.push(label + ': compatibility row references unknown variation id "' + row.variationId + '".');
      }
      const key = rowKey(row);
      if (compatibilityByKey.has(key)) errors.push(label + ': compatibility row "' + key + '" already exists.');
      compatibilityByKey.set(key, row);
    }

    importedFolders.push({ folderName: label, slug: style.slug, payload });
  }

  const allSources = new Map([...sourceMap, ...newSourceMap]);
  for (const item of incomingStyles) {
    const style = item.style;
    for (const sourceId of [...(style.sourceIds ?? []), style.inventedAt?.sourceId, style.inventor?.sourceId].filter(
      Boolean,
    )) {
      if (!allSources.has(sourceId))
        errors.push(item.label + ': hairstyle references missing source id "' + sourceId + '".');
    }
    for (const sourceId of [style.inventedAt?.sourceId, style.inventor?.sourceId].filter(Boolean)) {
      if (!(style.sourceIds ?? []).includes(sourceId)) {
        errors.push(item.label + ': origin source id "' + sourceId + '" must also appear in hairstyle.sourceIds.');
      }
    }
    for (const relatedId of style.relatedStyleIds ?? []) {
      if (!styleMap.has(relatedId))
        errors.push(item.label + ': relatedStyleIds references missing hairstyle id "' + relatedId + '".');
    }
  }
  for (const item of acceptedPackages) {
    for (const example of item.payload.styleExamples) {
      for (const hairstyleId of example.hairstyleIds) {
        if (!styleMap.has(hairstyleId)) {
          errors.push(item.folderName + ': style example references missing hairstyle id "' + hairstyleId + '".');
        }
      }
    }
  }

  const reciprocalUpdates = new Map();
  for (const item of incomingStyles) {
    for (const relatedId of item.style.relatedStyleIds ?? []) {
      const relatedStyle = styleMap.get(relatedId);
      if (!relatedStyle) continue;
      if (!relatedStyle.relatedStyleIds.includes(item.style.id)) {
        relatedStyle.relatedStyleIds.push(item.style.id);
        if (existingStyles.has(relatedId)) {
          const updates = reciprocalUpdates.get(relatedId) ?? new Set();
          updates.add(item.style.id);
          reciprocalUpdates.set(relatedId, updates);
        }
      }
    }
  }

  const newCompatibility = acceptedPackages.flatMap((item) => item.payload.compatibility ?? []);
  const newExamples = acceptedPackages.flatMap((item) => item.payload.styleExamples ?? []);
  const newMedia = acceptedPackages.flatMap((item) => item.payload.media ?? []);
  const finalStyles = incomingStyles.map((item) => item.style);

  return {
    errors: [...new Set(errors)],
    importedFolders,
    newSources: [...newSourceMap.values()],
    newHairstyles: finalStyles,
    newExamples,
    newCompatibility,
    newMedia,
    importedImages,
    reciprocalUpdates: Object.fromEntries([...reciprocalUpdates].map(([id, values]) => [id, [...values]])),
    allExistingStyles: [...existingStyles.values()],
    newStyleMap: Object.fromEntries(finalStyles.map((style) => [style.id, style])),
  };
}

export function parseArrayVariable(source, fileName, variableName) {
  const file = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const constants = new Map();
  for (const statement of file.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (
        (statement.declarationList.flags & ts.NodeFlags.Const) !== 0 &&
        ts.isIdentifier(declaration.name) &&
        declaration.initializer
      ) {
        constants.set(declaration.name.text, declaration.initializer);
      }
      if (ts.isIdentifier(declaration.name) && declaration.name.text === variableName) {
        if (!declaration.initializer || !ts.isArrayLiteralExpression(declaration.initializer)) {
          throw new Error('Expected "' + variableName + '" to be an array in ' + fileName + ".");
        }
        return declaration.initializer.elements.map((node) => expressionValue(node, file, constants));
      }
    }
  }
  throw new Error('Could not find array "' + variableName + '" in ' + fileName + ".");
}

function expressionValue(node, file, constants = new Map(), resolving = new Set()) {
  if (ts.isStringLiteralLike(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isIdentifier(node)) {
    if (!constants.has(node.text)) return node.text;
    if (resolving.has(node.text)) {
      throw new Error('Circular constant reference "' + node.text + '" in ' + file.fileName + ".");
    }
    const nextResolving = new Set(resolving);
    nextResolving.add(node.text);
    return expressionValue(constants.get(node.text), file, constants, nextResolving);
  }
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((child) => expressionValue(child, file, constants, resolving));
  }
  if (ts.isObjectLiteralExpression(node)) {
    const value = {};
    for (const property of node.properties) {
      if (ts.isShorthandPropertyAssignment(property)) {
        value[property.name.text] = expressionValue(property.name, file, constants, resolving);
        continue;
      }
      if (!ts.isPropertyAssignment(property)) {
        const { line, character } = file.getLineAndCharacterOfPosition(property.getStart(file));
        throw new Error(
          'Unsupported object property "' +
            property.getText(file) +
            '" in ' +
            file.fileName +
            ":" +
            (line + 1) +
            ":" +
            (character + 1) +
            ".",
        );
      }
      const key =
        ts.isIdentifier(property.name) || ts.isStringLiteralLike(property.name) ? property.name.text : undefined;
      if (!key) {
        const { line, character } = file.getLineAndCharacterOfPosition(property.name.getStart(file));
        throw new Error(
          'Unsupported object key "' +
            property.name.getText(file) +
            '" in ' +
            file.fileName +
            ":" +
            (line + 1) +
            ":" +
            (character + 1) +
            ".",
        );
      }
      value[key] = expressionValue(property.initializer, file, constants, resolving);
    }
    return value;
  }
  throw new Error("Unsupported data expression in " + file.fileName + ": " + node.getText(file));
}

export function appendArrayVariable(source, fileName, variableName, records) {
  if (!records.length) return source;
  const file = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const array = findArray(file, variableName);
  return source.slice(0, array.end - 1) + records.join(",\n") + ",\n" + source.slice(array.end - 1);
}

export function updateObjectArrayField(source, fileName, variableName, recordId, fieldName, additions) {
  if (!additions.length) return source;
  const file = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const array = findArray(file, variableName);
  const edits = [];
  for (const record of array.elements) {
    if (!ts.isObjectLiteralExpression(record)) continue;
    const id = property(record, "id");
    if (
      !id ||
      !ts.isPropertyAssignment(id) ||
      !ts.isStringLiteralLike(id.initializer) ||
      id.initializer.text !== recordId
    )
      continue;
    const field = property(record, fieldName);
    if (!field || !ts.isPropertyAssignment(field) || !ts.isArrayLiteralExpression(field.initializer)) {
      throw new Error('Expected array field "' + fieldName + '" for record "' + recordId + '".');
    }
    const current = field.initializer.elements.map((node) => expressionValue(node, file));
    const combined = [...new Set([...current, ...additions])].sort((a, b) =>
      a.localeCompare(b, "en", { sensitivity: "base" }),
    );
    const replacement = "[" + combined.map((value) => JSON.stringify(value)).join(", ") + "]";
    edits.push({ start: field.initializer.getStart(file), end: field.initializer.end, text: replacement });
  }
  if (!edits.length) throw new Error('Could not find record "' + recordId + '" in ' + variableName + ".");
  let output = source;
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    output = output.slice(0, edit.start) + edit.text + output.slice(edit.end);
  }
  return output;
}

function findArray(file, variableName) {
  for (const statement of file.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === variableName) {
        if (declaration.initializer && ts.isArrayLiteralExpression(declaration.initializer))
          return declaration.initializer;
        throw new Error('Expected "' + variableName + '" to be an array in ' + file.fileName + ".");
      }
    }
  }
  throw new Error('Could not find array "' + variableName + '" in ' + file.fileName + ".");
}

function property(object, key) {
  return object.properties.find(
    (item) =>
      ts.isPropertyAssignment(item) &&
      (ts.isIdentifier(item.name) || ts.isStringLiteralLike(item.name)) &&
      item.name.text === key,
  );
}

const execFileAsync = promisify(execFile);
const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const inbox = join(root, "inbox-hairstyles");
const archive = join(inbox, "archive");
const paths = {
  hairstyles: join(root, "src/data/hairstyles.ts"),
  compatibility: join(root, "src/data/hairstyle-compatibility.ts"),
  media: join(root, "src/data/media.ts"),
  prompts: join(root, "docs/media/hairstyle-image-prompts.md"),
  assets: join(root, "src/assets/hairstyles"),
  schema: join(root, "public/schemas/hairstyle-package.schema.json"),
};

function parseArgs(args) {
  let apply = false;
  let explicitMode;
  for (const arg of args) {
    if (arg === "--apply" || arg === "--dry-run") {
      const mode = arg === "--apply" ? "apply" : "dry-run";
      if (explicitMode && explicitMode !== mode) throw new Error("Use either --apply or --dry-run, not both.");
      explicitMode = mode;
      apply = mode === "apply";
    } else if (arg === "--help" || arg === "-h") return { help: true };
    else throw new Error('Unknown option "' + arg + '". Use --help for usage.');
  }
  return { apply };
}

function usage() {
  return (
    "Usage: npm run import:hairstyles [-- --apply|--dry-run]\n\n" +
    "Default is a preview. --apply imports every valid direct inbox folder and archives it.\n" +
    "Each package folder must contain payload.json and the PNG files named by payload.media.\n"
  );
}

function safeIdentifier(id) {
  const identifier = id.replace(/-([a-z0-9])/g, (_, letter) => letter.toUpperCase());
  if (!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(identifier))
    throw new Error('Cannot create a TypeScript import name from media id "' + id + '".');
  return identifier;
}

function tsValue(value, rawPaths = new Map(), key = "") {
  if (key === "src" && typeof value === "string" && rawPaths.has(value)) return rawPaths.get(value);
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return "[" + value.map((item) => tsValue(item, rawPaths)).join(", ") + "]";
  return (
    "{ " +
    Object.entries(value)
      .map(([childKey, child]) => childKey + ": " + tsValue(child, rawPaths, childKey))
      .join(", ") +
    " }"
  );
}

async function formatSource(source, path) {
  const config = (await prettier.resolveConfig(path)) ?? {};
  return prettier.format(source, { ...config, filepath: path });
}

async function readPackages() {
  const entries = await readdir(inbox, { withFileTypes: true });
  const folders = entries
    .filter((entry) => entry.isDirectory() && entry.name !== "archive")
    .sort((a, b) => a.name.localeCompare(b.name));
  const packages = [];
  const skipped = [];
  for (const entry of folders) {
    const folderPath = join(inbox, entry.name);
    const files = await readdir(folderPath, { withFileTypes: true });
    const payloadEntry = files.find((file) => file.isFile() && file.name === "payload.json");
    if (!payloadEntry) {
      skipped.push(entry.name + " (no payload.json)");
      continue;
    }
    let payload;
    try {
      payload = JSON.parse(await readFile(join(folderPath, "payload.json"), "utf8"));
    } catch (error) {
      throw new Error(entry.name + "/payload.json: " + (error instanceof Error ? error.message : String(error)));
    }
    const pngFiles = files
      .filter((file) => file.isFile() && file.name.toLowerCase().endsWith(".png"))
      .map((file) => file.name)
      .sort();
    const imagePaths = Object.fromEntries(pngFiles.map((name) => [name, join(folderPath, name)]));
    packages.push({ folderName: entry.name, folderPath, payload, pngFiles, imagePaths });
  }
  return { packages, skipped };
}

async function loadExisting() {
  const [hairstylesSource, compatibilitySource, mediaSource, schema, assetNames, hairTypesSource] = await Promise.all([
    readFile(paths.hairstyles, "utf8"),
    readFile(paths.compatibility, "utf8"),
    readFile(paths.media, "utf8"),
    readFile(paths.schema, "utf8").then(JSON.parse),
    readdir(paths.assets),
    readFile(join(root, "src/data/hair-types.ts"), "utf8"),
  ]);
  return {
    contents: { hairstyles: hairstylesSource, compatibility: compatibilitySource, media: mediaSource },
    schema,
    data: {
      sources: parseArrayVariable(hairstylesSource, paths.hairstyles, "sources"),
      hairstyles: parseArrayVariable(hairstylesSource, paths.hairstyles, "hairstyles"),
      styleExamples: parseArrayVariable(hairstylesSource, paths.hairstyles, "styleExamples"),
      compatibility: parseArrayVariable(compatibilitySource, paths.compatibility, "hairstyleCompatibility"),
      media: parseArrayVariable(mediaSource, paths.media, "hairstyleMedia"),
      assetFiles: assetNames,
      hairTypeIds: [
        ...parseArrayVariable(hairTypesSource, join(root, "src/data/hair-types.ts"), "hairTypes"),
        ...parseArrayVariable(hairTypesSource, join(root, "src/data/hair-types.ts"), "hairSubtypes"),
      ].map((item) => item.id),
    },
  };
}

async function buildOutputs(existing, plan) {
  let hairstyles = existing.contents.hairstyles;
  hairstyles = appendArrayVariable(
    hairstyles,
    paths.hairstyles,
    "sources",
    plan.newSources.map((item) => tsValue(item)),
  );
  hairstyles = appendArrayVariable(
    hairstyles,
    paths.hairstyles,
    "hairstyles",
    plan.newHairstyles.map((item) => tsValue(item)),
  );
  hairstyles = appendArrayVariable(
    hairstyles,
    paths.hairstyles,
    "styleExamples",
    plan.newExamples.map((item) => tsValue(item)),
  );
  for (const [styleId, ids] of Object.entries(plan.reciprocalUpdates)) {
    hairstyles = updateObjectArrayField(hairstyles, paths.hairstyles, "hairstyles", styleId, "relatedStyleIds", ids);
  }

  let compatibility = appendArrayVariable(
    existing.contents.compatibility,
    paths.compatibility,
    "hairstyleCompatibility",
    plan.newCompatibility.map((item) => tsValue(item)),
  );

  const mediaIds = new Set(existing.data.media.map((item) => item.id));
  const variableById = new Map();
  for (const item of plan.newMedia) {
    const variable = safeIdentifier(item.id);
    variableById.set(item.id, variable);
  }
  const mediaImports = [...variableById].map(
    ([id, variable]) =>
      "import " +
      variable +
      ' from "../assets/hairstyles/' +
      plan.newMedia.find((item) => item.id === id).fileName +
      '";',
  );
  let media = existing.contents.media;
  if (mediaImports.length) {
    const lastImport = [...media.matchAll(/^import .*;\r?$/gm)].at(-1);
    if (!lastImport) throw new Error("Could not locate the media imports in src/data/media.ts.");
    const end = lastImport.index + lastImport[0].length;
    media = media.slice(0, end) + "\n" + mediaImports.join("\n") + media.slice(end);
  }
  const rawPaths = new Map([...variableById].map(([id, variable]) => [id, variable]));
  const mediaRecords = plan.newMedia
    .filter((item) => !mediaIds.has(item.id))
    .map((item) =>
      tsValue(
        {
          id: item.id,
          src: item.id,
          alt: item.alt,
          provenance: item.provenance,
        },
        rawPaths,
      ),
    );
  media = appendArrayVariable(media, paths.media, "hairstyleMedia", mediaRecords);

  let prompts = await readFile(paths.prompts, "utf8");
  const promptEntries = plan.importedFolders.flatMap((folder) =>
    folder.payload.imagePrompts.map((item) => {
      const mediaRecord = folder.payload.media.find((mediaItem) => mediaItem.id === item.mediaId);
      return (
        "## " +
        item.mediaId +
        "\n\nAsset: `src/assets/hairstyles/" +
        mediaRecord.fileName +
        "`\n\n" +
        item.prompt.trim()
      );
    }),
  );
  if (promptEntries.length) prompts = prompts.trimEnd() + "\n\n" + promptEntries.join("\n\n") + "\n";

  const outputs = new Map([
    [paths.hairstyles, await formatSource(hairstyles, paths.hairstyles)],
    [paths.compatibility, await formatSource(compatibility, paths.compatibility)],
    [paths.media, await formatSource(media, paths.media)],
    [paths.prompts, prompts],
  ]);
  return outputs;
}

async function assertNoConflicts(plan) {
  for (const item of plan.importedFolders) {
    const destination = join(archive, item.folderName);
    try {
      await stat(destination);
      throw new Error('Archive destination already exists: "' + destination + '".');
    } catch (error) {
      if (error && error.code !== "ENOENT") throw error;
    }
  }
  for (const image of plan.importedImages) {
    try {
      await stat(join(paths.assets, basename(image.fileName)));
      throw new Error('Image destination already exists: "' + image.fileName + '".');
    } catch (error) {
      if (error && error.code !== "ENOENT") throw error;
    }
  }
}

async function applyTransaction(outputs, plan) {
  const temporaries = [];
  const createdImages = [];
  const writtenFiles = [];
  const movedFolders = [];
  const originals = new Map();
  let sortOutput = "";
  try {
    for (const [path, contents] of outputs) {
      originals.set(path, await readFile(path, "utf8"));
      const temporary = path + ".hairstyle-import-tmp";
      await writeFile(temporary, contents, { flag: "wx" });
      temporaries.push([temporary, path]);
    }
    await mkdir(archive, { recursive: true });
    for (const image of plan.importedImages) {
      const destination = join(paths.assets, image.fileName);
      await copyFile(image.sourcePath, destination, 1);
      createdImages.push(destination);
    }
    for (const [temporary, path] of temporaries) {
      await rename(temporary, path);
      writtenFiles.push(path);
    }
    const sortResult = await execFileAsync(process.execPath, [join(root, "scripts/sort-hairstyle-data.mjs")], {
      cwd: root,
    });
    sortOutput = sortResult.stdout;
    for (const folder of plan.importedFolders) {
      const destination = join(archive, folder.folderName);
      await rename(join(inbox, folder.folderName), destination);
      movedFolders.push([destination, join(inbox, folder.folderName)]);
    }
    if (sortOutput.trim()) process.stdout.write(sortOutput);
  } catch (error) {
    for (const [from, to] of movedFolders.reverse()) await rename(from, to).catch(() => {});
    for (const path of writtenFiles.reverse()) {
      const temporary = path + ".hairstyle-import-rollback-tmp";
      await writeFile(temporary, originals.get(path))
        .then(() => rename(temporary, path))
        .catch(() => unlink(temporary).catch(() => {}));
    }
    for (const path of createdImages.reverse()) await unlink(path).catch(() => {});
    for (const [temporary] of temporaries) await unlink(temporary).catch(() => {});
    const detail = error instanceof Error ? error.message : String(error);
    const stderr = typeof error === "object" && error !== null && "stderr" in error ? String(error.stderr).trim() : "";
    throw new Error(
      "Import failed; completed file changes were rolled back where possible. " +
        detail +
        (stderr ? "\n" + stderr : ""),
    );
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(usage());
    return;
  }
  const { packages, skipped } = await readPackages();
  if (!packages.length) {
    process.stdout.write("No hairstyle packages found.\n");
    if (skipped.length) process.stdout.write("Skipped: " + skipped.join(", ") + "\n");
    return;
  }
  const existing = await loadExisting();
  const validatePayload = createSchemaValidator(existing.schema);
  const plan = planHairstyleImport(packages, existing.data, validatePayload);
  if (plan.errors.length) throw new Error("Import preflight failed:\n- " + plan.errors.join("\n- "));
  await assertNoConflicts(plan);
  const outputs = await buildOutputs(existing, plan);
  const changed = [];
  for (const [path, contents] of outputs) {
    if (contents !== (await readFile(path, "utf8"))) changed.push([path, contents]);
  }
  process.stdout.write((options.apply ? "Import plan" : "Dry run plan") + ":\n");
  process.stdout.write("- Packages: " + plan.importedFolders.map((folder) => folder.folderName).join(", ") + "\n");
  process.stdout.write("- Images: " + plan.importedImages.length + "\n");
  process.stdout.write("- Files to update: " + changed.map(([path]) => path.slice(root.length + 1)).join(", ") + "\n");
  process.stdout.write(
    "- Archive destinations: " +
      plan.importedFolders.map((folder) => "inbox-hairstyles/archive/" + folder.folderName).join(", ") +
      "\n",
  );
  if (skipped.length) process.stdout.write("- Skipped folders: " + skipped.join(", ") + "\n");
  if (!options.apply) {
    process.stdout.write("Preview only; no files were changed. Re-run with --apply to import.\n");
    return;
  }
  await applyTransaction(outputs, plan);
  process.stdout.write("Import complete; source folders archived.\n");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    await main();
  } catch (error) {
    process.stderr.write((error instanceof Error ? error.message : String(error)) + "\n");
    process.exitCode = 1;
  }
}
