// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Modules: import, export, require and module boundaries (the import-x plugin has its own block).
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
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
      name: 'code/modules',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
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
                regex: String.raw`^\.\./[^./]+/internal/`,
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
        'sonarjs/no-default-utility-imports': ['error'],
        'sonarjs/no-implicit-dependencies': ['off'],
        'sonarjs/no-internal-api-use': ['error'],
        'sonarjs/no-require-or-define': ['off'],
        'sonarjs/no-wildcard-import': ['off'],
        // ---- Unicorn ----
        'unicorn/consistent-export-decorator-position': ['error'],
        'unicorn/default-export-style': ['error'],
        'unicorn/import-style': ['error'],
        // Off: duplicate of import-x/no-anonymous-default-export.
        'unicorn/no-anonymous-default-export': ['off'],
        'unicorn/no-barrel-files': ['off'],
        // Off: duplicate of import-x/no-named-default.
        'unicorn/no-named-default': ['off'],
        'unicorn/no-top-level-assignment-in-function': ['error'],
        'unicorn/no-top-level-side-effects': ['error'],
        'unicorn/no-useless-re-export': ['error'],
        'unicorn/prefer-export-from': ['error'],
        'unicorn/prefer-import-meta-properties': ['off'],
        'unicorn/prefer-json-import': ['off'],
        'unicorn/prefer-module': ['error'],
        'unicorn/prefer-node-protocol': ['error'],
        'unicorn/require-module-attributes': ['error'],
      },
    },
    {
      name: 'code/modules/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        'no-import-assign': ['off'],
        '@typescript-eslint/no-namespace': ['error'],
        '@typescript-eslint/no-require-imports': ['error'],
        // Deprecated: use the core no-restricted-imports if needed.
        '@typescript-eslint/no-restricted-imports': ['off'],
        '@typescript-eslint/no-useless-empty-export': ['error'],
        // Deprecated: replaced by no-require-imports.
        '@typescript-eslint/no-var-requires': ['off'],
        '@typescript-eslint/prefer-namespace-keyword': ['error'],
        '@typescript-eslint/triple-slash-reference': ['error'],
      },
    },
  ];
}
