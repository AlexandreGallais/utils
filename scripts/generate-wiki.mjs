// Generates the API pages of the wiki (VitePress, in docs/): one page per export, from its JSDoc, with its
// source, the files it needs, and the results and coverage of its tests when `pnpm wiki:data` produced them.
// Output: docs/api/ (pages) and docs/.vitepress/generated/sidebar.json, both ignored by Git.

import fs from 'node:fs';
import path from 'node:path';
import { readLintBlocks } from './wiki/read-lint-blocks.mjs';
import { readFolders } from './wiki/read-sources.mjs';
import { directImports } from './wiki/resolve-imports.mjs';
import { readCoverage, readTestResults } from './wiki/read-test-data.mjs';
import { countExports, createSidebars, renderApiIndex, renderCategory } from './wiki/render-lists.mjs';
import { blockPagePath, createLintSidebar, renderBlockPage, renderLintIndex } from './wiki/render-lint-reference.mjs';
import { renderPage } from './wiki/render-page.mjs';

const API_DIRECTORY = 'docs/api';
const LINT_DIRECTORY = 'docs/lint-rules';
const GENERATED_DIRECTORY = 'docs/.vitepress/generated';

const folders = readFolders();
const entries = folders.flatMap(({ exports }) => exports);
const byName = new Map(entries.map((entry) => [entry.name, entry]));
// The exports each export imports directly, and the reverse (a file shares its imports among its exports).
const uses = new Map(
  entries.map((entry) => [
    entry.name,
    [...new Set(directImports(entry.file).map(({ name }) => byName.get(name)))].filter(
      (other) => other !== undefined && other !== entry,
    ),
  ]),
);
const usedBy = new Map(entries.map((entry) => [entry.name, []]));
for (const entry of entries) {
  for (const dependency of uses.get(entry.name)) {
    usedBy.get(dependency.name).push(entry);
  }
}
const context = {
  byName,
  uses,
  usedBy,
  hasSpec: (file) => fs.existsSync(file),
  categoryTitles: new Map(folders.map(({ folder, title }) => [folder, title])),
  testResults: readTestResults(),
  coverage: readCoverage(),
};

fs.rmSync(API_DIRECTORY, { recursive: true, force: true });
fs.mkdirSync(API_DIRECTORY, { recursive: true });
fs.mkdirSync(GENERATED_DIRECTORY, { recursive: true });
fs.writeFileSync(path.join(API_DIRECTORY, 'index.md'), renderApiIndex(folders));
for (const folder of folders) {
  const directory = path.join(API_DIRECTORY, folder.folder);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'index.md'), renderCategory(folder));
  for (const entry of folder.exports) {
    fs.writeFileSync(path.join(directory, `${entry.slug}.md`), renderPage(entry, context));
  }
}
// The rule reference: one page per lint block.
const lintBlocks = await readLintBlocks();
fs.rmSync(LINT_DIRECTORY, { recursive: true, force: true });
fs.mkdirSync(LINT_DIRECTORY, { recursive: true });
fs.writeFileSync(path.join(LINT_DIRECTORY, 'index.md'), renderLintIndex(lintBlocks));
for (const block of lintBlocks) {
  const page = path.join(LINT_DIRECTORY, `${blockPagePath(block.file)}.md`);
  fs.mkdirSync(path.dirname(page), { recursive: true });
  fs.writeFileSync(page, renderBlockPage(block));
}

const sidebars = { ...createSidebars(folders), '/lint-rules/': createLintSidebar(lintBlocks) };
fs.writeFileSync(path.join(GENERATED_DIRECTORY, 'sidebar.json'), `${JSON.stringify(sidebars, undefined, 2)}\n`);

console.info(`${API_DIRECTORY}: ${countExports(folders)} pages in ${folders.length} categories.`);
