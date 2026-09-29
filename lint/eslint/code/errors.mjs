// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Errors: throw, try / catch and Error objects.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Errors rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function errorsBlock() {
  return [
    {
      name: 'code/errors',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
      },
      rules: {
        // ---- ESLint ----
        'no-ex-assign': ['error'],
        'no-unsafe-finally': ['error'],
        'no-throw-literal': ['error'],
        'no-useless-catch': ['error'],
        'preserve-caught-error': ['error'],
        // ---- SonarJS ----
        // Off: duplicate of no-new (which reports any `new` used for side effects).
        'sonarjs/no-unthrown-error': ['off'],
        // Off: duplicate of no-useless-catch.
        'sonarjs/no-useless-catch': ['off'],
        'sonarjs/in-operator-type-error': ['error'],
        'sonarjs/no-ignored-exceptions': ['error'],
        'sonarjs/no-reference-error': ['off'],
        // ---- Unicorn ----
        'unicorn/catch-error-name': ['error'],
        // Custom: error subclasses set their name and message.
        'unicorn/custom-error-definition': ['error'],
        'unicorn/error-message': ['error'],
        'unicorn/no-error-property-assignment': ['error'],
        'unicorn/prefer-aggregate-error': ['error'],
        'unicorn/prefer-error-is-error': ['off'],
        'unicorn/prefer-optional-catch-binding': ['error'],
        'unicorn/prefer-type-error': ['error'],
        'unicorn/throw-new-error': ['error'],
        // Custom.
        'unicorn/try-complexity': ['error'],
      },
    },
    {
      name: 'code/errors/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        // Replaced by the TS version.
        'no-throw-literal': ['off'],
        '@typescript-eslint/only-throw-error': ['error'],
        '@typescript-eslint/use-unknown-in-catch-callback-variable': ['error'],
      },
    },
  ];
}
