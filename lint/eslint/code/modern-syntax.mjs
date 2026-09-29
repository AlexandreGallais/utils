// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Modern syntax: Modern JavaScript: spread, at(), operator assignment, standard built-ins.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Modern syntax rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function modernSyntaxBlock() {
  return [
    {
      name: 'code/modern-syntax',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
      },
      rules: {
        // ---- ESLint ----
        'no-restricted-syntax': ['off'],
        'no-sequences': ['error'],
        'operator-assignment': ['error'],
        'prefer-spread': ['error'],
        'symbol-description': ['error'],
        // ---- SonarJS ----
        'sonarjs/no-forced-browser-interaction': ['error'],
        'sonarjs/prefer-default-last': ['error'],
        // ---- Unicorn ----
        'unicorn/consistent-existence-index-check': ['error'],
        'unicorn/no-declarations-before-early-exit': ['error'],
        'unicorn/no-nonstandard-builtin-properties': ['error'],
        // Custom.
        'unicorn/no-unreadable-new-expression': ['error'],
        // Off: duplicate of the core operator-assignment.
        'unicorn/operator-assignment': ['off'],
        'unicorn/prefer-at': ['error'],
        'unicorn/prefer-spread': ['error'],
        'unicorn/prefer-temporal': ['off'],
        'unicorn/prefer-toggle-attribute': ['error'],
      },
    },
    {
      name: 'code/modern-syntax/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        '@typescript-eslint/no-misused-new': ['error'],
        '@typescript-eslint/no-misused-spread': ['error'],
      },
    },
  ];
}
