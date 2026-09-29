// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// ESLint directive comments: a rule is disabled one line at a time, with a reason. See the `project/app`
// block to forbid disabling the unsafe rules in application code.

import eslintComments from '@eslint-community/eslint-plugin-eslint-comments';
import { CODE_FILES } from '../setup/files.mjs';

/**
 * Rules on `eslint-disable` comments.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function eslintDirectivesBlock() {
  return [
    {
      name: 'code/eslint-directives',
      files: CODE_FILES,
      plugins: {
        '@eslint-community/eslint-comments': eslintComments,
      },
      rules: {
        '@eslint-community/eslint-comments/disable-enable-pair': ['error'],
        '@eslint-community/eslint-comments/no-aggregating-enable': ['error'],
        '@eslint-community/eslint-comments/no-duplicate-disable': ['error'],
        // Off: no rule is locked yet; list here the rules that must never be disabled. TODO
        '@eslint-community/eslint-comments/no-restricted-disable': ['off'],
        '@eslint-community/eslint-comments/no-unlimited-disable': ['error'],
        // Deprecated: replaced by linterOptions.reportUnusedDisableDirectives.
        '@eslint-community/eslint-comments/no-unused-disable': ['off'],
        '@eslint-community/eslint-comments/no-unused-enable': ['error'],
        // Custom: only `eslint-disable-next-line`; no file-wide disable, no inline config, no `/* global */`.
        '@eslint-community/eslint-comments/no-use': ['error', { allow: ['eslint-disable-next-line'] }],
        // `// eslint-disable-next-line rule -- reason`.
        '@eslint-community/eslint-comments/require-description': ['error'],
      },
    },
  ];
}
