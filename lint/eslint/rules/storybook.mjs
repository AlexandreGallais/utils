// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Storybook (any framework: Angular, HTML + Vite…), kept light: the rules that catch a story that breaks or a
// test that lies, and the relaxations stories need (default export, PascalCase story names, devDependencies).
// The style rules of the plugin are off: stories are documentation, not a place to argue about form.

import storybookPlugin from 'eslint-plugin-storybook';
import { namingConventionSelectors } from './naming.mjs';

// The plugin is typed with typescript-eslint types, which ESLint's own types reject; it works at runtime.
const storybook = /** @type {import('eslint').ESLint.Plugin} */ (/** @type {unknown} */ (storybookPlugin));

const STORIES = ['**/*.stories.ts'];
const STORYBOOK_FOLDER = ['**/.storybook/*.ts'];

/**
 * Storybook rules and the relaxations stories need.
 *
 * @param {string} packageJsonDirectory - Folder of the package.json listing the Storybook addons.
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread last in `defineConfig([…])`.
 */
export default function storybookBlock(packageJsonDirectory) {
  return [
    {
      name: 'rules/storybook',
      files: STORIES,
      plugins: {
        storybook,
      },
      rules: {
        // An interaction (`userEvent`, `expect`) is awaited, or the test ends before it.
        'storybook/await-interactions': ['error'],
        // A play function passes its context to the play function it calls.
        'storybook/context-in-play-function': ['error'],
        // Off: a stories file may show several components, or none.
        'storybook/csf-component': ['off'],
        // Storybook needs the default export (the meta) to index the file.
        'storybook/default-exports': ['error'],
        // Deprecated title syntax (`|`), fixed automatically.
        'storybook/hierarchy-separator': ['error'],
        // Off: style of the meta object.
        'storybook/meta-inline-properties': ['off'],
        // Off: style of the meta object.
        'storybook/meta-satisfies-type': ['off'],
        // Off: a redundant name is harmless.
        'storybook/no-redundant-story-name': ['off'],
        // The framework package (`@storybook/angular`, `@storybook/html-vite`), not its renderer.
        'storybook/no-renderer-packages': ['error'],
        // `storiesOf` is removed from Storybook.
        'storybook/no-stories-of': ['error'],
        // Off: an explicit title is allowed.
        'storybook/no-title-property-in-meta': ['off'],
        // Off: story names follow rules/naming, which allows PascalCase here.
        'storybook/prefer-pascal-case': ['off'],
        // A stories file exports at least one story.
        'storybook/story-exports': ['error'],
        // `expect` from `storybook/test`, which the interaction panel records.
        'storybook/use-storybook-expect': ['error'],
        // `userEvent` and queries from `storybook/test`, which the interaction panel records.
        'storybook/use-storybook-testing-library': ['error'],
        // Custom: story exports are PascalCase (`export const Primary: Story`), as Storybook names them.
        '@typescript-eslint/naming-convention': [
          'warn',
          ...namingConventionSelectors,
          { selector: 'variable', modifiers: ['exported'], format: ['PascalCase'] },
        ],
        // Off: story args are literal values.
        '@typescript-eslint/no-magic-numbers': ['off'],
      },
    },
    {
      name: 'rules/storybook/configuration',
      files: STORYBOOK_FOLDER,
      plugins: {
        storybook,
      },
      rules: {
        // Custom: addons are installed in the given package.json.
        'storybook/no-uninstalled-addons': ['error', { packageJsonLocation: `${packageJsonDirectory}/package.json` }],
        // Off: main.ts runs in Node.
        'import-x/no-nodejs-modules': ['off'],
      },
    },
    {
      name: 'rules/storybook/exports',
      files: [...STORIES, ...STORYBOOK_FOLDER],
      rules: {
        // Off: Storybook reads a default export (story meta, main.ts, preview.ts).
        'import-x/no-default-export': ['off'],
        // Custom: stories and Storybook configs use devDependencies.
        'import-x/no-extraneous-dependencies': ['error', { devDependencies: true, packageDir: packageJsonDirectory }],
      },
    },
  ];
}
