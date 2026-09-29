// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Numbers and dates: Arithmetic, precision, magic numbers, bitwise operators and dates.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
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
      name: 'code/numbers',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
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
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'prefer-exponentiation-operator': ['error'],
        'prefer-numeric-literals': ['error'],
        radix: ['error'],
        // ---- SonarJS ----
        'sonarjs/no-nested-incdec': ['error'],
        'sonarjs/non-number-in-arithmetic-expression': ['error'],
        'sonarjs/operation-returning-nan': ['error'],
        'sonarjs/values-not-convertible-to-numbers': ['error'],
        // Off: duplicate of no-const-assign.
        'sonarjs/updated-const-var': ['off'],
        'sonarjs/bitwise-operators': ['error'],
        'sonarjs/no-useless-increment': ['error'],
        'sonarjs/non-existent-operator': ['error'],
        // ---- Unicorn ----
        'unicorn/consistent-date-clone': ['error'],
        'unicorn/no-accidental-bitwise-operator': ['error'],
        'unicorn/no-constant-zero-expression': ['error'],
        'unicorn/no-xor-as-exponentiation': ['error'],
        'unicorn/no-zero-fractions': ['error'],
        // Off: formatting is Prettier's job.
        'unicorn/number-literal-case': ['off'],
        'unicorn/numeric-separators-style': ['error'],
        'unicorn/prefer-bigint-literals': ['error'],
        'unicorn/prefer-date-now': ['error'],
        'unicorn/prefer-global-number-constants': ['error'],
        'unicorn/prefer-math-abs': ['error'],
        'unicorn/prefer-math-constants': ['error'],
        'unicorn/prefer-math-min-max': ['error'],
        'unicorn/prefer-math-trunc': ['error'],
        'unicorn/prefer-modern-math-apis': ['error'],
        'unicorn/prefer-number-coercion': ['error'],
        'unicorn/prefer-number-is-safe-integer': ['error'],
        'unicorn/prefer-number-properties': ['error'],
        'unicorn/prefer-unary-minus': ['error'],
        'unicorn/require-number-to-fixed-digits-argument': ['error'],
      },
    },
    {
      name: 'code/numbers/typescript',
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
        '@typescript-eslint/no-magic-numbers': [
          'error',
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
