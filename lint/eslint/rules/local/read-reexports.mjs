// Reads what an index file re-exports, following `export * from` and `export { a as b } from` through nested
// index files, so that local/import-folders knows whether a deep import can go through a folder's index. A
// light textual reading: enough for index files, which only re-export.

import fs from 'node:fs';
import path from 'node:path';

/** Extensions tried to resolve a relative module path, in order. */
const EXTENSIONS = ['.ts', '.mts', '.tsx', '.js', '.mjs'];
const STAR_EXPORT = /export\s+\*\s+from\s+['"](?<source>[^'"]+)['"]/gv;
const NAMED_EXPORT = /export\s+(?:type\s+)?\{(?<names>[^\}]*)\}\s*from\s+['"](?<source>[^'"]+)['"]/gv;
/** A star re-export: every name of the module but its default export. */
const STAR = '*';
/** How deep index files may nest. */
const MAX_DEPTH = 8;

/** Parsed index files, by path, with their modification time. */
const cache = new Map();

/**
 * Resolves a relative module path to a file, like a bundler: as is, with an extension, or as a folder index.
 *
 * @param {string} directory - The folder of the importing file.
 * @param {string} source - The module path, such as `./button` or `./button.component.ts`.
 * @returns {string | undefined} The absolute file, or `undefined` when none exists.
 */
export function resolveModule(directory, source) {
  const base = path.resolve(directory, source);
  const candidates = [
    base,
    ...EXTENSIONS.map((extension) => `${base}${extension}`),
    ...EXTENSIONS.map((extension) => path.join(base, `index${extension}`)),
  ];
  return candidates.find((file) => fs.existsSync(file) && fs.statSync(file).isFile());
}

/**
 * Finds the index file of a folder.
 *
 * @param {string} folder - The absolute folder.
 * @returns {string | undefined} Its index file, or `undefined` without one.
 */
export function findIndex(folder) {
  return EXTENSIONS.map((extension) => path.join(folder, `index${extension}`)).find((file) => fs.existsSync(file));
}

/**
 * Adds a re-export to the map of a file.
 *
 * @param {Map<string, Map<string, string>>} exports - The re-exports: module file → original name → exported name.
 * @param {string} module - The module file.
 * @param {string} original - The name in the module, or `*`.
 * @param {string} exported - The name in the index, or `*`.
 */
function add(exports, module, original, exported) {
  const names = exports.get(module) ?? new Map();
  if (!names.has(original)) {
    names.set(original, exported);
  }
  exports.set(module, names);
}

/**
 * Reads the specifiers of `export { a, b as c, type d } from`.
 *
 * @param {string} text - The text between the braces.
 * @returns {[string, string][]} The pairs [original name, exported name].
 */
function readSpecifiers(text) {
  return text
    .split(',')
    .map((specifier) => specifier.replaceAll(/\s+/gv, ' ').trim())
    .map((specifier) => (specifier.startsWith('type ') ? specifier.slice('type '.length) : specifier))
    .filter((specifier) => specifier !== '')
    .map((specifier) => {
      const [original = '', exported = original] = specifier.split(' as ');
      return [original, exported];
    });
}

/**
 * Adds what `export * from module` brings: the module itself, and what it re-exports (but its default).
 *
 * @param {Map<string, Map<string, string>>} exports - The re-exports being read.
 * @param {string} module - The module file.
 * @param {Map<string, Map<string, string>>} moduleExports - What the module itself re-exports.
 */
function addStarExport(exports, module, moduleExports) {
  add(exports, module, STAR, STAR);
  for (const [inner, names] of moduleExports) {
    for (const [original, exported] of names) {
      if (exported !== 'default') {
        add(exports, inner, original, exported);
      }
    }
  }
}

/**
 * Adds what `export { a as b } from module` brings: the names of the module, and the deeper modules they come
 * from (named, or through `export *`: an import from that deeper module proves the name is there).
 *
 * @param {Map<string, Map<string, string>>} exports - The re-exports being read.
 * @param {string} module - The module file.
 * @param {[string, string][]} specifiers - The pairs [original name, exported name].
 * @param {Map<string, Map<string, string>>} moduleExports - What the module itself re-exports.
 */
function addNamedExports(exports, module, specifiers, moduleExports) {
  for (const [original, exported] of specifiers) {
    add(exports, module, original, exported);
  }
  for (const [inner, names] of moduleExports) {
    const byExportedName = new Map([...names].map(([original, exported]) => [exported, original]));
    for (const [original, exported] of specifiers) {
      const innerOriginal = byExportedName.get(original);
      if (innerOriginal !== undefined && innerOriginal !== STAR) {
        add(exports, inner, innerOriginal, exported);
      } else if (names.has(STAR) && original !== 'default') {
        add(exports, inner, original, exported);
      }
    }
  }
}

/**
 * Reads the re-exports of a file, and of the files it re-exports from.
 *
 * @param {string} file - The index file.
 * @param {number} depth - How many index files were followed to reach it.
 * @returns {Map<string, Map<string, string>>} The re-exports: module file → original name → exported name.
 */
function readFile(file, depth) {
  const exports = new Map();
  if (depth > MAX_DEPTH) {
    return exports;
  }
  const text = fs.readFileSync(file, 'utf8');
  const directory = path.dirname(file);
  for (const { groups } of text.matchAll(STAR_EXPORT)) {
    const module = resolveModule(directory, groups.source);
    if (module !== undefined) {
      addStarExport(exports, module, readFile(module, depth + 1));
    }
  }
  for (const { groups } of text.matchAll(NAMED_EXPORT)) {
    const module = resolveModule(directory, groups.source);
    if (module !== undefined) {
      addNamedExports(exports, module, readSpecifiers(groups.names), readFile(module, depth + 1));
    }
  }
  return exports;
}

/**
 * Reads what an index file re-exports, cached until the file changes.
 *
 * @param {string} file - The index file.
 * @returns {Map<string, Map<string, string>>} The re-exports: module file → original name (or `*`) → exported
 *   name (or `*`).
 */
export function readReexports(file) {
  const modified = fs.statSync(file).mtimeMs;
  const cached = cache.get(file);
  if (cached?.modified === modified) {
    return cached.exports;
  }
  const exports = readFile(file, 0);
  cache.set(file, { modified, exports });
  return exports;
}

/**
 * Finds the name under which an index re-exports a name of a module.
 *
 * @param {Map<string, Map<string, string>>} exports - The re-exports of the index.
 * @param {string} module - The module file.
 * @param {string} name - The name in the module (`default` for its default export).
 * @returns {string | undefined} The exported name, or `undefined` when the index does not re-export it.
 */
export function findExportedName(exports, module, name) {
  const names = exports.get(module);
  if (names === undefined) {
    return undefined;
  }
  return names.get(name) ?? (name !== 'default' && names.has(STAR) ? name : undefined);
}
