// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Library: the sources of a library, whose generic API may write `any` (a constructor type) and `void` in a
// union (a callback returning `T | void`). Using an `any` value stays an error (no-unsafe-*).

/**
 * Library relaxations for the sources of a library.
 *
 * @param {string[]} sourceFiles - Globs of the sources, such as `['src/**\/*.ts']`.
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function libraryBlock(sourceFiles) {
  return [
    {
      name: 'rules/library',
      files: sourceFiles,
      rules: {
        // Off: a generic API may need `any`: `new (...parameters: any[]) => T`.
        '@typescript-eslint/no-explicit-any': ['off'],
        // Off: a callback type may return `T | void`.
        '@typescript-eslint/no-invalid-void-type': ['off'],
      },
    },
  ];
}
