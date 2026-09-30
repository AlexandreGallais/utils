// An Angular library of features, linted with the presets of lint/. A single package: the root config (Node mode,
// for the tool configs) and the library (src/, browser mode and Angular) share this file. In an Angular
// workspace, the root config is the workspace's eslint.config.mjs, imported by each project's own config.

import { defineConfig } from 'eslint/config';
import { angularLibraryPreset, typescriptNodePreset } from '../../lint/index.mjs';

const rootConfig = typescriptNodePreset({
  tsconfigRootDirectory: import.meta.dirname,
  overrides: [
    {
      name: 'example/configs',
      // The example imports the presets of this repository; a real project copies lint/ next to its config.
      files: ['*.config.mjs'],
      rules: {
        'import-x/no-relative-packages': ['off'],
      },
    },
  ],
});

export default defineConfig(
  angularLibraryPreset({
    rootConfig,
    sourceFiles: ['src/**/*.ts'],
    developmentDependencyFiles: ['**/*.spec.ts', '**/*.stories.ts'],
    prefix: 'ds',
    storybookPackageDirectory: undefined,
    overrides: [],
  }),
);
