// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Naming: Names of identifiers, the naming convention of TypeScript and forbidden abbreviations.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

// @typescript-eslint/naming-convention selectors (also used by the Angular block).
export const namingConventionSelectors = [
  // camelCase; `_` prefix = intentionally unused.
  { selector: 'default', format: ['camelCase'], leadingUnderscore: 'allow' },
  { selector: 'import', format: ['camelCase', 'PascalCase'] },
  // UPPER_CASE: module-level constants.
  { selector: 'variable', format: ['camelCase', 'UPPER_CASE'], leadingUnderscore: 'allow' },
  // Names come from external APIs.
  { selector: 'variable', modifiers: ['destructured'], format: null },
  { selector: 'function', format: ['camelCase'] },
  { selector: 'typeLike', format: ['PascalCase'] },
  // No `I` prefix (TypeScript convention).
  { selector: 'interface', format: ['PascalCase'], custom: { regex: '^I[A-Z]', match: false } },
  { selector: 'enumMember', format: ['PascalCase'] },
  // Quoted keys: HTTP headers, external APIs.
  {
    selector: [
      'classProperty',
      'objectLiteralProperty',
      'typeProperty',
      'classMethod',
      'objectLiteralMethod',
      'typeMethod',
      'accessor',
      'enumMember',
    ],
    modifiers: ['requiresQuotes'],
    format: null,
  },
];

/**
 * Naming rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function namingBlock() {
  return [
    {
      name: 'code/naming',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
      },
      rules: {
        // ---- ESLint ----
        'func-name-matching': ['error'],
        // Off: callbacks are arrow functions by convention.
        'func-names': ['off'],
        'id-denylist': ['off'],
        'id-match': ['off'],
        'new-cap': ['error'],
        'no-shadow-restricted-names': ['error'],
        // Off: `_` prefix is allowed (private members, unused params).
        'no-underscore-dangle': ['off'],
        // ---- SonarJS ----
        // Off: duplicate of @typescript-eslint/naming-convention.
        'sonarjs/class-name': ['off'],
        'sonarjs/file-name-differ-from-class': ['off'],
        'sonarjs/function-name': ['off'],
        'sonarjs/future-reserved-words': ['error'],
        'sonarjs/variable-name': ['off'],
        // ---- Unicorn ----
        'unicorn/consistent-compound-words': ['error'],
        'unicorn/id-match': ['off'],
        'unicorn/no-keyword-prefix': ['off'],
        'unicorn/no-non-function-verb-prefix': ['error'],
        // Deprecated: replaced by unicorn/name-replacements.
        'unicorn/prevent-abbreviations': ['off'],
      },
    },
    {
      name: 'code/naming/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        // Custom: the most specific selector wins (see namingConventionSelectors).
        '@typescript-eslint/naming-convention': ['error', ...namingConventionSelectors],
      },
    },
  ];
}
