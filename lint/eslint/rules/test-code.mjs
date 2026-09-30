// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Test code: the SonarJS rules on tests (they apply where a test framework is used), then the relaxations test
// code needs (specs, `testing/` helpers, benchmarks): literal tables, mutable fixtures, long `describe` callbacks.

import sonarjs from 'eslint-plugin-sonarjs';
import globals from 'globals';
import { CODE_FILES, TEST_CODE_FILES, TEST_FILES } from '../setup/files.mjs';

/**
 * Test rules, and the relaxations for test code.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function testCodeBlock() {
  return [
    {
      name: 'rules/test-code',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- SonarJS ----
        'sonarjs/assertions-in-test-cases': ['warn'],
        'sonarjs/assertions-in-tests': ['warn'],
        'sonarjs/no-duplicate-test-title': ['warn'],
        'sonarjs/no-empty-test-title': ['warn'],
        'sonarjs/no-exclusive-tests': ['error'],
        'sonarjs/no-skipped-tests': ['warn'],
        'sonarjs/async-test-assertions': ['error'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/composite-assertions': ['off'],
        'sonarjs/explicit-test-skip': ['warn'],
        'sonarjs/inverted-assertion-arguments': ['warn'],
        'sonarjs/no-code-after-done': ['warn'],
        'sonarjs/no-debug-commands-in-ui-tests': ['error'],
        'sonarjs/no-duplicate-parameterized-test-case': ['error'],
        'sonarjs/no-empty-parameterized-test-dataset': ['error'],
        'sonarjs/no-empty-test-file': ['warn'],
        'sonarjs/no-fixed-wait-in-tests': ['warn'],
        'sonarjs/no-incompatible-assertion-types': ['error'],
        'sonarjs/no-incomplete-assertions': ['warn'],
        'sonarjs/no-interpolation-in-inline-snapshots': ['warn'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-networkidle-wait': ['off'],
        'sonarjs/no-same-argument-assert': ['error'],
        'sonarjs/no-trivial-assertions': ['warn'],
        'sonarjs/parameterized-tests': ['warn'],
        'sonarjs/prefer-specific-assertions': ['warn'],
        'sonarjs/stable-tests': ['warn'],
        'sonarjs/synchronous-exception-assertions': ['error'],
        'sonarjs/synchronous-suite-callback': ['error'],
        'sonarjs/test-check-exception': ['warn'],
        'sonarjs/testing-library-prefer-query-by-disappearance': ['error'],
        'sonarjs/testing-library-query-assertion': ['error'],
        'sonarjs/vitest-mock-at-module-scope': ['warn'],
      },
    },
    {
      name: 'rules/test-code/relaxations',
      files: TEST_CODE_FILES,
      languageOptions: {
        globals: {
          ...globals.vitest,
        },
      },
      rules: {
        // Off: test tables are made of literal numbers.
        '@typescript-eslint/no-magic-numbers': ['off'],
        // Off: fixtures are plain mutable objects.
        '@typescript-eslint/prefer-readonly-parameter-types': ['off'],
        // Off: `expect(mock.method).toHaveBeenCalled()` passes a method unbound on purpose.
        '@typescript-eslint/unbound-method': ['off'],
        // Off: a `describe` callback holds a whole suite.
        'max-lines-per-function': ['off'],
        'sonarjs/max-lines-per-function': ['off'],
        // Off: tests exercise patterns with every flag, or none.
        'require-unicode-regexp': ['off'],
      },
    },
    {
      name: 'rules/test-code/benchmarks',
      files: TEST_FILES.filter((glob) => glob.endsWith('.bench.ts')),
      rules: {
        // Custom: benchmarks import the package by its name, resolved to its build output (dist/).
        'import-x/no-extraneous-dependencies': ['off'],
      },
    },
  ];
}
