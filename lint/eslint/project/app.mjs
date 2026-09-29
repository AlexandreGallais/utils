// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Application code: no escape hatch. In a library, a justified `// eslint-disable-next-line … -- reason` may
// allow an `any` where a generic API needs it (a Constructor type, an external type); in an application, the
// unsafe rules cannot be disabled at all: the code is fixed instead.

import { CODE_FILES } from '../setup/files.mjs';

/** Rules an application may never disable, even with a reason. */
const LOCKED_RULES = [
  '@typescript-eslint/ban-ts-comment',
  '@typescript-eslint/no-explicit-any',
  '@typescript-eslint/no-floating-promises',
  '@typescript-eslint/no-misused-promises',
  '@typescript-eslint/no-non-null-assertion',
  '@typescript-eslint/no-unsafe-argument',
  '@typescript-eslint/no-unsafe-assignment',
  '@typescript-eslint/no-unsafe-call',
  '@typescript-eslint/no-unsafe-function-type',
  '@typescript-eslint/no-unsafe-member-access',
  '@typescript-eslint/no-unsafe-return',
  '@typescript-eslint/no-unsafe-type-assertion',
  'no-restricted-properties',
  'no-unsanitized/method',
  'no-unsanitized/property',
];

/**
 * Locks the unsafe rules in application code.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread after the comments block.
 */
export default function appBlock() {
  return [
    {
      name: 'project/app/locked-rules',
      files: CODE_FILES,
      rules: {
        // Custom: see LOCKED_RULES.
        '@eslint-community/eslint-comments/no-restricted-disable': ['error', ...LOCKED_RULES],
      },
    },
  ];
}
