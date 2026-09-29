// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Arrays: Array methods, array creation, sorting and searching.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
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
      name: 'code/arrays',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
      },
      rules: {
        // ---- ESLint ----
        // Custom: a bare `return;` is allowed; `forEach` callbacks must not return a value.
        'array-callback-return': ['error', { allowImplicit: true, checkForEach: true }],
        'no-sparse-arrays': ['error'],
        'id-length': ['off'],
        'no-array-constructor': ['error'],
        'no-useless-concat': ['error'],
        'sort-keys': ['off'],
        'sort-vars': ['off'],
        // ---- SonarJS ----
        'sonarjs/no-incorrect-string-concat': ['error'],
        // Off: duplicate of array-callback-return.
        'sonarjs/array-callback-without-return': ['off'],
        // Off: duplicate of @typescript-eslint/require-array-sort-compare.
        'sonarjs/no-alphabetical-sort': ['off'],
        // Off: duplicate of @typescript-eslint/no-array-delete.
        'sonarjs/no-array-delete': ['off'],
        'sonarjs/array-constructor': ['off'],
        'sonarjs/no-associative-arrays': ['error'],
        'sonarjs/no-element-overwrite': ['error'],
        'sonarjs/no-in-misuse': ['error'],
        'sonarjs/no-misleading-array-reverse': ['error'],
        'sonarjs/reduce-initial-value': ['error'],
        // ---- Unicorn ----
        'unicorn/consistent-empty-array-spread': ['error'],
        'unicorn/explicit-length-check': ['error'],
        'unicorn/no-array-fill-with-reference-type': ['error'],
        'unicorn/no-array-from-fill': ['error'],
        // Custom: `unshift` / `shift` are O(n).
        'unicorn/no-array-front-mutation': ['error'],
        'unicorn/no-array-method-this-argument': ['error'],
        // Deprecated: replaced by unicorn/prefer-single-call.
        'unicorn/no-array-push-push': ['off'],
        'unicorn/no-array-reduce': ['error'],
        'unicorn/no-array-reverse': ['error'],
        'unicorn/no-array-sort': ['error'],
        'unicorn/no-array-splice': ['error'],
        'unicorn/no-confusing-array-splice': ['error'],
        'unicorn/no-confusing-array-with': ['error'],
        // Deprecated: replaced by unicorn/no-instanceof-builtins.
        'unicorn/no-instanceof-array': ['off'],
        // Deprecated: replaced by unicorn/no-unnecessary-slice-end.
        'unicorn/no-length-as-slice-end': ['off'],
        'unicorn/no-magic-array-flat-depth': ['error'],
        'unicorn/no-new-array': ['error'],
        'unicorn/no-return-array-push': ['error'],
        'unicorn/no-unnecessary-array-flat-depth': ['error'],
        'unicorn/no-unnecessary-array-flat-map': ['error'],
        'unicorn/no-unnecessary-array-splice-count': ['error'],
        'unicorn/no-unnecessary-polyfills': ['error'],
        'unicorn/no-unnecessary-slice-end': ['error'],
        'unicorn/no-unnecessary-splice': ['error'],
        'unicorn/no-unreadable-array-destructuring': ['error'],
        // Deprecated: replaced by unicorn/no-unused-builtin-method-return.
        'unicorn/no-unused-array-method-return': ['off'],
        // Off: duplicate of the core no-useless-concat.
        'unicorn/no-useless-concat': ['off'],
        'unicorn/no-useless-length-check': ['error'],
        'unicorn/prefer-array-find': ['error'],
        'unicorn/prefer-array-flat': ['error'],
        'unicorn/prefer-array-flat-map': ['error'],
        'unicorn/prefer-array-from-map': ['error'],
        'unicorn/prefer-array-from-range': ['error'],
        'unicorn/prefer-array-index-of': ['error'],
        'unicorn/prefer-array-iterable-methods': ['error'],
        'unicorn/prefer-array-last-methods': ['error'],
        'unicorn/prefer-array-slice': ['error'],
        'unicorn/prefer-array-some': ['error'],
        'unicorn/prefer-flat-math-min-max': ['error'],
        // Off: duplicate of @typescript-eslint/prefer-includes (type-aware).
        'unicorn/prefer-includes': ['off'],
        'unicorn/prefer-simple-sort-comparator': ['error'],
        'unicorn/prefer-single-array-predicate': ['error'],
        'unicorn/prefer-string-slice': ['error'],
        'unicorn/prefer-uint8array-base64': ['off'],
        'unicorn/prefer-uint8array-hex': ['off'],
        'unicorn/require-array-join-separator': ['error'],
        // Off: duplicate of @typescript-eslint/require-array-sort-compare (type-aware).
        'unicorn/require-array-sort-compare': ['off'],
      },
    },
    {
      name: 'code/arrays/typescript',
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
        '@typescript-eslint/prefer-find': ['error'],
        '@typescript-eslint/prefer-includes': ['error'],
        '@typescript-eslint/prefer-reduce-type-parameter': ['error'],
        '@typescript-eslint/require-array-sort-compare': ['error'],
        // Deprecated: replaced by eslint-plugin-perfectionist.
        '@typescript-eslint/sort-type-constituents': ['off'],
      },
    },
  ];
}
