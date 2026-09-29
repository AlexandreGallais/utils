// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Loops: for, while, iteration and labels: the right loop for the job, no mutation of what is iterated.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Loops rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function loopsBlock() {
  return [
    {
      name: 'code/loops',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
      },
      rules: {
        // ---- ESLint ----
        'for-direction': ['error'],
        'no-unreachable-loop': ['error'],
        'guard-for-in': ['error'],
        'no-continue': ['error'],
        // Off: labels are forbidden by no-labels.
        'no-extra-label': ['off'],
        'no-iterator': ['error'],
        // Off: labels are forbidden by no-labels.
        'no-label-var': ['off'],
        'no-labels': ['error'],
        'no-loop-func': ['error'],
        'no-unused-labels': ['error'],
        // ---- SonarJS ----
        'sonarjs/too-many-break-or-continue-in-loop': ['error'],
        // Off: duplicate of no-new.
        'sonarjs/constructor-for-side-effects': ['off'],
        // Off: duplicate of no-loop-func.
        'sonarjs/function-inside-loop': ['off'],
        // Off: duplicate of no-labels.
        'sonarjs/label-position': ['off'],
        // Off: duplicate of no-labels.
        'sonarjs/no-labels': ['off'],
        'sonarjs/for-in': ['off'],
        'sonarjs/for-loop-increment-sign': ['error'],
        'sonarjs/misplaced-loop-counter': ['error'],
        'sonarjs/no-for-in-iterable': ['off'],
        'sonarjs/prefer-while': ['error'],
        'sonarjs/updated-loop-counter': ['error'],
        // ---- Unicorn ----
        'unicorn/consistent-tuple-labels': ['error'],
        // Custom.
        'unicorn/iteration-fallback-style': ['error'],
        'unicorn/new-for-builtins': ['error'],
        'unicorn/no-array-concat-in-loop': ['error'],
        'unicorn/no-array-sort-for-min-max': ['error'],
        'unicorn/no-break-in-nested-loop': ['error'],
        'unicorn/no-duplicate-loops': ['error'],
        'unicorn/no-for-each': ['error'],
        'unicorn/no-for-loop': ['error'],
        'unicorn/no-loop-iterable-mutation': ['error'],
        'unicorn/no-unreadable-for-of-expression': ['error'],
        'unicorn/no-unused-iterator-helper': ['error'],
        'unicorn/no-useless-continue': ['error'],
        'unicorn/no-useless-iterator-to-array': ['error'],
        // Off: conflicts with the core no-continue (early `continue` is forbidden).
        'unicorn/prefer-continue': ['off'],
        'unicorn/prefer-direct-iteration': ['error'],
        'unicorn/prefer-iterator-concat': ['off'],
        // Off: ES2025+ API, the library targets ES2024.
        'unicorn/prefer-iterator-helpers': ['off'],
        // Off: ES2025+ API, the library targets ES2024.
        'unicorn/prefer-iterator-to-array': ['off'],
        // Off: ES2025+ API, the library targets ES2024.
        'unicorn/prefer-iterator-to-array-at-end': ['off'],
        // Off: ES2025+ API, the library targets ES2024.
        'unicorn/prefer-iterator-zip': ['off'],
      },
    },
    {
      name: 'code/loops/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        '@typescript-eslint/no-for-in-array': ['error'],
        // Deprecated: the core rule supports TypeScript.
        '@typescript-eslint/no-loop-func': ['off'],
        '@typescript-eslint/prefer-for-of': ['error'],
      },
    },
  ];
}
