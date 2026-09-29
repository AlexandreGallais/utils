// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Storybook (any framework: Angular, HTML + Vite…): stories in the Component Story Format and the
// .storybook/ configuration. Spread it last: stories and Storybook configs need default exports.

import storybookPlugin from 'eslint-plugin-storybook';

// The plugin is typed with typescript-eslint types, which ESLint's own types reject; it works at runtime.
const storybook = /** @type {import('eslint').ESLint.Plugin} */ (/** @type {unknown} */ (storybookPlugin));

const STORIES = ['**/*.stories.ts'];
const STORYBOOK_FOLDER = ['**/.storybook/*.ts'];

/**
 * Storybook rules.
 *
 * @param {string} packageJsonDirectory - Folder of the package.json listing the Storybook addons.
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread last in `defineConfig([…])`.
 */
export default function storybookBlock(packageJsonDirectory) {
  return [
    {
      name: 'storybook/stories',
      files: STORIES,
      plugins: {
        storybook,
      },
      rules: {
        'storybook/await-interactions': ['error'],
        'storybook/context-in-play-function': ['error'],
        'storybook/csf-component': ['error'],
        'storybook/default-exports': ['error'],
        'storybook/hierarchy-separator': ['error'],
        // Custom: meta is a plain object, readable by the docs and the indexer.
        'storybook/meta-inline-properties': ['error'],
        // `const meta = { … } satisfies Meta<ButtonComponent>` keeps the args typed.
        'storybook/meta-satisfies-type': ['error'],
        'storybook/no-redundant-story-name': ['error'],
        // Import the framework (`@storybook/angular-vite`, `@storybook/html-vite`), not its renderer.
        'storybook/no-renderer-packages': ['error'],
        'storybook/no-stories-of': ['error'],
        // The sidebar title comes from the file path.
        'storybook/no-title-property-in-meta': ['error'],
        'storybook/prefer-pascal-case': ['error'],
        'storybook/story-exports': ['error'],
        'storybook/use-storybook-expect': ['error'],
        'storybook/use-storybook-testing-library': ['error'],
      },
    },
    {
      name: 'storybook/configuration',
      files: STORYBOOK_FOLDER,
      plugins: {
        storybook,
      },
      rules: {
        // Custom: addons are installed in the given package.json.
        'storybook/no-uninstalled-addons': ['error', { packageJsonLocation: `${packageJsonDirectory}/package.json` }],
      },
    },
    {
      name: 'storybook/exports',
      files: [...STORIES, ...STORYBOOK_FOLDER],
      rules: {
        // Storybook requires a default export (story meta, main.ts, preview.ts).
        'import-x/no-default-export': ['off'],
        'import-x/no-extraneous-dependencies': ['error', { devDependencies: true, packageDir: packageJsonDirectory }],
      },
    },
    {
      name: 'storybook/node',
      files: STORYBOOK_FOLDER,
      rules: {
        // main.ts runs in Node; the folder name is imposed by Storybook.
        'check-file/folder-naming-convention': ['off'],
        'import-x/no-nodejs-modules': ['off'],
      },
    },
  ];
}
