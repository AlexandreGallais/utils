// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Comments: TODO / FIXME, commented-out code, ts-ignore and the style of comments.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/**
 * Comments rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function commentsBlock() {
  return [
    {
      name: 'rules/comments',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        'capitalized-comments': ['off'],
        // Off: non-standard, end-of-line comments are fine.
        'no-inline-comments': ['off'],
        // Warn: a TODO may stay while a ticket tracks it.
        'no-warning-comments': ['warn'],
        // ---- SonarJS ----
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-commented-code': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-sonar-comments': ['off'],
        // Off: duplicate of no-warning-comments.
        'sonarjs/fixme-tag': ['off'],
        // Off: duplicate of no-warning-comments.
        'sonarjs/todo-tag': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/file-header': ['off'],
      },
    },
    {
      name: 'rules/comments/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        '@typescript-eslint/ban-ts-comment': ['error'],
        '@typescript-eslint/ban-tslint-comment': ['error'],
        // Deprecated: replaced by ban-ts-comment.
        '@typescript-eslint/prefer-ts-expect-error': ['off'],
      },
    },
  ];
}
