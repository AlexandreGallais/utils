// VitePress configuration of the wiki: `pnpm wiki:dev` to write, `pnpm wiki:build` to publish.
// Learn more at https://vitepress.dev/reference/site-config

import fs from 'node:fs';
import type { DefaultTheme } from 'vitepress';
import { defineConfig } from 'vitepress';

/** Sidebar of the API pages, written by `scripts/generate-wiki.mjs`. */
const SIDEBAR_FILE = new URL('generated/sidebar.json', import.meta.url);
const REPOSITORY_URL = 'https://github.com/AlexandreGallais/utils';
/** Deepest heading level listed in the "On this page" outline (`###`, the subsections). */
const OUTLINE_DEPTH = 3;

/** The hand-written guide, in reading order: the guide, the linting, the CSS. */
const GUIDE_SIDEBAR: DefaultTheme.SidebarItem[] = [
  {
    text: 'Guide',
    items: [
      { text: 'Getting started', link: '/guide/getting-started' },
      { text: 'SVG on screen', link: '/guide/svg-on-screen' },
      { text: 'Performance', link: '/guide/performance' },
      { text: 'Tests and coverage', link: '/guide/tests' },
      { text: 'Transfer folders', link: '/guide/transfer' },
    ],
  },
  {
    text: 'Linting',
    items: [
      { text: 'Overview', link: '/guide/linting/' },
      { text: 'Write the config', link: '/guide/linting/write-config' },
      { text: 'Blocks and rules', link: '/guide/linting/eslint-blocks' },
      { text: 'Stylelint', link: '/guide/linting/stylelint' },
      { text: 'Old projects (ESLint 8)', link: '/guide/linting/legacy' },
      { text: 'CI: warnings on main', link: '/guide/linting/ci' },
      { text: 'Standards and SonarQube', link: '/guide/linting/standards' },
      { text: 'Copyright headers', link: '/guide/linting/copyright' },
      { text: 'Performance', link: '/guide/linting/performance' },
    ],
  },
  {
    text: 'CSS & design system',
    items: [
      { text: 'Design tokens', link: '/guide/css/design-tokens' },
      { text: 'Atomic design', link: '/guide/css/atomic-design' },
      { text: 'Cascade layers', link: '/guide/css/cascade-layers' },
      { text: 'Best practices', link: '/guide/css/best-practices' },
    ],
  },
];

/**
 * Reads the sidebars written by `scripts/generate-wiki.mjs`.
 *
 * @returns One sidebar per generated path (`/api/`, `/api/format/`, `/lint-rules/`…), or none before
 *   `pnpm wiki:generate`.
 */
function readGeneratedSidebars(): Record<string, DefaultTheme.SidebarItem[]> {
  if (!fs.existsSync(SIDEBAR_FILE)) {
    return {};
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- written by scripts/generate-wiki.mjs in this shape.
  return JSON.parse(fs.readFileSync(SIDEBAR_FILE, 'utf8')) as Record<string, DefaultTheme.SidebarItem[]>;
}

/**
 * Builds the one sidebar of every page: the guide, then the API and the lint rules, so that the whole wiki
 * stays reachable from any page.
 *
 * @returns The sidebar.
 */
function createSidebar(): DefaultTheme.SidebarItem[] {
  const generated = readGeneratedSidebars();
  const categories = generated['/api/']?.find((item) => item.text === 'Categories')?.items ?? [];
  const apiItems = categories.map((category) => ({
    text: category.text ?? '',
    link: category.link ?? '',
    collapsed: true,
    items: generated[category.link ?? '']?.find((item) => item.link === category.link)?.items ?? [],
  }));
  const lintRuleItems = (generated['/lint-rules/'] ?? []).filter((item) => item.link !== '/lint-rules/');
  return [
    ...GUIDE_SIDEBAR,
    { text: 'API', link: '/api/', items: apiItems },
    { text: 'Lint rules', link: '/lint-rules/', collapsed: true, items: lintRuleItems },
  ];
}

export default defineConfig({
  title: 'utils',
  description: 'Strict, dependency-free TypeScript utilities for simulation UIs.',
  // GitHub Pages serves the site under the repository name: the workflow sets `WIKI_BASE=/utils/`.
  base: process.env['WIKI_BASE'] ?? '/',
  cleanUrls: true,
  // The map of the 500 pages goes in one shared script instead of being inlined in every page.
  metaChunk: true,
  // The lint blocks are `.mjs` files, included in the guides with `<<<`.
  markdown: { languageAlias: { mjs: 'js' } },
  lastUpdated: true,
  // The catalog is the same list as the API pages; the specification is for the repository, not the wiki.
  srcExclude: ['FUNCTIONS.md', 'SPEC.md'],
  // The coverage report is copied next to the site after the build.
  ignoreDeadLinks: [/^\/coverage\//v],
  themeConfig: {
    search: {
      provider: 'local',
      options: { detailedView: true },
    },
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Linting', link: '/guide/linting/' },
      { text: 'CSS', link: '/guide/css/design-tokens' },
      { text: 'API', link: '/api/' },
      { text: 'Lint rules', link: '/lint-rules/' },
      { text: 'Coverage', link: '/coverage/index.html', target: '_blank' },
    ],
    sidebar: createSidebar(),
    outline: { level: [2, OUTLINE_DEPTH] },
    socialLinks: [{ icon: 'github', link: REPOSITORY_URL }],
    editLink: { pattern: `${REPOSITORY_URL}/edit/main/docs/:path` },
    footer: { message: 'Generated from the JSDoc of the sources.' },
  },
});
