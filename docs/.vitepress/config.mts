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

/**
 * Reads the generated API sidebars.
 *
 * @returns One sidebar per API path (`/api/`, `/api/format/`…), or none before `pnpm wiki:generate`.
 */
function readApiSidebars(): DefaultTheme.SidebarMulti {
  if (!fs.existsSync(SIDEBAR_FILE)) {
    return {};
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- written by scripts/generate-wiki.mjs in this shape.
  return JSON.parse(fs.readFileSync(SIDEBAR_FILE, 'utf8')) as DefaultTheme.SidebarMulti;
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
  // The catalog is the same list as the API pages.
  srcExclude: ['FUNCTIONS.md'],
  // The coverage report is copied next to the site after the build.
  ignoreDeadLinks: [/^\/coverage\//v],
  themeConfig: {
    search: {
      provider: 'local',
      options: { detailedView: true },
    },
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      { text: 'Linting', link: '/guide/linting/' },
      { text: 'Lint rules', link: '/lint-rules/' },
      { text: 'CSS', link: '/guide/css/design-tokens' },
      { text: 'Coverage', link: '/coverage/index.html', target: '_blank' },
      { text: 'Specification', link: '/SPEC' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting started', link: '/guide/getting-started' },
            { text: 'Simple variants', link: '/guide/simple-variants' },
            { text: 'SVG on screen', link: '/guide/svg-on-screen' },
            { text: 'Performance', link: '/guide/performance' },
            { text: 'Tests and coverage', link: '/guide/tests' },
          ],
        },
        {
          text: 'Linting',
          items: [
            { text: 'Overview', link: '/guide/linting/' },
            { text: 'ESLint blocks', link: '/guide/linting/eslint-blocks' },
            { text: 'Stylelint blocks', link: '/guide/linting/stylelint-blocks' },
            { text: 'Performance', link: '/guide/linting/performance' },
            { text: 'Rule reference', link: '/lint-rules/' },
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
      ],
      ...readApiSidebars(),
    },
    outline: { level: [2, OUTLINE_DEPTH] },
    socialLinks: [{ icon: 'github', link: REPOSITORY_URL }],
    editLink: { pattern: `${REPOSITORY_URL}/edit/main/docs/:path` },
    footer: { message: 'Generated from the JSDoc of the sources.' },
  },
});
