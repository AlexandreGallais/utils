// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Security of browser code: no HTML injected without sanitising it (XSS), no bypass of Angular's sanitizer.
// SonarJS and the base block already forbid eval, new Function and javascript: URLs.

import noUnsanitized from 'eslint-plugin-no-unsanitized';
import { CODE_FILES } from './files.mjs';

/** DomSanitizer methods that turn off Angular's protection for a value. */
const SANITIZER_BYPASSES = [
  'bypassSecurityTrustHtml',
  'bypassSecurityTrustResourceUrl',
  'bypassSecurityTrustScript',
  'bypassSecurityTrustStyle',
  'bypassSecurityTrustUrl',
];

/**
 * Security rules for browser code.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function securityBlock() {
  return [
    {
      name: 'security',
      files: CODE_FILES,
      plugins: {
        'no-unsanitized': noUnsanitized,
      },
      rules: {
        // `insertAdjacentHTML`, `document.write`, `Range.createContextualFragment` with a dynamic string.
        'no-unsanitized/method': ['error'],
        // `innerHTML` / `outerHTML` assigned a dynamic string.
        'no-unsanitized/property': ['error'],
        // Custom: a bypass is a security review, not a shortcut; justify it with an eslint-disable comment.
        'no-restricted-properties': [
          'error',
          ...SANITIZER_BYPASSES.map((property) => ({
            property,
            message: 'Bypassing the sanitizer allows XSS: sanitize the value or justify it in a comment.',
          })),
        ],
      },
    },
  ];
}
