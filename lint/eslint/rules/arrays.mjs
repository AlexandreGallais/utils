// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Arrays: Array methods, array creation, sorting and searching.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Arrays rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function arraysBlock() {
  return [
    {
      name: 'rules/arrays',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        // Custom: a bare `return;` is allowed; `forEach` callbacks must not return a value.
        'array-callback-return': ['error', { allowImplicit: true, checkForEach: true }],
        'no-sparse-arrays': ['error'],
        'id-length': ['off'],
        'no-array-constructor': ['error'],
        'no-useless-concat': ['info'],
        'sort-keys': ['off'],
        'sort-vars': ['off'],
        // ---- SonarJS ----
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-incorrect-string-concat': ['off'],
        // Off: duplicate of array-callback-return.
        'sonarjs/array-callback-without-return': ['off'],
        // Off: duplicate of @typescript-eslint/require-array-sort-compare.
        'sonarjs/no-alphabetical-sort': ['off'],
        // Off: duplicate of @typescript-eslint/no-array-delete.
        'sonarjs/no-array-delete': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/array-constructor': ['off'],
        'sonarjs/no-associative-arrays': ['warn'],
        'sonarjs/no-element-overwrite': ['error'],
        'sonarjs/no-in-misuse': ['error'],
        'sonarjs/no-misleading-array-reverse': ['error'],
        'sonarjs/reduce-initial-value': ['error'],
      },
    },
    {
      name: 'rules/arrays/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        '@typescript-eslint/array-type': ['error'],
        // Replaced by the TS version.
        'no-array-constructor': ['off'],
        '@typescript-eslint/no-array-constructor': ['error'],
        '@typescript-eslint/no-array-delete': ['error'],
        '@typescript-eslint/prefer-find': ['info'],
        '@typescript-eslint/prefer-includes': ['error'],
        '@typescript-eslint/prefer-reduce-type-parameter': ['error'],
        '@typescript-eslint/require-array-sort-compare': ['error'],
        // Deprecated: replaced by eslint-plugin-perfectionist.
        '@typescript-eslint/sort-type-constituents': ['off'],
      },
    },
  ];
}
