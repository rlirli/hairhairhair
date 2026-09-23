import { readFile, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as prettier from "prettier";
import ts from "typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const names = [
  "sources",
  "hairstyles",
  "variations",
  "source-ids",
  "related-style-ids",
  "style-examples",
  "example-hairstyle-ids",
  "compatibility",
  "media",
];
const paths = {
  hairstyles: "src/data/hairstyles.ts",
  compatibility: "src/data/hairstyle-compatibility.ts",
  media: "src/data/media.ts",
};

function usage() {
  return [
    "Usage: npm run sort:hairstyles -- [options]",
    "",
    "Options:",
    "  --only <name>  Sort one structure; repeat or comma-separate names.",
    "                 Names: " + names.join(", "),
    "  --descending   Sort selected structures in descending order.",
    "  --random       Shuffle selected structures.",
    "  --dry-run      Report planned file changes without writing them.",
    "  --help         Show this help.",
    "",
    "Default: sort all supported structures in ascending order.",
    "Media imports and hairstyle-image-prompts.md are not sorted by this script.",
    "",
  ].join("\n");
}

function optionsFrom(args) {
  const selected = new Set();
  let hasSelection = false;
  let order = "ascending";
  let dryRun = false;

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--help" || arg === "-h") return { help: true };
    if (arg === "--dry-run") {
      dryRun = true;
    } else if (arg === "--descending") {
      if (order === "random") throw new Error("Use either --descending or --random, not both.");
      order = "descending";
    } else if (arg === "--random") {
      if (order === "descending") throw new Error("Use either --descending or --random, not both.");
      order = "random";
    } else if (arg === "--only" || arg.startsWith("--only=")) {
      hasSelection = true;
      const value = arg === "--only" ? args[++i] : arg.slice(7);
      if (!value || value.startsWith("--")) throw new Error("--only requires one or more structure names.");
      for (const name of value
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)) {
        if (!names.includes(name))
          throw new Error('Unknown structure "' + name + '". Choose from: ' + names.join(", ") + ".");
        selected.add(name);
      }
    } else {
      throw new Error('Unknown option "' + arg + '". Use --help for usage.');
    }
  }

  if (hasSelection && selected.size === 0) throw new Error("--only requires at least one structure name.");
  return { selected: hasSelection ? selected : new Set(names), order, dryRun };
}

function nodeName(node) {
  return ts.isIdentifier(node) || ts.isStringLiteralLike(node) ? node.text : undefined;
}

function arrayVariable(file, name) {
  for (const statement of file.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (
        ts.isIdentifier(declaration.name) &&
        declaration.name.text === name &&
        declaration.initializer &&
        ts.isArrayLiteralExpression(declaration.initializer)
      ) {
        return declaration.initializer;
      }
    }
  }
  throw new Error('Could not find array "' + name + '" in ' + file.fileName + ".");
}

function arrayProperty(object, name) {
  if (!ts.isObjectLiteralExpression(object)) return undefined;
  const property = object.properties.find((item) => ts.isPropertyAssignment(item) && nodeName(item.name) === name);
  return property && ts.isPropertyAssignment(property) && ts.isArrayLiteralExpression(property.initializer)
    ? property.initializer
    : undefined;
}

function recordKey(node, key, file, structure) {
  if (!ts.isObjectLiteralExpression(node)) {
    throw new Error('Sort structure "' + structure + '" in "' + file.fileName + '" contains a non-object record.');
  }
  const property = node.properties.find((item) => ts.isPropertyAssignment(item) && nodeName(item.name) === key);
  if (!property || !ts.isPropertyAssignment(property) || !ts.isStringLiteralLike(property.initializer)) {
    throw new Error(
      'Sort structure "' +
        structure +
        '" in "' +
        file.fileName +
        '" is missing string key "' +
        key +
        '":\n' +
        node.getText(file),
    );
  }
  return property.initializer.text;
}

const compare = (left, right) => left.localeCompare(right, "en", { sensitivity: "base" });

function recordComparator(file, key, tieKey, structure) {
  return (left, right) => {
    const primary = compare(recordKey(left, key, file, structure), recordKey(right, key, file, structure));
    return (
      primary ||
      (tieKey ? compare(recordKey(left, tieKey, file, structure), recordKey(right, tieKey, file, structure)) : 0)
    );
  };
}

function stringComparator(file, structure) {
  return (left, right) => {
    if (!ts.isStringLiteralLike(left) || !ts.isStringLiteralLike(right)) {
      throw new Error('Sort structure "' + structure + '" in "' + file.fileName + '" contains a non-string ID.');
    }
    return compare(left.text, right.text);
  };
}

function compatibilityComparator(file) {
  const structure = "hairstyleCompatibility";
  return (left, right) => {
    const hairstyle = compare(
      recordKey(left, "hairstyleId", file, structure),
      recordKey(right, "hairstyleId", file, structure),
    );
    return (
      hairstyle ||
      compare(recordKey(left, "hairTypeId", file, structure), recordKey(right, "hairTypeId", file, structure))
    );
  };
}

function orderItems(items, comparator, order) {
  if (order === "random") {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  const direction = order === "descending" ? -1 : 1;
  return [...items].sort((left, right) => direction * comparator(left, right));
}

function editArray(source, file, array, comparator, order) {
  const sorted = orderItems([...array.elements], comparator, order);
  if (sorted.every((item, index) => item === array.elements[index])) return undefined;
  const open = source.indexOf("[", array.getStart(file));
  const close = array.end - 1;
  if (open < 0 || source[close] !== "]") throw new Error("Could not locate array in " + file.fileName + ".");
  return {
    start: open,
    end: array.end,
    text: "[\n" + sorted.map((item) => item.getText(file)).join(",\n") + "\n]",
  };
}

function applyEdits(source, edits) {
  let result = source;
  for (const edit of edits.filter(Boolean).sort((a, b) => b.start - a.start)) {
    result = result.slice(0, edit.start) + edit.text + result.slice(edit.end);
  }
  return result;
}

function nestedEdits(source, fileName, selected, order) {
  const file = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const edits = [];
  const specs = [
    {
      collection: "hairstyles",
      property: "variations",
      name: "variations",
      key: "name",
      tie: "id",
      context: "hairstyles.variations",
    },
    { collection: "hairstyles", property: "sourceIds", name: "source-ids", context: "hairstyles.sourceIds" },
    {
      collection: "hairstyles",
      property: "relatedStyleIds",
      name: "related-style-ids",
      context: "hairstyles.relatedStyleIds",
    },
    {
      collection: "styleExamples",
      property: "hairstyleIds",
      name: "example-hairstyle-ids",
      context: "styleExamples.hairstyleIds",
    },
  ];

  for (const spec of specs) {
    if (!selected.has(spec.name)) continue;
    const collection = arrayVariable(file, spec.collection);
    for (const record of collection.elements) {
      const array = arrayProperty(record, spec.property);
      if (!array) continue;
      const comparator = spec.key
        ? recordComparator(file, spec.key, spec.tie, spec.context)
        : stringComparator(file, spec.context);
      edits.push(editArray(source, file, array, comparator, order));
    }
  }
  return applyEdits(source, edits);
}

function collectionEdits(source, fileName, selected, order) {
  const file = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const specs = [
    ["sources", "sources", recordComparator(file, "id", undefined, "sources")],
    ["hairstyles", "hairstyles", recordComparator(file, "name", "id", "hairstyles")],
    ["styleExamples", "style-examples", recordComparator(file, "id", undefined, "styleExamples")],
  ];
  const edits = [];
  for (const [variable, name, comparator] of specs) {
    if (selected.has(name)) edits.push(editArray(source, file, arrayVariable(file, variable), comparator, order));
  }
  return applyEdits(source, edits);
}

async function formatSource(source, path) {
  const config = (await prettier.resolveConfig(path)) ?? {};
  return prettier.format(source, { ...config, filepath: path });
}

async function writeAtomically(path, contents) {
  const temporaryPath = path + ".sort-tmp";
  await writeFile(temporaryPath, contents, "utf8");
  await rename(temporaryPath, path);
}

async function main() {
  const options = optionsFrom(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(usage());
    return;
  }

  const selected = options.selected;
  const touched = new Set();
  const hairstyleCollections = [
    "sources",
    "hairstyles",
    "variations",
    "source-ids",
    "related-style-ids",
    "style-examples",
    "example-hairstyle-ids",
  ];
  if (hairstyleCollections.some((name) => selected.has(name))) touched.add("hairstyles");
  if (selected.has("compatibility")) touched.add("compatibility");
  if (selected.has("media")) touched.add("media");

  const outputs = new Map();
  for (const key of touched) {
    const path = resolve(root, paths[key]);
    let source = await readFile(path, "utf8");
    if (key === "hairstyles") {
      source = nestedEdits(source, path, selected, options.order);
      source = collectionEdits(source, path, selected, options.order);
    } else if (key === "compatibility") {
      const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
      source = applyEdits(source, [
        editArray(
          source,
          file,
          arrayVariable(file, "hairstyleCompatibility"),
          compatibilityComparator(file),
          options.order,
        ),
      ]);
    } else if (key === "media") {
      const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
      source = applyEdits(source, [
        editArray(
          source,
          file,
          arrayVariable(file, "hairstyleMedia"),
          recordComparator(file, "id", undefined, "hairstyleMedia"),
          options.order,
        ),
      ]);
    }
    outputs.set(path, await formatSource(source, path));
  }

  const changes = [];
  for (const [path, output] of outputs) {
    if (output !== (await readFile(path, "utf8"))) changes.push([path, output]);
  }
  if (options.dryRun) {
    process.stdout.write(
      changes.length
        ? "Dry run: would update " + changes.map(([path]) => path.slice(root.length + 1)).join(", ") + ".\n"
        : "Dry run: selected hairstyle data is already sorted.\n",
    );
    return;
  }

  for (const [path, output] of changes) await writeAtomically(path, output);

  process.stdout.write(
    changes.length
      ? "Sorted " + changes.map(([path]) => path.slice(root.length + 1)).join(", ") + ".\n"
      : "Selected hairstyle data is already sorted.\n",
  );
}

try {
  await main();
} catch (error) {
  process.stderr.write((error instanceof Error ? error.message : String(error)) + "\n");
  process.exitCode = 1;
}
