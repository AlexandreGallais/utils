// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Comments: TODO / FIXME, commented-out code, ts-ignore and the style of comments.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
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
      name: 'code/comments',
      files: CODE_FILES,
      plugins: {
        sonarjs,
        unicorn,
      },
      rules: {
        // ---- ESLint ----
        'capitalized-comments': ['off'],
        // Off: non-standard, end-of-line comments are fine.
        'no-inline-comments': ['off'],
        'no-warning-comments': ['error'],
        // ---- SonarJS ----
        'sonarjs/no-commented-code': ['error'],
        'sonarjs/no-sonar-comments': ['error'],
        // Off: duplicate of no-warning-comments.
        'sonarjs/fixme-tag': ['off'],
        // Off: duplicate of no-warning-comments.
        'sonarjs/todo-tag': ['off'],
        'sonarjs/file-header': ['off'],
        // ---- Unicorn ----
        'unicorn/comment-content': ['off'],
        'unicorn/expiring-todo-comments': ['error'],
        // Off: duplicate of @eslint-community/eslint-comments/no-unlimited-disable.
        'unicorn/no-abusive-eslint-disable': ['off'],
        'unicorn/no-asterisk-prefix-in-documentation-comments': ['off'],
        'unicorn/no-manually-wrapped-comments': ['off'],
        // Custom: a short comment stays on one line (`/** Full turn, in degrees. */`).
        'unicorn/single-line-block-comment-style': ['error', 'single-line'],
      },
    },
    {
      name: 'code/comments/typescript',
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
