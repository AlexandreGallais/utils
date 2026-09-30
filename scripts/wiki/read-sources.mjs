// Reads the public exports of the library from the index.ts of each folder, with their JSDoc and source.

import fs from 'node:fs';
import path from 'node:path';
import { parseJsdoc } from './parse-jsdoc.mjs';

const SOURCE_DIRECTORY = 'src';
const EXPORT_PATTERN = /^export (?<isType>type )?\{ (?<name>\w+) \} from '\.\/(?<file>[\w\-.\/]+)';$/gmv;
const DESCRIPTION_PATTERN = /^\/\/ (?<description>.+)$/mv;
const JSDOC_START = '/**';
const JSDOC_END = '*/';

/** Titles of the categories, by folder. */
const CATEGORY_TITLES = new Map([
  ['async', 'Async'],
  ['color', 'Colors'],
  ['duration', 'Durations'],
  ['enum', 'Enums'],
  ['format', 'Formatting'],
  ['guard', 'Guards'],
  ['math', 'Math'],
  ['object', 'Objects'],
  ['path', 'Paths'],
  ['string', 'Strings'],
  ['svg-shape', 'SVG shapes'],
  ['svg-transform', 'SVG transforms'],
  ['types', 'Types'],
]);

/**
 * Converts a camelCase or PascalCase name to kebab-case, like the file names of the library.
 *
 * @param name - An export name, such as `formatNumber`.
 * @returns The kebab-case name, such as `format-number`.
 */
export function toKebabCase(name) {
  return name.replaceAll(/(?<before>[\da-z])(?<upper>[A-Z])/gv, '$<before>-$<upper>').toLowerCase();
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
 * Reads the documentation of an export of a file (a file may export a function and the types that go with it).
 *
 * @param source - Content of the file.
 * @param name - The exported name.
 * @returns The kind, the declaration, the description and the tags of the export.
 */
function readExport(source, name) {
  const declaration = new RegExp(
    String.raw`^export (?:declare )?(?:async )?(?:abstract )?(?<kind>class|enum|function\*?|interface|type) ${name}\b`,
    'mv',
  );
  const match = declaration.exec(source);
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
      const file = `${path.join(SOURCE_DIRECTORY, folder, groups.file)}.ts`;
      const source = fs.readFileSync(file, 'utf8');
      const exported = readExport(source, groups.name);
      return { name: groups.name, folder, file, slug: toKebabCase(groups.name), source, ...exported };
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
  return (
    fs
      .readdirSync(SOURCE_DIRECTORY, { withFileTypes: true })
      // src/internal/ has an index.ts too, but it is private to the library.
      .filter((entry) => entry.isDirectory() && entry.name !== 'internal')
      .filter((entry) => fs.existsSync(path.join(SOURCE_DIRECTORY, entry.name, 'index.ts')))
      .map((entry) => entry.name)
      .toSorted()
      .map((folder) => readFolder(folder))
  );
}
