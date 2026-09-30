// Example: the eslint.config.mjs of a TypeScript library for the browser, without framework (an SVG library
// built by Vite), with Storybook, in projects/svg/. It imports the root config and adds the TypeScript browser
// preset. In the project, import '../../eslint.config.mjs' and '../../lint/index.mjs' instead of the paths
// below.

import { defineConfig } from 'eslint/config';
import { typescriptBrowserPreset } from '../index.mjs';
import rootConfig from './workspace-root.eslint.config.mjs';

export default defineConfig(
  typescriptBrowserPreset({
    rootConfig,
    sourceFiles: ['src/**/*.ts'],
    developmentDependencyFiles: ['**/*.spec.ts', '**/*.stories.ts', '**/.storybook/*.ts'],
    // A library: its generic API may write `any` and `void`.
    isLibrary: true,
    // The package.json that lists the Storybook addons; `undefined` without Storybook.
    storybookPackageDirectory: import.meta.dirname,
    overrides: [],
  }),
);
