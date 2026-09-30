// Reads the ESLint blocks of lint/ for the rule reference of the wiki: each block evaluated with sample options,
// its rules, the reason written above each rule, and the link and description each rule gives of itself.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { builtinRules } from 'eslint/use-at-your-own-risk';

const ESLINT_DIRECTORY = 'lint/eslint';
const STYLELINT_DIRECTORY = 'lint/stylelint';
const RULE_KEY_PATTERN = /^\s*(?:'(?<quoted>[^']+)'|(?<bare>[a-z][\w\-]*)):/v;
const COMMENT_PATTERN = /^\s*\/\/ (?<text>.*)$/v;
/** The first lines of a block file: the legend of the comment prefixes. */
const LEGEND_STARTS = ['Comment prefixes:', '`Warn` = ', 'autofix applies', '`info` = '];

/** Sample arguments of the blocks that take options (the rules do not depend on them). */
const SAMPLE_ARGUMENTS = new Map([
  ['imports', ['.']],
  ['browser', [['src/**/*.ts'], ['**/*.spec.ts']]],
  ['exports', [['src/**/*.ts']]],
  ['library', [['src/**/*.ts']]],
  ['storybook', ['.']],
  ['angular-components', ['app']],
]);

/** Folder of the rule blocks; its local/ subfolder holds the rules written here, the other folders the set-up and the presets. */
const BLOCK_FOLDERS = ['eslint/rules', 'stylelint/rules'];

/** Documentation of the Stylelint rules, by plugin prefix (`''` for the core rules). */
const STYLELINT_DOCS = new Map([
  ['', 'https://stylelint.io/user-guide/rules/'],
  ['scss', 'https://github.com/stylelint-scss/stylelint-scss/tree/master/src/rules/'],
  ['order', 'https://github.com/hudochenkov/stylelint-order/blob/master/rules/'],
  ['prettier', 'https://github.com/prettier/stylelint-prettier#'],
]);

/**
 * Lists the block files of a folder, recursively, without the helpers.
 *
 * @param directory - The folder of the blocks.
 * @returns The files, sorted.
 */
function listBlockFiles(directory) {
  return fs
    .readdirSync(directory, { recursive: true })
    .map((file) => path.join(directory, String(file)))
    .filter((file) => file.endsWith('.mjs'))
    .filter((file) => BLOCK_FOLDERS.some((folder) => path.dirname(file) === path.join('lint', folder)))
    .toSorted();
}

/**
 * Reads the comment written above each rule of a block file.
 *
 * @param source - The content of the block file.
 * @returns The reasons, by rule name.
 */
export function readRuleComments(source) {
  const comments = new Map();
  let pending = [];
  for (const line of source.split('\n')) {
    const comment = COMMENT_PATTERN.exec(line)?.groups?.text;
    const key = RULE_KEY_PATTERN.exec(line)?.groups;
    if (comment !== undefined && !comment.startsWith('----')) {
      pending.push(comment);
    } else if (key === undefined) {
      pending = [];
    } else {
      const rule = key.quoted ?? key.bare;
      // The first comment of a rule is its reason; a later one belongs to an override.
      if (pending.length > 0 && !comments.has(rule)) {
        comments.set(rule, pending.join(' '));
      }
      pending = [];
    }
  }
  return comments;
}

/**
 * Reads the description of a block: the comment lines at the top of its file, without the prefix legend.
 *
 * @param source - The content of the block file.
 * @returns The description, on one line.
 */
function readDescription(source) {
  const lines = [];
  for (const line of source.split('\n')) {
    const text = COMMENT_PATTERN.exec(line)?.groups?.text;
    if (text === undefined) {
      break;
    }
    if (!LEGEND_STARTS.some((start) => text.startsWith(start))) {
      lines.push(text);
    }
  }
  return lines.join(' ');
}

/**
 * Finds the documentation of an ESLint rule, as the rule describes itself.
 *
 * @param rule - The rule name, such as `eqeqeq` or `import-x/no-cycle`.
 * @param plugins - The plugins registered by the block, by prefix.
 * @returns {{ url: string | undefined, description: string }} Its link and its one-line description.
 */
function ruleDocs(rule, plugins) {
  const separator = rule.lastIndexOf('/');
  const definition =
    separator === -1
      ? builtinRules.get(rule)
      : plugins.get(rule.slice(0, separator))?.rules?.[rule.slice(separator + 1)];
  return { url: definition?.meta?.docs?.url, description: definition?.meta?.docs?.description ?? '' };
}

/**
 * Evaluates a block file with sample options.
 *
 * @param file - The block file.
 * @returns {Promise<unknown>} What the block returns.
 */
async function evaluateBlock(file) {
  const module = await import(pathToFileURL(path.resolve(file)).href);
  return module.default(...(SAMPLE_ARGUMENTS.get(path.basename(file, '.mjs')) ?? []));
}

/**
 * Describes one ESLint block file: its configs and their rules.
 *
 * @param file - The block file.
 * @returns {Promise<object>} The block, with its rules and their reasons and links.
 */
async function readEslintBlock(file) {
  const source = fs.readFileSync(file, 'utf8');
  const comments = readRuleComments(source);
  const configs = await evaluateBlock(file);
  const plugins = new Map(configs.flatMap((config) => Object.entries(config.plugins ?? {})));
  const rules = configs.flatMap((config) =>
    Object.entries(config.rules ?? {}).map(([rule, value]) => ({
      rule,
      value,
      files: config.files ?? ['every file'],
      reason: comments.get(rule) ?? '',
      ...ruleDocs(rule, plugins),
    })),
  );
  return { file, description: readDescription(source), rules };
}

/**
 * Writes a Stylelint setting like an ESLint one: `[severity, ...options]`, `off` for `null`.
 *
 * @param {unknown} value - The Stylelint setting: `true`, a primary option, or `[primary, secondary options]`.
 * @returns {unknown[]} The setting, such as `['warning', 3]`.
 */
function normaliseStylelintValue(value) {
  if (value === null || value === undefined) {
    return ['off'];
  }
  const [primary, secondary = {}] =
    Array.isArray(value) && value.length === 2 && typeof value[1] === 'object' ? value : [value];
  const { severity = 'error', ...options } = /** @type {Record<string, unknown>} */ (secondary);
  const primaryOptions = primary === true ? [] : [primary];
  return [severity, ...primaryOptions, ...(Object.keys(options).length > 0 ? [options] : [])];
}

/**
 * Describes one Stylelint block file: its rules, their reasons and links.
 *
 * @param {string} file - The block file.
 * @returns {Promise<object>} The block.
 */
async function readStylelintBlock(file) {
  const source = fs.readFileSync(file, 'utf8');
  const comments = readRuleComments(source);
  const config = await evaluateBlock(file);
  const rules = Object.entries(config.rules ?? {}).map(([rule, value]) => {
    const [prefix, name] = rule.includes('/') ? rule.split('/', 2) : ['', rule];
    const base = STYLELINT_DOCS.get(prefix);
    return {
      rule,
      value: normaliseStylelintValue(value),
      files: ['**/*.scss'],
      reason: comments.get(rule) ?? '',
      url: base === undefined ? undefined : `${base}${name}${prefix === 'order' ? '/README.md' : ''}`,
      description: '',
    };
  });
  return { file, description: readDescription(source), rules };
}

/**
 * Reads every ESLint block of lint/.
 *
 * @returns {Promise<object[]>} The blocks, with their rules.
 */
export async function readLintBlocks() {
  const eslint = await Promise.all(listBlockFiles(ESLINT_DIRECTORY).map((file) => readEslintBlock(file)));
  const stylelint = await Promise.all(listBlockFiles(STYLELINT_DIRECTORY).map((file) => readStylelintBlock(file)));
  return [...eslint, ...stylelint];
}
