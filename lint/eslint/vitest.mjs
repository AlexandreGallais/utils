// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Vitest: specs (`*.spec.ts`) and benchmarks (`*.bench.ts`), every rule of @vitest/eslint-plugin listed, and
// the relaxations test code needs (literal tables, mutable fixtures).

import vitest from '@vitest/eslint-plugin';
import globals from 'globals';
import { TEST_CODE_FILES, TEST_FILES } from './files.mjs';

/**
 * Vitest rules for specs and benchmarks.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function vitestBlock() {
  return [
    {
      name: 'vitest',
      files: TEST_FILES,
      languageOptions: {
        globals: {
          ...globals.vitest,
        },
      },
      plugins: {
        vitest,
      },
      // Type information lets valid-title accept a class as title (`describe(UserService, …)`).
      settings: {
        vitest: { typecheck: true },
      },
      rules: {
        // Replaced by the Vitest version (allows `expect(obj.method).toHaveBeenCalled()`).
        '@typescript-eslint/unbound-method': ['off'],
        // Off: a `describe` callback holds a whole suite.
        'sonarjs/max-lines-per-function': ['off'],

        // ---- Vitest ----
        // Custom: `.for` (typed, Vitest 2+) instead of `.each`.
        'vitest/consistent-each-for': ['error', { test: 'for', it: 'for', describe: 'for', suite: 'for' }],
        // Custom: specs are named `*.spec.ts`, benchmarks `*.bench.ts`.
        'vitest/consistent-test-filename': ['error', { pattern: String.raw`.*\.(spec|bench)\.ts$` }],
        // Custom: `it` everywhere.
        'vitest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
        'vitest/consistent-vitest-vi': ['error'],
        'vitest/expect-expect': ['error'],
        'vitest/hoisted-apis-on-top': ['error'],
        'vitest/max-expects': ['error'],
        'vitest/max-nested-describe': ['error'],
        'vitest/no-alias-methods': ['error'],
        'vitest/no-commented-out-tests': ['error'],
        'vitest/no-conditional-expect': ['error'],
        'vitest/no-conditional-in-test': ['error'],
        'vitest/no-conditional-tests': ['error'],
        'vitest/no-disabled-tests': ['error'],
        // Deprecated: no replacement.
        'vitest/no-done-callback': ['off'],
        'vitest/no-duplicate-hooks': ['error'],
        'vitest/no-focused-tests': ['error'],
        // Off: test setup belongs in `beforeEach`.
        'vitest/no-hooks': ['off'],
        'vitest/no-identical-title': ['error'],
        'vitest/no-import-node-test': ['error'],
        // Vitest globals are enabled (see languageOptions above).
        'vitest/no-importing-vitest-globals': ['error'],
        'vitest/no-interpolation-in-snapshots': ['error'],
        'vitest/no-large-snapshots': ['error'],
        'vitest/no-mocks-import': ['error'],
        // Off: needs a list of forbidden matchers.
        'vitest/no-restricted-matchers': ['off'],
        // Off: needs a list of forbidden `vi` methods.
        'vitest/no-restricted-vi-methods': ['off'],
        'vitest/no-standalone-expect': ['error'],
        'vitest/no-test-prefixes': ['error'],
        'vitest/no-test-return-statement': ['error'],
        'vitest/no-unneeded-async-expect-function': ['error'],
        // Off: blank lines are left to the author, like the rest of the layout.
        'vitest/padding-around-after-all-blocks': ['off'],
        // Off: blank lines are left to the author, like the rest of the layout.
        'vitest/padding-around-after-each-blocks': ['off'],
        // Off: blank lines are left to the author, like the rest of the layout.
        'vitest/padding-around-all': ['off'],
        // Off: blank lines are left to the author, like the rest of the layout.
        'vitest/padding-around-before-all-blocks': ['off'],
        // Off: blank lines are left to the author, like the rest of the layout.
        'vitest/padding-around-before-each-blocks': ['off'],
        // Off: blank lines are left to the author, like the rest of the layout.
        'vitest/padding-around-describe-blocks': ['off'],
        // Off: blank lines are left to the author, like the rest of the layout.
        'vitest/padding-around-expect-groups': ['off'],
        // Off: blank lines are left to the author, like the rest of the layout.
        'vitest/padding-around-test-blocks': ['off'],
        // Off: its autofix turns `toHaveBeenCalledOnce()` into `toHaveBeenCalledExactlyOnceWith()`, which asserts no arguments.
        'vitest/prefer-called-exactly-once-with': ['off'],
        'vitest/prefer-called-once': ['error'],
        // Off: opposite of prefer-called-once.
        'vitest/prefer-called-times': ['off'],
        // Off: its autofix turns `toHaveBeenCalled()` into `toHaveBeenCalledWith()`, which asserts no arguments.
        'vitest/prefer-called-with': ['off'],
        'vitest/prefer-comparison-matcher': ['error'],
        // Off: its autofix rewrites the title on every save and fights valid-title in editors; both forms stay valid.
        'vitest/prefer-describe-function-title': ['off'],
        'vitest/prefer-each': ['error'],
        'vitest/prefer-equality-matcher': ['error'],
        // Off: requires `expect.assertions()` in every test; async tests use `await` instead.
        'vitest/prefer-expect-assertions': ['off'],
        'vitest/prefer-expect-resolves': ['error'],
        'vitest/prefer-expect-type-of': ['error'],
        'vitest/prefer-hooks-in-order': ['error'],
        'vitest/prefer-hooks-on-top': ['error'],
        'vitest/prefer-import-in-mock': ['error'],
        // Off: opposite of no-importing-vitest-globals.
        'vitest/prefer-importing-vitest-globals': ['off'],
        // Custom: `describe` titles are functions or classes (`clamp`, `RingBuffer`).
        'vitest/prefer-lowercase-title': ['error', { ignore: ['describe'] }],
        'vitest/prefer-mock-promise-shorthand': ['error'],
        'vitest/prefer-mock-return-shorthand': ['error'],
        'vitest/prefer-snapshot-hint': ['error'],
        'vitest/prefer-spy-on': ['error'],
        // Off: its autofix turns `toBeTruthy()` into `toBe(true)`, which fails on objects.
        'vitest/prefer-strict-boolean-matchers': ['off'],
        'vitest/prefer-strict-equal': ['error'],
        'vitest/prefer-to-be': ['error'],
        // Off: loosens `toBe(false)` into `toBeFalsy()`.
        'vitest/prefer-to-be-falsy': ['off'],
        'vitest/prefer-to-be-object': ['error'],
        // Off: loosens `toBe(true)` into `toBeTruthy()`.
        'vitest/prefer-to-be-truthy': ['off'],
        'vitest/prefer-to-contain': ['error'],
        'vitest/prefer-to-have-been-called-times': ['error'],
        'vitest/prefer-to-have-length': ['error'],
        'vitest/prefer-todo': ['error'],
        'vitest/prefer-vi-mocked': ['error'],
        'vitest/require-awaited-expect-poll': ['error'],
        'vitest/require-hook': ['error'],
        'vitest/require-local-test-context-for-concurrent-snapshots': ['error'],
        'vitest/require-mock-type-parameters': ['error'],
        // Off: the Vitest config sets the timeout.
        'vitest/require-test-timeout': ['off'],
        'vitest/require-to-throw-message': ['error'],
        'vitest/require-top-level-describe': ['error'],
        'vitest/unbound-method': ['error'],
        'vitest/valid-describe-callback': ['error'],
        'vitest/valid-expect': ['error'],
        'vitest/valid-expect-in-promise': ['error'],
        'vitest/valid-title': ['error'],
        // Custom: warn, unfinished placeholder tests are listed and block the CI with `--max-warnings 0`.
        'vitest/warn-todo': ['warn'],
      },
    },
    {
      name: 'vitest/benchmarks',
      files: ['**/*.bench.ts'],
      rules: {
        // Custom: a benchmark asserts through `benchmark.compare()`.
        'vitest/expect-expect': ['error', { assertFunctionNames: ['expect', 'benchmark.compare'] }],
        // Custom: benchmarks import the package by its name, resolved to its build output (dist/).
        'import-x/no-extraneous-dependencies': ['off'],
      },
    },
    {
      name: 'vitest/test-data',
      files: TEST_CODE_FILES,
      rules: {
        // Off: test tables are made of literal numbers and repeated strings.
        '@typescript-eslint/no-magic-numbers': ['off'],
        'sonarjs/no-duplicate-string': ['off'],
        // Off: fixtures are plain mutable objects.
        '@typescript-eslint/prefer-readonly-parameter-types': ['off'],
      },
    },
  ];
}
