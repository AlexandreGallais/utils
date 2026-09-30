// Renders the rule reference of the wiki: one page per lint block (every rule, its setting, the reason and a
// link to its documentation), an index of the blocks, and the sidebar of the section.

import path from 'node:path';
import { escapeCell, escapeText } from './markdown.mjs';

/** Labels of the usual file globs of the blocks (lint/eslint/setup/files.mjs). */
const FILE_LABELS = new Map([
  ['**/*.js,**/*.mjs,**/*.ts,**/*.mts', 'JS + TS'],
  ['**/*.ts,**/*.mts', 'TS'],
  ['**/*.ts', 'TS'],
  ['**/*.js,**/*.mjs,**/*.mts', 'Node (configs, scripts)'],
  ['**/*.spec.ts,**/*.bench.ts', 'specs, benchmarks'],
  ['**/*.spec.ts,**/testing/**,**/*.bench.ts', 'test code'],
  ['**/*.html', 'HTML templates'],
  ['**/*.scss', 'SCSS'],
]);

/**
 * Names the files a rule applies to.
 *
 * @param files - The globs of its config.
 * @returns A short label, or the globs as code.
 */
function filesLabel(files) {
  return FILE_LABELS.get(files.join(',')) ?? files.map((glob) => `\`${glob}\``).join(', ');
}

const SEVERITIES = new Map([
  [0, 'off'],
  [1, 'warn'],
  [2, 'error'],
]);

/**
 * Describes the setting of a rule: its severity, and its options in short.
 *
 * @param value - The value of the rule in the config.
 * @returns The setting, such as `error` or `error, with options`.
 */
function settingOf(value) {
  const [severity, ...options] = [value].flat();
  const level = SEVERITIES.get(severity) ?? String(severity);
  if (options.length === 0) {
    return level;
  }
  const text = JSON.stringify(options.length === 1 ? options[0] : options);
  const short = text.length > 60 ? `${text.slice(0, 57)}…` : text;
  return `${level}, \`${short}\``;
}

/**
 * Builds the page path of a block, such as `eslint/rules/conditions`.
 *
 * @param file - The block file.
 * @returns The path, without extension.
 */
export function blockPagePath(file) {
  const relative = path.relative('lint', file).replace(/\.mjs$/v, '');
  return relative.split(path.sep).join('/');
}

/**
 * Renders the page of one block.
 *
 * @param block - The block, with its rules.
 * @returns The page content.
 */
export function renderBlockPage(block) {
  const active = block.rules.filter(({ value }) => ![0, 'off'].includes([value].flat()[0]));
  const lines = [
    `# ${blockPagePath(block.file)}`,
    '',
    escapeText(block.description),
    '',
    `**${block.rules.length} rules**, ${active.length} on. Source: [\`${block.file}\`](https://github.com/AlexandreGallais/utils/blob/main/${block.file}).`,
    '',
    '| Rule | Setting | Files | What it checks | Why |',
    '| --- | --- | --- | --- | --- |',
  ];
  for (const { rule, value, files, reason, url, description } of block.rules) {
    const name = url === undefined ? `\`${rule}\`` : `[\`${rule}\`](${url})`;
    const why = reason === '' ? '—' : escapeCell(reason);
    const what = description === '' ? '—' : escapeCell(description);
    lines.push(`| ${name} | ${escapeCell(settingOf(value))} | ${filesLabel(files)} | ${what} | ${why} |`);
  }
  return `${lines.join('\n')}\n`;
}

/**
 * Renders the index of every block.
 *
 * @param blocks - The ESLint blocks.
 * @returns The page content.
 */
export function renderLintIndex(blocks) {
  const lines = [
    '# Lint rules',
    '',
    'Every rule of every ESLint and Stylelint block of `lint/`, generated from the sources: its setting, what it checks (as the',
    'rule describes itself), the reason written above it (`Custom:` a project choice, `Off:` disabled on purpose,',
    '`Deprecated:` replaced, `Warn:` the exception that justifies disabling it) and a link to its documentation.',
    'An `error` is a real mistake or a style the autofix applies: it cannot be disabled. A `warn` is a style',
    'without autofix: it may be disabled for one line, with a reason. Search a rule name with <kbd>Ctrl</kbd>',
    '<kbd>K</kbd>.',
    '',
    '| Block | Rules | What it covers |',
    '| --- | --- | --- |',
  ];
  for (const block of blocks) {
    const page = blockPagePath(block.file);
    lines.push(`| [${page}](./${page}.md) | ${block.rules.length} | ${escapeCell(block.description)} |`);
  }
  return `${lines.join('\n')}\n`;
}

/**
 * Builds the sidebar of the rule reference, grouped by folder.
 *
 * @param blocks - The ESLint blocks.
 * @returns The sidebar items.
 */
export function createLintSidebar(blocks) {
  const groups = new Map();
  for (const block of blocks) {
    const page = blockPagePath(block.file);
    const group = page.split('/').slice(0, -1).join('/');
    const items = groups.get(group) ?? [];
    items.push({ text: page.split('/').at(-1), link: `/lint-rules/${page}` });
    groups.set(group, items);
  }
  return [
    { text: 'Overview', link: '/lint-rules/' },
    ...[...groups].map(([group, items]) => ({ text: group, collapsed: true, items })),
  ];
}
