// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Objects and collections: Object literals, properties, Map and Set.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
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
      name: 'rules/objects-and-collections',
      files: CODE_FILES,
      plugins: {
        sonarjs,
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
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/prefer-object-literal': ['off'],
        'sonarjs/avoid-mutating-nested-properties-of-shallow-clones': ['warn'],
        'sonarjs/memoize-cache-key': ['warn'],
        'sonarjs/no-collection-size-mischeck': ['error'],
        'sonarjs/no-empty-collection': ['error'],
        'sonarjs/no-unused-collection': ['error'],
      },
    },
    {
      name: 'rules/objects-and-collections/typescript',
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
