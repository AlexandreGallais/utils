// Generates the API pages of the wiki (VitePress, in docs/): one page per export, from its JSDoc, with its
// source, the files it needs, and the results and coverage of its tests when `pnpm wiki:data` produced them.
// Output: docs/api/ (pages) and docs/.vitepress/generated/sidebar.json, both ignored by Git.

import fs from 'node:fs';
import path from 'node:path';
import { directDependenciesOf, readFolders } from './wiki/read-sources.mjs';
import { readCoverage, readTestResults } from './wiki/read-test-data.mjs';
import { countExports, createSidebars, renderApiIndex, renderCategory } from './wiki/render-lists.mjs';
import { renderPage } from './wiki/render-page.mjs';

const API_DIRECTORY = 'docs/api';
const GENERATED_DIRECTORY = 'docs/.vitepress/generated';

const folders = readFolders();
const entries = folders.flatMap(({ exports }) => exports);
const byFile = new Map(entries.map((entry) => [entry.file, entry]));
// The exports each export imports directly, and the reverse.
const uses = new Map(
  entries.map((entry) => [
    entry.name,
    directDependenciesOf(entry.file)
      .map((file) => byFile.get(file))
      .filter((other) => other !== undefined),
  ]),
);
const usedBy = new Map(entries.map((entry) => [entry.name, []]));
for (const entry of entries) {
  for (const dependency of uses.get(entry.name)) {
    usedBy.get(dependency.name).push(entry);
  }
}
const context = {
  byName: new Map(entries.map((entry) => [entry.name, entry])),
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
fs.writeFileSync(
  path.join(GENERATED_DIRECTORY, 'sidebar.json'),
  `${JSON.stringify(createSidebars(folders), undefined, 2)}\n`,
);

// eslint-disable-next-line no-console -- a command-line script reports its result.
console.info(`${API_DIRECTORY}: ${countExports(folders)} pages in ${folders.length} categories.`);
