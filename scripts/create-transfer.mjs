// Packs folders into one text file that recreates them: `pnpm transfer lint src/svg` writes
// transfer/lint+src-svg.mjs. Copy its text anywhere a file can be pasted (a machine without download), save it,
// and run `node lint+src-svg.mjs [destination]`: it writes every file of the folders, with their tree. A folder of
// src/ brings the folders of src/ it imports (`../math`, `../internal`), so that the copy compiles.

import fs from 'node:fs';
import path from 'node:path';

const OUTPUT_DIRECTORY = 'transfer';
const DEFAULT_FOLDERS = ['lint'];
const SOURCE_DIRECTORY = 'src';
const SKIPPED_FOLDERS = new Set(['node_modules', 'dist', 'coverage']);
const RELATIVE_IMPORT = /from '(?<specifier>\.[^']+)'/gv;

/**
 * Lists the files of a folder and its subfolders.
 *
 * @param {string} directory - The folder, relative to the repository.
 * @returns {string[]} The files, relative to the repository, sorted.
 */
function listFiles(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return SKIPPED_FOLDERS.has(entry.name) ? [] : listFiles(file);
      }
      return [file];
    })
    .toSorted();
}

/**
 * Finds the folders of src/ that a folder of src/ imports.
 *
 * @param {string} folder - A folder of src/, such as `src/svg`.
 * @returns {string[]} The imported folders of src/, such as `src/math`.
 */
function findImportedFolders(folder) {
  const imported = new Set();
  for (const file of listFiles(folder).filter((name) => name.endsWith('.ts'))) {
    for (const { groups } of fs.readFileSync(file, 'utf8').matchAll(RELATIVE_IMPORT)) {
      const target = path.relative(SOURCE_DIRECTORY, path.resolve(path.dirname(file), groups.specifier));
      const [theme] = target.split(path.sep);
      if (theme !== undefined && !theme.startsWith('..')) {
        imported.add(path.join(SOURCE_DIRECTORY, theme));
      }
    }
  }
  imported.delete(folder);
  return [...imported];
}

/**
 * Adds the folders of src/ that the given folders need, transitively.
 *
 * @param {string[]} folders - The folders asked for.
 * @returns {string[]} The folders to pack, the asked ones first.
 */
function withImportedFolders(folders) {
  const packed = [...folders];
  for (let index = 0; index < packed.length; index += 1) {
    const folder = packed[index] ?? '';
    const isSourceFolder = path.dirname(folder) === SOURCE_DIRECTORY;
    const missing = isSourceFolder ? findImportedFolders(folder).filter((other) => !packed.includes(other)) : [];
    packed.push(...missing);
  }
  return packed;
}

/**
 * Writes the script that recreates the files.
 *
 * @param {string[]} folders - The packed folders.
 * @param {[string, string][]} files - The files: path and content.
 * @returns {string} The script.
 */
function writeScript(folders, files) {
  const entries = files.map(([file, content]) => `  [${JSON.stringify(file)}, ${JSON.stringify(content)}],`);
  return [
    `// Recreates ${folders.join(', ')} (${files.length} files): \`node <this file> [destination]\`, in the folder`,
    '// that receives them (the current folder by default). Existing files are kept unless `--force` is given.',
    '',
    "import fs from 'node:fs';",
    "import path from 'node:path';",
    '',
    'const FILES = [',
    ...entries,
    '];',
    '',
    "const destination = path.resolve(process.argv.slice(2).find((argument) => !argument.startsWith('--')) ?? '.');",
    "const isForced = process.argv.includes('--force');",
    'let written = 0;',
    'for (const [file, content] of FILES) {',
    '  const target = path.join(destination, file);',
    '  if (fs.existsSync(target) && !isForced) {',
    "    console.warn('kept (exists): ' + file);",
    '    continue;',
    '  }',
    '  fs.mkdirSync(path.dirname(target), { recursive: true });',
    '  fs.writeFileSync(target, content);',
    '  written += 1;',
    '}',
    "console.info(written + ' files written in ' + destination + '.');",
    '',
  ].join('\n');
}

const asked = process.argv.slice(2).map((folder) => path.normalize(folder).replace(/[\\\/]$/v, ''));
const folders = withImportedFolders(asked.length > 0 ? asked : DEFAULT_FOLDERS);
const files = folders
  .flatMap((folder) => listFiles(folder))
  .map((file) => [file.split(path.sep).join('/'), fs.readFileSync(file, 'utf8')]);
const name = (asked.length > 0 ? asked : DEFAULT_FOLDERS).map((folder) => folder.replaceAll(/[\\\/]/gv, '-')).join('+');
const output = path.join(OUTPUT_DIRECTORY, `${name}.mjs`);
fs.mkdirSync(OUTPUT_DIRECTORY, { recursive: true });
fs.writeFileSync(output, writeScript(folders, files));
console.info(`${output}: ${files.length} files from ${folders.join(', ')}.`);
