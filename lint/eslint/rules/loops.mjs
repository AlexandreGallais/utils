// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Loops: for, while, iteration and labels: the right loop for the job, no mutation of what is iterated.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
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
      name: 'rules/loops',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        'for-direction': ['error'],
        'no-unreachable-loop': ['error'],
        'guard-for-in': ['warn'],
        'no-continue': ['info'],
        // Off: labels are forbidden by no-labels.
        'no-extra-label': ['off'],
        'no-iterator': ['error'],
        // Off: labels are forbidden by no-labels.
        'no-label-var': ['off'],
        'no-labels': ['warn'],
        'no-loop-func': ['warn'],
        'no-unused-labels': ['error'],
        // ---- SonarJS ----
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/too-many-break-or-continue-in-loop': ['off'],
        // Off: duplicate of no-new.
        'sonarjs/constructor-for-side-effects': ['off'],
        // Off: duplicate of no-loop-func.
        'sonarjs/function-inside-loop': ['off'],
        // Off: duplicate of no-labels.
        'sonarjs/label-position': ['off'],
        // Off: duplicate of no-labels.
        'sonarjs/no-labels': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/for-in': ['off'],
        'sonarjs/for-loop-increment-sign': ['error'],
        'sonarjs/misplaced-loop-counter': ['warn'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-for-in-iterable': ['off'],
        'sonarjs/prefer-while': ['error'],
        'sonarjs/updated-loop-counter': ['warn'],
      },
    },
    {
      name: 'rules/loops/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        '@typescript-eslint/no-for-in-array': ['error'],
        // Deprecated: the core rule supports TypeScript.
        '@typescript-eslint/no-loop-func': ['off'],
        '@typescript-eslint/prefer-for-of': ['info'],
      },
    },
  ];
}
