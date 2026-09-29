// Reads the public exports of the library from the index.ts of each folder, with their JSDoc and source.

import fs from 'node:fs';
import path from 'node:path';
import { parseJsdoc } from './parse-jsdoc.mjs';

const SOURCE_DIRECTORY = 'src';
const EXPORT_PATTERN = /^export (?<isType>type )?\{ (?<name>\w+) \} from '\.\/(?<file>[\w\-.\/]+)';$/gmv;
const DECLARATION_PATTERN = /^export (?:declare )?(?:async )?(?<kind>class|enum|function\*?|interface|type) /mv;
const IMPORT_PATTERN = /^import (?:type )?\{[^\}]*\} from '(?<specifier>\.[^']+)';$/gmv;
const DESCRIPTION_PATTERN = /^\/\/ (?<description>.+)$/mv;
const JSDOC_START = '/**';
const JSDOC_END = '*/';

/** Titles of the categories, by folder. */
const CATEGORY_TITLES = new Map([
  ['alarm', 'Alarms'],
  ['angle', 'Angles'],
  ['animation', 'Animation'],
  ['async', 'Async'],
  ['chart', 'Charts'],
  ['collection', 'Collections'],
  ['color', 'Colors'],
  ['date', 'Dates'],
  ['dom', 'DOM & signals'],
  ['duration', 'Durations'],
  ['enum', 'Enums'],
  ['event', 'Events'],
  ['format', 'Formatting'],
  ['function', 'Functions'],
  ['geometry', 'Geometry'],
  ['guard', 'Guards'],
  ['log', 'Logging'],
  ['math', 'Math'],
  ['object', 'Objects'],
  ['path', 'Paths'],
  ['perf', 'Performance'],
  ['random', 'Random'],
  ['stats', 'Statistics'],
  ['storage', 'Storage'],
  ['string', 'Strings'],
  ['structure', 'Data structures'],
  ['svg', 'SVG'],
  ['time', 'Time & clock'],
  ['tracking', 'Live values'],
  ['types', 'Types'],
  ['unit', 'Units'],
]);

/**
 * Converts a camelCase or PascalCase name to kebab-case, like the file names of the library.
 *
 * @param name - An export name, such as `formatNumberSimple`.
 * @returns The kebab-case name, such as `format-number-simple`.
 */
export function toKebabCase(name) {
  return name.replaceAll(/(?<before>[\da-z])(?<upper>[A-Z])/gv, '$<before>-$<upper>').toLowerCase();
}

/**
 * Lists the local files a source file imports directly.
 *
 * @param file - Path of the source file.
 * @returns The imported files, relative to the repository.
 */
export function directDependenciesOf(file) {
  const source = fs.readFileSync(file, 'utf8');
  return [...source.matchAll(IMPORT_PATTERN)].map(({ groups }) => path.join(path.dirname(file), groups.specifier));
}

/**
 * Lists the local files a source file imports, transitively.
 *
 * @param file - Path of the source file.
 * @param seen - Files already collected.
 * @returns The dependencies, relative to the repository, sorted.
 */
export function dependenciesOf(file, seen = new Set()) {
  const source = fs.readFileSync(file, 'utf8');
  for (const { groups } of source.matchAll(IMPORT_PATTERN)) {
    const dependency = path.join(path.dirname(file), groups.specifier);
    if (!seen.has(dependency)) {
      seen.add(dependency);
      dependenciesOf(dependency, seen);
    }
  }
  return [...seen].toSorted();
}

/**
 * Reads the declaration of an export: the signature of a function or a class, the whole of a type.
 *
 * @param source - Content of the file.
 * @param start - Index where the `export` keyword starts.
 * @param kind - `function`, `class`, `type`, `interface` or `enum`.
 * @returns The declaration to show, without the body of a function or a class.
 */
function readDeclaration(source, start, kind) {
  const rest = source.slice(start);
  if (kind === 'class' || kind.startsWith('function')) {
    // The body starts at the first `{` ending a line (parameters may contain object types).
    return rest.slice(0, rest.indexOf('{\n')).trim();
  }
  const end = rest.search(/\n\}\n|;\n(?!\s)/v);
  return rest.slice(0, end + 2).trim();
}

/**
 * Reads the documentation of the export of a file.
 *
 * @param source - Content of the file.
 * @returns The kind, the declaration, the description and the tags of the export.
 */
function readExport(source) {
  const match = DECLARATION_PATTERN.exec(source);
  if (!match?.groups) {
    return { kind: 'type', declaration: '', description: '', tags: [] };
  }
  const kind = match.groups.kind.replace('*', '');
  const commentEnd = source.lastIndexOf(JSDOC_END, match.index);
  // Only blank lines or line comments (an `eslint-disable-next-line`) may separate the JSDoc from the export.
  const between = source.slice(commentEnd + JSDOC_END.length, match.index);
  const isDocumented =
    commentEnd !== -1 && between.split('\n').every((line) => line.trim() === '' || line.trimStart().startsWith('//'));
  const jsdoc = isDocumented
    ? source.slice(source.lastIndexOf(JSDOC_START, commentEnd) + JSDOC_START.length, commentEnd)
    : '';
  return { kind, declaration: readDeclaration(source, match.index, kind), ...parseJsdoc(jsdoc) };
}

/**
 * Reads the exports of one folder, from its `index.ts`.
 *
 * @param folder - The folder name, such as `format`.
 * @returns The folder, with its title, its description and its exports sorted by name.
 */
function readFolder(folder) {
  const index = fs.readFileSync(path.join(SOURCE_DIRECTORY, folder, 'index.ts'), 'utf8');
  const exports = [...index.matchAll(EXPORT_PATTERN)]
    .map(({ groups }) => {
      const file = path.join(SOURCE_DIRECTORY, folder, groups.file);
      const source = fs.readFileSync(file, 'utf8');
      return { name: groups.name, folder, file, slug: toKebabCase(groups.name), source, ...readExport(source) };
    })
    .toSorted((a, b) => a.name.localeCompare(b.name, 'en'));
  const description = DESCRIPTION_PATTERN.exec(index)?.groups?.description ?? '';
  return { folder, title: CATEGORY_TITLES.get(folder) ?? folder, description, exports };
}

/**
 * Reads every folder of `src/` that has an `index.ts`.
 *
 * @returns The folders, sorted by name.
 */
export function readFolders() {
  return fs
    .readdirSync(SOURCE_DIRECTORY, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(SOURCE_DIRECTORY, entry.name, 'index.ts')))
    .map((entry) => entry.name)
    .toSorted()
    .map((folder) => readFolder(folder));
}
