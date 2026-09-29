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
  const [severity, ...rest] = [value].flat();
  // Stylelint values are normalised by read-lint-blocks as `[true, option]`.
  const options = rest.filter((option) => option !== true);
  const level = severity === true ? 'on' : (SEVERITIES.get(severity) ?? String(severity));
  if (options.length === 0) {
    return level;
  }
  const text = JSON.stringify(options.length === 1 ? options[0] : options);
  const short = text.length > 60 ? `${text.slice(0, 57)}…` : text;
  return `${level}, \`${short}\``;
}

/**
 * Builds the page path of a block, such as `eslint/code/conditions`.
 *
 * @param tool - `eslint` or `stylelint`.
 * @param file - The block file.
 * @returns The path, without extension.
 */
export function blockPagePath(tool, file) {
  const relative = path.relative(path.join('lint', tool), file).replace(/\.mjs$/v, '');
  return `${tool}/${relative.split(path.sep).join('/')}`;
}

/**
 * Renders the page of one block.
 *
 * @param tool - `eslint` or `stylelint`.
 * @param block - The block, with its rules.
 * @returns The page content.
 */
export function renderBlockPage(tool, block) {
  const active = block.rules.filter(({ value }) => ![0, 'off', null, false].includes([value].flat()[0]));
  const lines = [
    `# ${blockPagePath(tool, block.file)}`,
    '',
    escapeText(block.description),
    '',
    `**${block.rules.length} rules**, ${active.length} on. Source: [\`${block.file}\`](https://github.com/AlexandreGallais/utils/blob/main/${block.file}).`,
    '',
  ];
  if ((block.extends ?? []).length > 0) {
    const presets = block.extends.map((name) => `\`${name}\``).join(', ');
    lines.push(`Extends ${presets}: their rules apply too.`, '');
  }
  lines.push('| Rule | Setting | Files | Why |', '| --- | --- | --- | --- |');
  for (const { rule, value, files, reason, url } of block.rules) {
    const name = url === undefined ? `\`${rule}\`` : `[\`${rule}\`](${url})`;
    const why = reason === '' ? '—' : escapeCell(reason);
    lines.push(`| ${name} | ${escapeCell(settingOf(value))} | ${filesLabel(files)} | ${why} |`);
  }
  return `${lines.join('\n')}\n`;
}

/**
 * Renders the index of every block.
 *
 * @param blocks - The ESLint and Stylelint blocks.
 * @returns The page content.
 */
export function renderLintIndex(blocks) {
  const lines = [
    '# Lint rules',
    '',
    'Every rule of every block of `lint/`, generated from the sources: its setting, the reason written above it',
    '(`Custom:` a project choice, `Off:` disabled on purpose, `Deprecated:` replaced) and a link to its',
    'documentation. A rule without reason (—) keeps the default setting of its plugin. Search a rule name with',
    '<kbd>Ctrl</kbd> <kbd>K</kbd>.',
    '',
  ];
  for (const tool of ['eslint', 'stylelint']) {
    lines.push(
      `## ${tool === 'eslint' ? 'ESLint' : 'Stylelint'}`,
      '',
      '| Block | Rules | What it covers |',
      '| --- | --- | --- |',
    );
    const toolBlocks = blocks[tool];
    for (const block of toolBlocks) {
      const page = blockPagePath(tool, block.file);
      lines.push(`| [${page}](./${page}.md) | ${block.rules.length} | ${escapeCell(block.description)} |`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

/**
 * Builds the sidebar of the rule reference, grouped by tool and folder.
 *
 * @param blocks - The ESLint and Stylelint blocks.
 * @returns The sidebar items.
 */
export function createLintSidebar(blocks) {
  const groups = new Map();
  for (const tool of ['eslint', 'stylelint']) {
    const toolBlocks = blocks[tool];
    for (const block of toolBlocks) {
      const page = blockPagePath(tool, block.file);
      const group = page.split('/').slice(0, -1).join('/');
      const items = groups.get(group) ?? [];
      items.push({ text: page.split('/').at(-1), link: `/lint-rules/${page}` });
      groups.set(group, items);
    }
  }
  return [
    { text: 'Overview', link: '/lint-rules/' },
    ...[...groups].map(([group, items]) => ({ text: group, collapsed: true, items })),
  ];
}
