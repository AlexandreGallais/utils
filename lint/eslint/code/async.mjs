// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Async code: Promises, async / await, timers and generators: nothing floating, nothing forgotten.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Async code rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function asyncBlock() {
  return [
    {
      name: 'code/async',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
      },
      rules: {
        // ---- ESLint ----
        'no-async-promise-executor': ['error'],
        'no-await-in-loop': ['error'],
        'no-promise-executor-return': ['error'],
        // Off: false positives with async/await (removed from eslint:recommended).
        'require-atomic-updates': ['off'],
        'prefer-promise-reject-errors': ['error'],
        'require-await': ['error'],
        'require-yield': ['error'],
        // ---- SonarJS ----
        // Off: duplicate of require-yield.
        'sonarjs/generator-without-yield': ['off'],
        'sonarjs/disabled-timeout': ['error'],
        'sonarjs/no-async-constructor': ['error'],
        'sonarjs/no-floating-point-equality': ['error'],
        'sonarjs/no-try-promise': ['error'],
        'sonarjs/prefer-promise-shorthand': ['error'],
        // ---- Unicorn ----
        'unicorn/explicit-timer-delay': ['error'],
        'unicorn/no-async-iterator-callback': ['error'],
        'unicorn/no-async-promise-finally': ['error'],
        'unicorn/no-await-expression-member': ['error'],
        'unicorn/no-await-in-promise-methods': ['error'],
        'unicorn/no-multiple-promise-resolver-calls': ['error'],
        'unicorn/no-single-promise-in-promise-methods': ['error'],
        'unicorn/no-thenable': ['error'],
        // Off: duplicate of @typescript-eslint/await-thenable.
        'unicorn/no-unnecessary-await': ['off'],
        'unicorn/no-unsafe-promise-all-settled-values': ['error'],
        'unicorn/no-useless-promise-resolve-reject': ['error'],
        'unicorn/prefer-abort-signal-timeout': ['error'],
        // Off: ES2025+ API, the library targets ES2024.
        'unicorn/prefer-array-from-async': ['off'],
        'unicorn/prefer-await': ['error'],
        'unicorn/prefer-dispose': ['off'],
        // Off: ES2025+ API, the library targets ES2024.
        'unicorn/prefer-promise-try': ['off'],
        'unicorn/prefer-promise-with-resolvers': ['error'],
        'unicorn/prefer-queue-microtask': ['error'],
        'unicorn/prefer-then-catch': ['error'],
        'unicorn/prefer-top-level-await': ['error'],
      },
    },
    {
      name: 'code/async/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        '@typescript-eslint/await-thenable': ['error'],
        '@typescript-eslint/no-floating-promises': ['error'],
        '@typescript-eslint/no-misused-promises': ['error'],
        // Replaced by the TS version.
        'prefer-promise-reject-errors': ['off'],
        '@typescript-eslint/prefer-promise-reject-errors': ['error'],
        '@typescript-eslint/promise-function-async': ['error'],
        // Replaced by the TS version.
        'require-await': ['off'],
        '@typescript-eslint/require-await': ['error'],
        '@typescript-eslint/return-await': ['error'],
      },
    },
  ];
}
