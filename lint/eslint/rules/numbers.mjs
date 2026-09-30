// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Numbers and dates: Arithmetic, precision, magic numbers, bitwise operators and dates.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Numbers and dates rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function numbersBlock() {
  return [
    {
      name: 'rules/numbers',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        'no-loss-of-precision': ['error'],
        'use-isnan': ['error'],
        // Off: colour parsing and formatting need bitwise math.
        'no-bitwise': ['off'],
        // Replaced by the TS version.
        'no-magic-numbers': ['off'],
        'no-octal': ['error'],
        // `i++` only in `for` loops, `+= 1` elsewhere.
        'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],
        'prefer-exponentiation-operator': ['error'],
        'prefer-numeric-literals': ['error'],
        radix: ['info'],
        // ---- SonarJS ----
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-nested-incdec': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/non-number-in-arithmetic-expression': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/operation-returning-nan': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/values-not-convertible-to-numbers': ['off'],
        // Off: duplicate of no-const-assign.
        'sonarjs/updated-const-var': ['off'],
        'sonarjs/bitwise-operators': ['error'],
        'sonarjs/no-useless-increment': ['error'],
        'sonarjs/non-existent-operator': ['error'],
      },
    },
    {
      name: 'rules/numbers/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        'no-octal': ['off'],
        // Deprecated: the core rule supports TypeScript.
        '@typescript-eslint/no-loss-of-precision': ['off'],
        // Custom: named constants for every number but the obvious ones (specs and benchmarks excepted, see below).
        // Warn: a documented literal can read better than a constant.
        '@typescript-eslint/no-magic-numbers': [
          'warn',
          {
            ignore: [-1, 0, 1, 2],
            ignoreDefaultValues: true,
            ignoreEnums: true,
            ignoreNumericLiteralTypes: true,
            ignoreReadonlyClassProperties: true,
            ignoreTypeIndexes: true,
          },
        ],
        '@typescript-eslint/no-unsafe-unary-minus': ['error'],
        '@typescript-eslint/restrict-plus-operands': ['error'],
      },
    },
  ];
}
