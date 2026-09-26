import Ajv2020 from "ajv/dist/2020.js";
import { execFile } from "node:child_process";
import { copyFile, mkdir, readFile, readdir, rename, stat, unlink, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

export const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
export const contentRoot = join(root, "src/content");
const execFileAsync = promisify(execFile);

export async function readPackages(inboxPath) {
  const entries = await readdir(inboxPath, { withFileTypes: true });
  const folders = entries
    .filter((entry) => entry.isDirectory() && entry.name !== "archive")
    .sort((left, right) => left.name.localeCompare(right.name));
  const packages = [];
  const skipped = [];
  for (const entry of folders) {
    const folderPath = join(inboxPath, entry.name);
    const files = await readdir(folderPath, { withFileTypes: true });
    const payloadFile = files.find((file) => file.isFile() && file.name === "payload.json");
    if (!payloadFile) {
      skipped.push(`${entry.name} (no payload.json)`);
      continue;
    }
    const payload = JSON.parse(await readFile(join(folderPath, "payload.json"), "utf8"));
    const imageFiles = files
      .filter((file) => file.isFile() && /\.(?:jpe?g|png|webp)$/i.test(file.name))
      .map((file) => file.name)
      .sort();
    packages.push({ folderName: entry.name, folderPath, payload, imageFiles });
  }
  return { packages, skipped };
}

export async function packageValidator(schemaPath) {
  const schema = JSON.parse(await readFile(schemaPath, "utf8"));
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  ajv.addFormat("uri", {
    type: "string",
    validate(value) {
      try {
        return ["http:", "https:"].includes(new URL(value).protocol);
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
  const validate = ajv.compile(schema);
  return (payload) => {
    if (validate(payload)) return [];
    return (validate.errors ?? []).map((error) => `${error.instancePath || "/"} ${error.message ?? "is invalid"}`);
  };
}

export async function readCollection(name) {
  const directory = join(contentRoot, name);
  const entries = await readdir(directory, { withFileTypes: true });
  const records = [];
  for (const entry of entries.filter((item) => item.isFile() && item.name.endsWith(".json"))) {
    records.push(JSON.parse(await readFile(join(directory, entry.name), "utf8")));
  }
  return records;
}

export async function assertDestinations(outputs, copies, archiveFolders, archiveDirectory, allowExisting = new Set()) {
  for (const path of outputs.keys()) {
    if (allowExisting.has(path)) continue;
    try {
      await stat(path);
      throw new Error(`Destination already exists: ${path}`);
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }
  for (const item of copies) {
    try {
      await stat(item.destination);
      throw new Error(`Asset destination already exists: ${item.destination}`);
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }
  for (const folder of archiveFolders) {
    try {
      await stat(join(archiveDirectory, folder.folderName));
      throw new Error(`Archive destination already exists: ${join(archiveDirectory, folder.folderName)}`);
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }
}

export async function applyImport({ outputs, copies, folders, inboxPath }) {
  const archiveDirectory = join(inboxPath, "archive");
  const temporaryFiles = [];
  const copiedAssets = [];
  const writtenFiles = [];
  const movedFolders = [];
  const originals = new Map();
  try {
    for (const [path, contents] of outputs) {
      const tempPath = `${path}.import-${process.pid}-${Date.now()}.tmp`;
      await mkdir(dirname(path), { recursive: true });
      await writeFile(tempPath, contents, { flag: "wx" });
      temporaryFiles.push([tempPath, path]);
      try {
        originals.set(path, await readFile(path));
      } catch (error) {
        if (error?.code !== "ENOENT") throw error;
      }
    }
    await mkdir(archiveDirectory, { recursive: true });
    for (const item of copies) {
      await mkdir(dirname(item.destination), { recursive: true });
      await copyFile(item.source, item.destination, 1);
      copiedAssets.push(item.destination);
    }
    for (const [tempPath, destination] of temporaryFiles) {
      await rename(tempPath, destination);
      writtenFiles.push(destination);
    }
    for (const folder of folders) {
      const source = join(inboxPath, folder.folderName);
      const destination = join(archiveDirectory, folder.folderName);
      await rename(source, destination);
      movedFolders.push([destination, source]);
    }
    await execFileAsync(process.execPath, [join(root, "scripts/validate-content.mjs")], { cwd: root });
  } catch (error) {
    for (const [from, to] of movedFolders.reverse()) await rename(from, to).catch(() => {});
    for (const path of writtenFiles.reverse()) {
      const previous = originals.get(path);
      if (previous) {
        const rollback = `${path}.rollback-${process.pid}.tmp`;
        await writeFile(rollback, previous)
          .then(() => rename(rollback, path))
          .catch(() => unlink(rollback).catch(() => {}));
      } else {
        await unlink(path).catch(() => {});
      }
    }
    for (const path of copiedAssets.reverse()) await unlink(path).catch(() => {});
    for (const [tempPath] of temporaryFiles) await unlink(tempPath).catch(() => {});
    const stderr = error && typeof error === "object" && "stderr" in error ? String(error.stderr).trim() : "";
    throw new Error(
      `Import failed; rollback attempted. ${error instanceof Error ? error.message : String(error)}${stderr ? `\n${stderr}` : ""}`,
    );
  }
}

export function json(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

export async function fileExists(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}
