// Renders the list pages of the wiki (all categories, one category) and the sidebars.

import { escapeCell, escapeText, summaryOf } from './markdown.mjs';

/**
 * Counts the exports of every folder.
 *
 * @param folders - Every folder, with its exports.
 * @returns The total number of exports.
 */
export function countExports(folders) {
  return folders.reduce((total, { exports }) => total + exports.length, 0);
}

/**
 * Renders the page listing every category.
 *
 * @param folders - Every folder, with its exports.
 * @returns The page content.
 */
export function renderApiIndex(folders) {
  const lines = [
    '# API',
    '',
    `${countExports(folders)} exports, one file each. Press <kbd>Ctrl</kbd> <kbd>K</kbd> to search by name or by need.`,
    '',
    '| Category | Exports | Content |',
    '| --- | --- | --- |',
  ];
  for (const folder of folders) {
    const description = escapeCell(folder.description);
    lines.push(`| [${folder.title}](./${folder.folder}/) | ${folder.exports.length} | ${description} |`);
  }
  return `${lines.join('\n')}\n`;
}

/**
 * Renders the page listing the exports of one folder.
 *
 * @param folder - The folder, with its exports.
 * @returns The page content.
 */
export function renderCategory(folder) {
  const lines = [
    `# ${folder.title}`,
    '',
    escapeText(folder.description),
    '',
    '| Export | What it does |',
    '| --- | --- |',
  ];
  for (const entry of folder.exports) {
    lines.push(`| [\`${entry.name}\`](./${entry.slug}.md) | ${escapeCell(summaryOf(entry.description))} |`);
  }
  return `${lines.join('\n')}\n`;
}

/**
 * Builds one sidebar per category (its exports, then the other categories): a single sidebar with every
 * export would be rendered into each of the 500 pages.
 *
 * @param folders - Every folder, with its exports.
 * @returns The sidebars by path, in the VitePress `SidebarMulti` shape.
 */
export function createSidebars(folders) {
  const overview = { text: 'Overview', link: '/api/' };
  const categories = folders.map((folder) => ({
    text: `${folder.title} (${folder.exports.length})`,
    link: `/api/${folder.folder}/`,
  }));
  return Object.fromEntries([
    ['/api/', [overview, { text: 'Categories', items: categories }]],
    ...folders.map((folder) => [
      `/api/${folder.folder}/`,
      [
        overview,
        {
          text: folder.title,
          link: `/api/${folder.folder}/`,
          items: folder.exports.map((entry) => ({ text: entry.name, link: `/api/${folder.folder}/${entry.slug}` })),
        },
        { text: 'Other categories', collapsed: true, items: categories },
      ],
    ]),
  ]);
}
