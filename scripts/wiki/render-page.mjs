// Renders the wiki page of one export, section by section.

import path from 'node:path';
import { escapeCell, escapeText, summaryOf } from './markdown.mjs';
import { toKebabCase } from './read-sources.mjs';
import { dependenciesOf } from './resolve-imports.mjs';

const REPOSITORY_URL = 'https://github.com/AlexandreGallais/utils/blob/main/';
const THROWS_PATTERN = /^\{(?<type>[^\}]+)\} (?<condition>.*)$/v;

/**
 * Lists the tags of one name, in order.
 *
 * @param entry - The export.
 * @param name - The tag name, such as `param`.
 * @returns The texts of those tags.
 */
function textsOf(entry, name) {
  return entry.tags.filter(({ tag }) => tag === name).map(({ text }) => text);
}

/**
 * Renders the title, the badges, the description, the fixed choices, the import and the signature.
 *
 * @param entry - The export.
 * @returns The Markdown lines.
 */
function renderHeader(entry) {
  const badges = [`<Badge type="info" text="${entry.kind}" />`];
  if (entry.name.endsWith('Simple')) {
    badges.push('<Badge type="tip" text="simple" />');
  }
  if (entry.name.endsWith('Cached')) {
    badges.push('<Badge type="warning" text="cached" />');
  }
  const title = `# ${entry.name} ${badges.join(' ')}`;
  const lines = ['---', `title: ${entry.name}`, '---', '', title, '', escapeText(entry.description), ''];
  for (const text of textsOf(entry, 'simple')) {
    lines.push('::: tip Fixed choices', escapeText(text), ':::', '');
  }
  for (const text of textsOf(entry, 'cached')) {
    lines.push('::: warning Cache', escapeText(text), ':::', '');
  }
  const importLine = `import ${entry.kind === 'type' || entry.kind === 'interface' ? 'type ' : ''}{ ${entry.name} } from 'utils';`;
  lines.push('```ts', importLine, '```', '', '## Signature', '', '```ts', entry.declaration, '```', '');
  return lines;
}

/**
 * Renders the type parameters and the parameters as a table.
 *
 * @param entry - The export.
 * @returns The Markdown lines; none without parameter.
 */
function renderParameters(entry) {
  const parameters = [...textsOf(entry, 'template'), ...textsOf(entry, 'param')];
  if (parameters.length === 0) {
    return [];
  }
  const lines = ['## Parameters', '', '| Name | Description |', '| --- | --- |'];
  for (const text of parameters) {
    const [name = '', ...rest] = text.split(' - ');
    lines.push(`| \`${name.trim()}\` | ${escapeCell(rest.join(' - '))} |`);
  }
  lines.push('');
  return lines;
}

/**
 * Renders the result, the errors and the example.
 *
 * @param entry - The export.
 * @returns The Markdown lines.
 */
function renderBehavior(entry) {
  const lines = [];
  for (const text of textsOf(entry, 'returns')) {
    lines.push('## Returns', '', escapeText(text), '');
  }
  for (const text of textsOf(entry, 'yields')) {
    lines.push('## Yields', '', escapeText(text), '');
  }
  const errors = entry.tags.filter(({ tag }) => tag === 'throws' || tag === 'rejects');
  if (errors.length > 0) {
    lines.push('## Errors', '');
    for (const { tag, text } of errors) {
      const { type = 'Error', condition = text } = THROWS_PATTERN.exec(text)?.groups ?? {};
      lines.push(`- ${tag === 'rejects' ? 'Rejects' : 'Throws'} **${type}**: ${escapeText(condition)}`);
    }
    lines.push('');
  }
  for (const text of textsOf(entry, 'example')) {
    lines.push('## Example', '', '```ts', text, '```', '');
  }
  return lines;
}

/**
 * Renders the links to the other variants of the same function (plain, `…Simple`, `…Cached`).
 *
 * @param entry - The export.
 * @param byName - Every export by name.
 * @returns The Markdown lines; none without variant.
 */
function renderRelated(entry, byName) {
  const base = entry.name.replace(/(?:Cached|Simple)$/v, '');
  const related = [base, `${base}Simple`, `${base}Cached`]
    .filter((name) => name !== entry.name)
    .map((name) => byName.get(name))
    .filter((other) => other !== undefined);
  if (related.length === 0) {
    return [];
  }
  const lines = ['## Related', ''];
  for (const other of related) {
    const summary = escapeText(summaryOf(other.description));
    lines.push(`- [\`${other.name}\`](../${other.folder}/${other.slug}.md): ${summary}`);
  }
  lines.push('');
  return lines;
}

/**
 * Renders the coverage and the results of the tests of the export.
 *
 * @param entry - The export.
 * @param testResults - The test results by absolute spec path.
 * @param coverage - The line coverage by absolute source path.
 * @returns The Markdown lines; none without test data.
 */
function renderTests(entry, testResults, coverage) {
  const tests = testResults.get(path.resolve(entry.file.replace(/\.ts$/v, '.spec.ts'))) ?? [];
  const lineCoverage = coverage.get(path.resolve(entry.file));
  if (lineCoverage === undefined && tests.length === 0) {
    return [];
  }
  const lines = ['## Tests', ''];
  if (lineCoverage !== undefined) {
    lines.push(`Line coverage: **${lineCoverage} %**.`, '');
  }
  for (const { title, status } of tests) {
    lines.push(`- ${status === 'passed' ? '✅' : '❌'} ${escapeText(title)}`);
  }
  lines.push('');
  return lines;
}

/**
 * Renders links to exports, with their summary.
 *
 * @param title - The section title, such as `Uses`.
 * @param entries - The exports to list.
 * @param currentFolder - The folder of the page, for relative links.
 * @returns The Markdown lines; none without export.
 */
function renderLinks(title, entries, currentFolder) {
  if (entries.length === 0) {
    return [];
  }
  const lines = [`### ${title}`, ''];
  for (const other of entries) {
    const link = other.folder === currentFolder ? `./${other.slug}.md` : `../${other.folder}/${other.slug}.md`;
    lines.push(`- [\`${other.name}\`](${link}): ${escapeText(summaryOf(other.description))}`);
  }
  lines.push('');
  return lines;
}

/**
 * Renders the functions the export uses and is used by, the files to copy, and its source and spec,
 * included from the files at build time (nothing is copied into the page).
 *
 * @param entry - The export.
 * @param context - The direct dependencies and dependents of every export, by name.
 * @returns The Markdown lines.
 */
function renderSource(entry, context) {
  const needs = dependenciesOf(entry.file);
  const lines = [
    '## Source',
    '',
    `[\`${entry.file}\`](${REPOSITORY_URL}${entry.file}) (on GitHub)`,
    '',
    ...renderLinks('Uses', context.uses.get(entry.name) ?? [], entry.folder),
    ...renderLinks('Used by', context.usedBy.get(entry.name) ?? [], entry.folder),
  ];
  if (needs.length > 0) {
    lines.push('### Files it needs', '', `\`${entry.file}\` imports, directly or not:`, '');
    for (const dependency of needs) {
      lines.push(`- [\`${dependency}\`](${REPOSITORY_URL}${dependency})`);
    }
    lines.push('');
  }
  lines.push('::: details Source code', `<<< @/../${entry.file}`, ':::', '');
  const spec = entry.file.replace(/\.ts$/v, '.spec.ts');
  if (context.hasSpec(spec)) {
    lines.push('::: details Test file', `<<< @/../${spec}`, ':::', '');
  }
  return lines;
}

/**
 * Renders the search keywords: the words of the name, the category and the kind.
 *
 * @param entry - The export.
 * @param categoryTitle - The title of its category.
 * @returns The Markdown lines.
 */
function renderKeywords(entry, categoryTitle) {
  const words = toKebabCase(entry.name).split('-');
  const keywords = [...new Set([...words, categoryTitle.toLowerCase(), entry.kind])];
  return [`<small>Keywords: ${keywords.join(', ')}</small>`, ''];
}

/**
 * Renders the Markdown page of one export.
 *
 * @param entry - The export, with its parsed documentation.
 * @param context - Every export by name, their dependencies, the test results, the coverage and the titles.
 * @returns The page content.
 */
export function renderPage(entry, context) {
  return [
    ...renderHeader(entry),
    ...renderParameters(entry),
    ...renderBehavior(entry),
    ...renderRelated(entry, context.byName),
    ...renderTests(entry, context.testResults, context.coverage),
    ...renderSource(entry, context),
    ...renderKeywords(entry, context.categoryTitles.get(entry.folder) ?? entry.folder),
  ].join('\n');
}
