// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Objects and collections: Object literals, properties, Map and Set.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Objects and collections rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function objectsAndCollectionsBlock() {
  return [
    {
      name: 'code/objects-and-collections',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
      },
      rules: {
        // ---- ESLint ----
        'no-dupe-keys': ['error'],
        'dot-notation': ['error'],
        'no-proto': ['error'],
        'no-useless-computed-key': ['error'],
        'object-shorthand': ['error'],
        'prefer-object-has-own': ['error'],
        'prefer-object-spread': ['error'],
        // ---- SonarJS ----
        'sonarjs/prefer-object-literal': ['error'],
        'sonarjs/avoid-mutating-nested-properties-of-shallow-clones': ['error'],
        'sonarjs/memoize-cache-key': ['error'],
        'sonarjs/no-collection-size-mischeck': ['error'],
        'sonarjs/no-empty-collection': ['error'],
        'sonarjs/no-unused-collection': ['error'],
        // ---- Unicorn ----
        'unicorn/dom-node-dataset': ['error'],
        'unicorn/no-collection-bracket-access': ['error'],
        'unicorn/no-computed-property-existence-check': ['error'],
        'unicorn/no-duplicate-set-values': ['error'],
        'unicorn/no-global-object-property-assignment': ['error'],
        'unicorn/no-invalid-well-known-symbol-methods': ['error'],
        'unicorn/no-mismatched-map-key': ['error'],
        'unicorn/no-object-methods-with-collections': ['error'],
        'unicorn/no-unreadable-object-destructuring': ['error'],
        'unicorn/no-useless-collection-argument': ['error'],
        'unicorn/no-useless-set-construction': ['error'],
        // Deprecated: replaced by unicorn/dom-node-dataset.
        'unicorn/prefer-dom-node-dataset': ['off'],
        // Off: ES2025+ API, the library targets ES2024.
        'unicorn/prefer-get-or-insert-computed': ['off'],
        'unicorn/prefer-has-check': ['error'],
        'unicorn/prefer-iterable-in-constructor': ['error'],
        'unicorn/prefer-keyboard-event-key': ['error'],
        'unicorn/prefer-map-from-entries': ['error'],
        'unicorn/prefer-object-define-properties': ['error'],
        'unicorn/prefer-object-destructuring-defaults': ['error'],
        'unicorn/prefer-object-from-entries': ['error'],
        'unicorn/prefer-object-iterable-methods': ['error'],
        'unicorn/prefer-set-has': ['error'],
        // Off: ES2025+ API, the library targets ES2024.
        'unicorn/prefer-set-methods': ['off'],
        'unicorn/prefer-set-size': ['error'],
        'unicorn/prefer-single-object-destructuring': ['error'],
        'unicorn/prefer-structured-clone': ['error'],
        'unicorn/require-proxy-trap-boolean-return': ['error'],
      },
    },
    {
      name: 'code/objects-and-collections/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        'no-dupe-keys': ['off'],
        '@typescript-eslint/consistent-indexed-object-style': ['error'],
        // Replaced by the TS version.
        'dot-notation': ['off'],
        '@typescript-eslint/dot-notation': ['error'],
      },
    },
  ];
}
