import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { extname, join } from "node:path";
import test from "node:test";

import { root } from "./helpers/site.mjs";

const emojiCharacter = /^\p{Emoji}$/u;
const keycapBase = /^[#*0-9]$/u;
const textPresentationSelector = "\uFE0E";
const emojiPresentationSelector = "\uFE0F";
const keycapEncloser = "\u20E3";
const renderableTextExtensions = new Set([
  ".astro",
  ".cjs",
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mdx",
  ".mjs",
  ".scss",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".webmanifest",
  ".xml",
  ".yaml",
  ".yml",
]);

function repositoryTextFiles() {
  const paths = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], {
    cwd: root,
    encoding: "utf8",
  })
    .split("\n")
    .filter(Boolean);

  return paths.filter((path) => renderableTextExtensions.has(extname(path)));
}

function emojiPresentationViolations(source, path) {
  const characters = Array.from(source);
  const violations = [];

  for (let index = 0; index < characters.length; index += 1) {
    const character = characters[index];
    if (!emojiCharacter.test(character)) continue;

    const next = characters[index + 1];
    if (keycapBase.test(character)) {
      if (next === emojiPresentationSelector && characters[index + 2] === keycapEncloser) {
        violations.push(`${path}: emoji keycap sequence ${characters.slice(index, index + 3).join("")}`);
        index += 2;
      }
      continue;
    }

    if (next !== textPresentationSelector) {
      violations.push(`${path}: ${character} (U+${character.codePointAt(0).toString(16).toUpperCase()})`);
    } else {
      index += 1;
    }
  }

  return violations;
}

test("repository text uses text presentation for emoji-capable characters", () => {
  const violations = repositoryTextFiles().flatMap((path) =>
    emojiPresentationViolations(readFileSync(join(root, path), "utf8"), path),
  );

  assert.deepEqual(violations, []);
});
