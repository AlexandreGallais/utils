// Resolves the relative imports of a source file to the files that declare what it imports: an import of a
// folder (`../math`) goes through its index.ts to the file of each imported name (`src/math/clamp.ts`).

import fs from 'node:fs';
import path from 'node:path';
import { readReexports, resolveModule } from '../../lint/eslint/rules/local/read-reexports.mjs';

const IMPORT_PATTERN = /^import (?:type )?\{(?<names>[^\}]*)\} from '(?<specifier>\.[^']+)';$/gmv;
const INDEX_FILE = /[\\\/]index\.ts$/v;

/**
 * Reads the imported names of `import { a, b as c, type d }`.
 *
 * @param text - The text between the braces.
 * @returns The names as the module exports them.
 */
function readNames(text) {
  return text
    .split(',')
    .map((specifier) => specifier.replaceAll(/\s+/gv, ' ').trim())
    .map((specifier) => (specifier.startsWith('type ') ? specifier.slice('type '.length) : specifier))
    .filter((specifier) => specifier !== '')
    .map((specifier) => specifier.split(' as ')[0] ?? specifier);
}

/**
 * Tells whether a file declares an export of that name.
 *
 * @param file - The source file.
 * @param name - The exported name.
 * @returns Whether `export function name`, `export type name`… is in the file.
 */
function declares(file, name) {
  const pattern = new RegExp(
    String.raw`^export (?:declare )?(?:async )?(?:abstract )?(?:class|const|enum|function\*?|interface|let|type) ${name}\b`,
    'mv',
  );
  return pattern.test(fs.readFileSync(file, 'utf8'));
}

/**
 * Finds the file that declares a name an index re-exports.
 *
 * @param index - The index file.
 * @param name - The name the index exports.
 * @returns The declaring file, or `undefined`.
 */
function findDeclaringFile(index, name) {
  for (const [module, names] of readReexports(index)) {
    const isDeclared =
      [...names].some(([, exported]) => exported === name) || (names.has('*') && declares(module, name));
    if (!INDEX_FILE.test(module) && isDeclared) {
      return module;
    }
  }
  return undefined;
}

/**
 * Lists what a source file imports from the library, name by name, with the file that declares each name.
 *
 * @param file - The source file, relative to the repository.
 * @returns The imports: name and declaring file, relative to the repository.
 */
export function directImports(file) {
  const source = fs.readFileSync(file, 'utf8');
  return [...source.matchAll(IMPORT_PATTERN)].flatMap(({ groups }) => {
    const module = resolveModule(path.dirname(path.resolve(file)), groups.specifier);
    if (module === undefined) {
      return [];
    }
    return readNames(groups.names).flatMap((name) => {
      const declaring = INDEX_FILE.test(module) ? findDeclaringFile(module, name) : module;
      return declaring === undefined ? [] : [{ name, file: path.relative(process.cwd(), declaring) }];
    });
  });
}

/**
 * Lists the files of the library a source file needs, transitively.
 *
 * @param file - The source file, relative to the repository.
 * @param seen - Files already collected.
 * @returns The files, relative to the repository, sorted, without the file itself.
 */
export function dependenciesOf(file, seen = new Set([file])) {
  for (const { file: dependency } of directImports(file)) {
    if (!seen.has(dependency)) {
      seen.add(dependency);
      dependenciesOf(dependency, seen);
    }
  }
  return [...seen].filter((dependency) => dependency !== file).toSorted();
}
