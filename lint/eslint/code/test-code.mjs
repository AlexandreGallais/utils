// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Tests (core and SonarJS): Test-code rules of SonarJS; the Vitest plugin has its own block.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import { CODE_FILES } from '../setup/files.mjs';

/**
 * Tests (core and SonarJS) rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function testCodeBlock() {
  return [
    {
      name: 'code/test-code',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
      },
      rules: {
        // ---- SonarJS ----
        // Off: duplicate of vitest/no-standalone-expect.
        'sonarjs/assertions-in-test-cases': ['off'],
        // Off: duplicate of vitest/expect-expect.
        'sonarjs/assertions-in-tests': ['off'],
        // Off: duplicate of vitest/no-identical-title.
        'sonarjs/no-duplicate-test-title': ['off'],
        // Off: duplicate of vitest/valid-title.
        'sonarjs/no-empty-test-title': ['off'],
        // Off: duplicate of vitest/no-focused-tests.
        'sonarjs/no-exclusive-tests': ['off'],
        // Off: duplicate of vitest/no-disabled-tests.
        'sonarjs/no-skipped-tests': ['off'],
        'sonarjs/async-test-assertions': ['error'],
        'sonarjs/composite-assertions': ['off'],
        'sonarjs/explicit-test-skip': ['error'],
        'sonarjs/inverted-assertion-arguments': ['error'],
        'sonarjs/no-code-after-done': ['error'],
        'sonarjs/no-debug-commands-in-ui-tests': ['error'],
        'sonarjs/no-duplicate-parameterized-test-case': ['error'],
        'sonarjs/no-empty-parameterized-test-dataset': ['error'],
        'sonarjs/no-empty-test-file': ['error'],
        'sonarjs/no-fixed-wait-in-tests': ['error'],
        'sonarjs/no-incompatible-assertion-types': ['error'],
        'sonarjs/no-incomplete-assertions': ['error'],
        'sonarjs/no-interpolation-in-inline-snapshots': ['error'],
        'sonarjs/no-networkidle-wait': ['off'],
        'sonarjs/no-same-argument-assert': ['error'],
        'sonarjs/no-trivial-assertions': ['error'],
        'sonarjs/parameterized-tests': ['error'],
        'sonarjs/prefer-specific-assertions': ['error'],
        'sonarjs/stable-tests': ['error'],
        'sonarjs/synchronous-exception-assertions': ['error'],
        'sonarjs/synchronous-suite-callback': ['error'],
        'sonarjs/test-check-exception': ['error'],
        'sonarjs/testing-library-prefer-query-by-disappearance': ['error'],
        'sonarjs/testing-library-query-assertion': ['error'],
        'sonarjs/vitest-mock-at-module-scope': ['error'],
        // ---- Unicorn ----
        'unicorn/consistent-assert': ['error'],
        'unicorn/no-nesting-with-mixed-specificity': ['off'],
        'unicorn/prefer-identifier-import-export-specifiers': ['error'],
        // Off: duplicate of regexp/prefer-regexp-test.
        'unicorn/prefer-regexp-test': ['off'],
        'unicorn/require-module-specifiers': ['error'],
      },
    },
  ];
}
