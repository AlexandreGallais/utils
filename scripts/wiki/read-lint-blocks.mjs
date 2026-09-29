// Reads the lint blocks of lint/ for the rule reference of the wiki: each block evaluated with sample options,
// its rules, the reason written above each rule, and the link to the documentation of each rule.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { builtinRules } from 'eslint/use-at-your-own-risk';

const ESLINT_DIRECTORY = 'lint/eslint';
const STYLELINT_DIRECTORY = 'lint/stylelint';
const RULE_KEY_PATTERN = /^\s*(?:'(?<quoted>[^']+)'|(?<bare>[a-z][\w\-]*)):/v;
const COMMENT_PATTERN = /^\s*\/\/ (?<text>.*)$/v;

/** Sample arguments of the blocks that take options (the rules do not depend on them). */
const SAMPLE_ARGUMENTS = new Map([
  ['imports', ['.', ['**/*.spec.ts']]],
  ['jsdoc', [['src/**'], ['src/**/*.spec.ts']]],
  ['architecture', ['tsconfig.json']],
  ['compat', [['last 2 Chrome versions'], []]],
  ['storybook', ['.']],
  ['angular', ['app']],
  ['typescript', ['.']],
  ['design-tokens', [['**/tokens/**']]],
  ['layers', [['reset', 'tokens', 'base', 'layout', 'components', 'utilities', 'overrides']]],
]);

/** Documentation of the Stylelint plugin rules, by rule prefix. */
const STYLELINT_PLUGIN_DOCS = new Map([
  ['scss', 'https://github.com/stylelint-scss/stylelint-scss/tree/master/src/rules/'],
  ['order', 'https://github.com/hudochenkov/stylelint-order#rules'],
  ['a11y', 'https://github.com/double-great/stylelint-a11y#rules'],
  ['scale-unlimited', 'https://github.com/AndyOGo/stylelint-declaration-strict-value#readme'],
  ['plugin', 'https://github.com/kristerkari/stylelint-high-performance-animation#readme'],
  ['logical-css', 'https://github.com/yuschick/stylelint-plugin-logical-css#rules'],
  ['prettier', 'https://github.com/prettier/stylelint-prettier#readme'],
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
    .filter((file) => file.endsWith('.mjs') && !file.includes(`${path.sep}rules${path.sep}`))
    .filter((file) => !['files.mjs', 'compose.mjs', 'without-plugins.mjs'].includes(path.basename(file)))
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
 * Reads the description of a block: the comment lines at the top of its file, after the prefix legend.
 *
 * @param source - The content of the block file.
 * @returns The description, on one line.
 */
function readDescription(source) {
  const lines = [];
  for (const line of source.split('\n').slice(1)) {
    const text = COMMENT_PATTERN.exec(line)?.groups?.text;
    if (text === undefined) {
      break;
    }
    lines.push(text);
  }
  return lines.join(' ');
}

/**
 * Finds the documentation link of an ESLint rule.
 *
 * @param rule - The rule name, such as `eqeqeq` or `unicorn/no-null`.
 * @param plugins - The plugins registered by the block, by prefix.
 * @returns The link, or `undefined` when the rule does not give one.
 */
function eslintRuleUrl(rule, plugins) {
  const separator = rule.lastIndexOf('/');
  const definition =
    separator === -1
      ? builtinRules.get(rule)
      : plugins.get(rule.slice(0, separator))?.rules?.[rule.slice(separator + 1)];
  return definition?.meta?.docs?.url;
}

/**
 * Finds the documentation link of a Stylelint rule.
 *
 * @param rule - The rule name, such as `color-named` or `scss/at-use-no-unnamespaced`.
 * @returns The link, or `undefined` for a rule of this repository.
 */
function stylelintRuleUrl(rule) {
  const [prefix, name] = rule.includes('/') ? rule.split('/', 2) : ['', rule];
  if (prefix === '') {
    return `https://stylelint.io/user-guide/rules/${name}`;
  }
  const base = STYLELINT_PLUGIN_DOCS.get(prefix);
  return base?.endsWith('/') === true ? `${base}${name}` : base;
}

/**
 * Evaluates a block file with sample options.
 *
 * @param file - The block file.
 * @returns {Promise<unknown>} What the block returns.
 */
async function evaluateBlock(file) {
  // eslint-disable-next-line no-unsanitized/method -- imports the lint blocks of this repository, listed from its folders.
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
      url: eslintRuleUrl(rule, plugins),
    })),
  );
  return { file, description: readDescription(source), rules };
}

/**
 * Describes one Stylelint block file.
 *
 * @param file - The block file.
 * @returns {Promise<object>} The block, with its rules and their reasons and links.
 */
async function readStylelintBlock(file) {
  const source = fs.readFileSync(file, 'utf8');
  const comments = readRuleComments(source);
  const config = await evaluateBlock(file);
  const rules = Object.entries(config.rules ?? {}).map(([rule, value]) => ({
    rule,
    // A Stylelint rule is `true`, a primary option, or `[primary, secondary options]`.
    value: [true, [value].flat().length > 1 ? value : [value].flat()[0]],
    files: ['**/*.scss'],
    reason: comments.get(rule) ?? '',
    url: stylelintRuleUrl(rule),
  }));
  return { file, description: readDescription(source), rules, extends: [config.extends ?? []].flat() };
}

/**
 * Reads every lint block of lint/.
 *
 * @returns {Promise<{ eslint: object[], stylelint: object[] }>} The ESLint and Stylelint blocks.
 */
export async function readLintBlocks() {
  const eslint = await Promise.all(listBlockFiles(ESLINT_DIRECTORY).map((file) => readEslintBlock(file)));
  const stylelint = await Promise.all(listBlockFiles(STYLELINT_DIRECTORY).map((file) => readStylelintBlock(file)));
  return { eslint, stylelint };
}
