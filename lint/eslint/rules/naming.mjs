// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Naming: Names of identifiers, the naming convention of TypeScript and forbidden abbreviations.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
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
  // Custom: a function may be PascalCase when it builds the type of the same name (`TotoId(value)` returns a
  // branded `TotoId`).
  { selector: 'function', format: ['camelCase', 'PascalCase'] },
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
      name: 'rules/naming',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        'func-name-matching': ['info'],
        // Off: callbacks are arrow functions by convention.
        'func-names': ['off'],
        'id-denylist': ['off'],
        'id-match': ['off'],
        'new-cap': ['warn'],
        'no-shadow-restricted-names': ['error'],
        // Off: `_` prefix is allowed (private members, unused params).
        'no-underscore-dangle': ['off'],
        // ---- SonarJS ----
        // Off: duplicate of @typescript-eslint/naming-convention.
        'sonarjs/class-name': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/file-name-differ-from-class': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/function-name': ['off'],
        'sonarjs/future-reserved-words': ['warn'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/variable-name': ['off'],
      },
    },
    {
      name: 'rules/naming/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        // Custom: the most specific selector wins (see namingConventionSelectors).
        // Warn: external names (JSON keys, HTTP headers) keep their spelling.
        '@typescript-eslint/naming-convention': ['warn', ...namingConventionSelectors],
      },
    },
  ];
}
