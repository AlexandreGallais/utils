// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Security: Injection (XSS, SQL, commands), weak cryptography, secrets, insecure protocols and the sanitizer.
// Rules of ESLint, typescript-eslint, SonarJS and Unicorn on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import noUnsanitized from 'eslint-plugin-no-unsanitized';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import tsEslint from 'typescript-eslint';
import { CODE_FILES, TYPESCRIPT_FILES } from '../setup/files.mjs';

/** DomSanitizer methods that turn off Angular's protection for a value. */
const SANITIZER_BYPASSES = [
  'bypassSecurityTrustHtml',
  'bypassSecurityTrustResourceUrl',
  'bypassSecurityTrustScript',
  'bypassSecurityTrustStyle',
  'bypassSecurityTrustUrl',
];

/**
 * Security rules.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function securityBlock() {
  return [
    {
      name: 'code/security',
      files: CODE_FILES,
      plugins: {
        'no-unsanitized': noUnsanitized,
        sonarjs,
        unicorn,
      },
      rules: {
        // ---- no-unsanitized ----
        // `insertAdjacentHTML`, `document.write`, `Range.createContextualFragment` with a dynamic string.
        'no-unsanitized/method': ['error'],
        // `innerHTML` / `outerHTML` assigned a dynamic string.
        'no-unsanitized/property': ['error'],
        // ---- ESLint ----
        // Custom: a sanitizer bypass is a security review, not a shortcut; justify it with an eslint-disable comment.
        'no-restricted-properties': [
          'error',
          ...SANITIZER_BYPASSES.map((property) => ({
            property,
            message: 'Bypassing the sanitizer allows XSS: sanitize the value or justify it in a comment.',
          })),
        ],
        'no-eval': ['error'],
        'no-implied-eval': ['error'],
        'no-new-func': ['error'],
        'no-script-url': ['error'],
        // ---- SonarJS ----
        // Off: duplicate of no-eval, no-new-func and no-implied-eval.
        'sonarjs/code-eval': ['off'],
        'sonarjs/confidential-information-logging': ['off'],
        'sonarjs/content-length': ['error'],
        'sonarjs/content-security-policy': ['error'],
        'sonarjs/cookie-no-httponly': ['error'],
        'sonarjs/cors': ['error'],
        'sonarjs/csrf': ['error'],
        'sonarjs/disabled-auto-escaping': ['error'],
        'sonarjs/disabled-resource-integrity': ['error'],
        'sonarjs/dompurify-unsafe-config': ['error'],
        'sonarjs/encryption-secure-mode': ['error'],
        'sonarjs/file-permissions': ['error'],
        'sonarjs/file-uploads': ['error'],
        'sonarjs/frame-ancestors': ['off'],
        'sonarjs/hardcoded-secret-signatures': ['error'],
        'sonarjs/hashing': ['error'],
        'sonarjs/hidden-files': ['off'],
        'sonarjs/insecure-cookie': ['error'],
        'sonarjs/insecure-jwt-token': ['error'],
        'sonarjs/link-with-target-blank': ['error'],
        'sonarjs/no-angular-bypass-sanitization': ['error'],
        'sonarjs/no-clear-text-protocols': ['error'],
        'sonarjs/no-hardcoded-ip': ['error'],
        'sonarjs/no-hardcoded-passwords': ['error'],
        'sonarjs/no-hardcoded-secrets': ['error'],
        'sonarjs/no-intrusive-permissions': ['off'],
        'sonarjs/no-ip-forward': ['off'],
        'sonarjs/no-mime-sniff': ['error'],
        'sonarjs/no-mixed-content': ['off'],
        'sonarjs/no-os-command-from-path': ['error'],
        'sonarjs/no-referrer-policy': ['error'],
        'sonarjs/no-session-cookies-on-static-assets': ['error'],
        'sonarjs/no-unsafe-unzip': ['off'],
        'sonarjs/no-weak-cipher': ['error'],
        'sonarjs/no-weak-keys': ['error'],
        'sonarjs/os-command': ['off'],
        'sonarjs/post-message': ['error'],
        'sonarjs/production-debug': ['error'],
        'sonarjs/pseudo-random': ['error'],
        'sonarjs/publicly-writable-directories': ['error'],
        'sonarjs/session-regeneration': ['error'],
        'sonarjs/slow-regex': ['error'],
        'sonarjs/sql-queries': ['error'],
        'sonarjs/strict-transport-security': ['error'],
        'sonarjs/unverified-certificate': ['error'],
        'sonarjs/unverified-hostname': ['error'],
        'sonarjs/weak-ssl': ['error'],
        'sonarjs/web-sql-database': ['off'],
        'sonarjs/x-powered-by': ['error'],
        'sonarjs/xml-parser-xxe': ['error'],
        // ---- Unicorn ----
        'unicorn/no-document-cookie': ['error'],
        // Custom.
        'unicorn/no-unsafe-dom-html': ['error'],
        'unicorn/no-unsafe-sqlite-interpolation': ['error'],
        // Custom.
        'unicorn/require-post-message-target-origin': ['error'],
      },
    },
    {
      name: 'code/security/typescript',
      files: TYPESCRIPT_FILES,
      plugins: {
        '@typescript-eslint': tsEslint.plugin,
      },
      rules: {
        // ---- typescript-eslint (and the core rules it replaces) ----
        // Replaced by the TS version.
        'no-implied-eval': ['off'],
        '@typescript-eslint/no-implied-eval': ['error'],
      },
    },
  ];
}
