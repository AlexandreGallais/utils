// Writes the info rules of the workspace into `.vscode/settings.json`, so that VS Code shows them in blue:
// `node lint/eslint/setup/editor-settings.mjs` at the root, after changing which rules are `info`. It reads
// every eslint.config.mjs (the root and the projects) and sets `eslint.rules.customizations`; the other
// settings stay.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SETTINGS_FILE = path.resolve('.vscode/settings.json');
const CUSTOMIZATIONS_KEY = 'eslint.rules.customizations';
const SKIPPED_FOLDERS = new Set(['node_modules', 'dist', '.angular', '.git', 'coverage']);

/**
 * Finds the eslint.config.mjs files of a folder and its subfolders, without the dependencies and outputs.
 *
 * @param {string} directory - The folder to search.
 * @returns {string[]} The config files.
 */
function findConfigFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return SKIPPED_FOLDERS.has(entry.name) ? [] : findConfigFiles(file);
    }
    return entry.name === 'eslint.config.mjs' ? [file] : [];
  });
}

const configFiles = findConfigFiles('.');
const modules = await Promise.all(configFiles.map((file) => import(pathToFileURL(path.resolve(file)).href)));
const infoRules = [
  ...new Set(
    modules.flatMap(({ default: configs }) =>
      configs.flatMap((config) => Object.keys(config.settings?.local?.infoRules ?? {})),
    ),
  ),
].toSorted();
const customizations = infoRules.map((rule) => ({ rule, severity: 'info' }));
const settings = fs.existsSync(SETTINGS_FILE) ? JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8')) : {};
fs.mkdirSync(path.dirname(SETTINGS_FILE), { recursive: true });
fs.writeFileSync(
  SETTINGS_FILE,
  `${JSON.stringify({ ...settings, [CUSTOMIZATIONS_KEY]: customizations }, undefined, 2)}\n`,
);
console.info(`${SETTINGS_FILE}: ${infoRules.length} info rules shown in blue, from ${configFiles.length} configs.`);
