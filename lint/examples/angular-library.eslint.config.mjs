// Example: the eslint.config.mjs of an Angular library (a product: design system, features, stores, back-end
// access) with Storybook, in projects/design-system/. It imports the root config and adds the Angular library
// preset. In the project, import '../../eslint.config.mjs' and '../../lint/index.mjs' instead of the paths
// below.

import { defineConfig } from 'eslint/config';
import { angularLibraryPreset } from '../index.mjs';
import rootConfig from './workspace-root.eslint.config.mjs';

export default defineConfig(
  angularLibraryPreset({
    rootConfig,
    sourceFiles: ['src/**/*.ts'],
    developmentDependencyFiles: ['**/*.spec.ts', '**/*.stories.ts', '**/.storybook/*.ts'],
    prefix: 'ds',
    // The package.json that lists the Storybook addons; `undefined` without Storybook.
    storybookPackageDirectory: import.meta.dirname,
    overrides: [],
  }),
);
