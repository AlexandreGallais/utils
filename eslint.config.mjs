// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// TypeScript utility library, analysed by SonarQube where it is copied. The rules come from the typescript-node
// and typescript-browser presets of lint/ (see the "Linting" guide of the wiki).

import { defineConfig, globalIgnores } from 'eslint/config';
import { typescriptBrowserPreset, typescriptNodePreset } from './lint/index.mjs';

// A single package: the root (Node mode: scripts, benchmarks, tool configs) and the library (src/, browser mode)
// share this file. In a workspace, the root config is its own file, imported by each project's config.
const rootConfig = typescriptNodePreset({
  tsconfigRootDirectory: import.meta.dirname,
  overrides: [
    {
      name: 'utils/lint-configs',
      // ESLint configs list every rule explicitly and repeat the same file globs.
      files: ['eslint.config.mjs', 'lint/**/*.mjs'],
      rules: {
        'max-lines': ['off'],
        'max-lines-per-function': ['off'],
        'sonarjs/max-lines': ['off'],
        'sonarjs/max-lines-per-function': ['off'],
      },
    },
  ],
});

export default defineConfig([
  // Outputs, caches and dependencies (same folders as .gitignore).
  globalIgnores([
    '**/node_modules/',
    'dist/',
    'coverage/',
    'docs/.vitepress/cache/',
    'docs/.vitepress/dist/',
    'transfer/',
  ]),
  ...typescriptBrowserPreset({
    rootConfig,
    sourceFiles: ['src/**/*.ts'],
    developmentDependencyFiles: ['**/*.spec.ts', '**/testing/**'],
    isLibrary: true,
    storybookPackageDirectory: undefined,
    overrides: [],
  }),
]);
