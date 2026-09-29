// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// TypeScript utility library (one exported function per file). The rules come from the themed blocks of lint/
// (see the "Linting" guide of the wiki); this file only adds what is specific to this repository.

import { defineConfig, globalIgnores } from 'eslint/config';
import oneFunctionPerFileBlock from './lint/eslint/project/one-function-per-file.mjs';
import typescriptLibraryProfile from './lint/profiles/eslint-typescript-library.mjs';

export default defineConfig([
  // Build outputs, caches and dependencies (same folders as .gitignore).
  globalIgnores(['**/node_modules/', 'dist/', 'coverage/', 'docs/.vitepress/cache/', 'docs/.vitepress/dist/']),
  ...typescriptLibraryProfile({
    tsconfigRootDirectory: import.meta.dirname,
    developmentDependencyFiles: [
      '**/*.spec.ts',
      '**/testing/**',
      '**/*.bench.ts',
      '**/*.mjs',
      '**/*.mts',
      // `**` skips dot folders: the wiki config needs its own pattern.
      'docs/.vitepress/*.mts',
    ],
    apiFiles: ['src/**/*.ts'],
    ignoredApiFiles: ['src/**/*.spec.ts', 'src/**/testing/**'],
  }),
  // The wiki config lives in `docs/.vitepress/`, a folder name imposed by VitePress.
  {
    files: ['docs/.vitepress/*.mts'],
    rules: {
      // Off: VitePress requires the `.vitepress` folder name.
      'check-file/folder-naming-convention': ['off'],
    },
  },
  // Entry points: src/index.ts re-exports every folder, each folder's index.ts re-exports its public functions.
  {
    files: ['src/index.ts', 'src/*/index.ts'],
    rules: {
      'check-file/no-index': ['off'],
      'import-x/max-dependencies': ['off'],
    },
  },
  ...oneFunctionPerFileBlock(),
  // ESLint configs list every rule explicitly and repeat the same file globs.
  {
    files: ['eslint.config.mjs', 'lint/**/*.mjs'],
    rules: {
      'import-x/max-dependencies': ['off'],
      'sonarjs/max-lines': ['off'],
      'sonarjs/max-lines-per-function': ['off'],
      'sonarjs/no-duplicate-string': ['off'],
    },
  },
]);
