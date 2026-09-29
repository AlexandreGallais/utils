// An Angular library of features, linted with the profile of lint/profiles/: this is all a project writes.

import { defineConfig } from 'eslint/config';
import { angularLibraryProfile } from '../../lint/profiles/eslint-angular.mjs';

export default defineConfig([
  ...angularLibraryProfile({
    tsconfigRootDirectory: import.meta.dirname,
    developmentDependencyFiles: ['**/*.spec.ts', '**/*.stories.ts', '**/*.mjs'],
    prefix: 'ds',
    isAccessible: true,
    isTranslated: false,
    usesRxjs: true,
    storybookPackageDirectory: undefined,
  }),
  // The examples import the presets of this repository; a real project imports them from a package.
  {
    files: ['*.config.mjs'],
    rules: {
      'import-x/no-relative-packages': ['off'],
    },
  },
]);
