// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Modules: import, export, require and module boundaries (the import-x plugin has its own block).
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Modules rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function modulesBlock() {
  return [
    {
      name: 'rules/modules',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        // Off: `import type` lines are kept separate (consistent-type-imports).
        'no-duplicate-imports': ['off'],
        'no-import-assign': ['error'],
        'no-restricted-exports': ['off'],
        // Custom: a theme's internal/ folder is private to it (src/internal/ is shared by every theme).
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                regex: String.raw`^\.\./[^./]+/internal(?:/|$)`,
                message: "Another theme's internal/ helpers are private to it: move the helper to src/internal/.",
              },
            ],
          },
        ],
        'sort-imports': ['off'],
        strict: ['error'],
        // ---- SonarJS ----
        // Off: duplicate of @typescript-eslint/no-unused-vars.
        'sonarjs/unused-import': ['off'],
        'sonarjs/no-default-utility-imports': ['warn'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-implicit-dependencies': ['off'],
        'sonarjs/no-internal-api-use': ['warn'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-require-or-define': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-wildcard-import': ['off'],
      },
    },
    {
      name: 'rules/modules/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        'no-import-assign': ['off'],
        '@typescript-eslint/no-namespace': ['warn'],
        '@typescript-eslint/no-require-imports': ['error'],
        // Deprecated: use the core no-restricted-imports if needed.
        '@typescript-eslint/no-restricted-imports': ['off'],
        '@typescript-eslint/no-useless-empty-export': ['error'],
        // Deprecated: replaced by no-require-imports.
        '@typescript-eslint/no-var-requires': ['off'],
        '@typescript-eslint/prefer-namespace-keyword': ['error'],
        '@typescript-eslint/triple-slash-reference': ['warn'],
      },
    },
  ];
}
