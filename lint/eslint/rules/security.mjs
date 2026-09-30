// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warn` = a style without autofix (disabled for one line, with a reason);
// `info` = a suggestion, shown in blue in the editor only (lint/eslint/setup/info-rules.mjs).
// Security: Injection (XSS, SQL, commands), weak cryptography, secrets, insecure protocols and the sanitizer.
// Rules of ESLint, typescript-eslint and SonarJS (the Sonar way profile of SonarQube) on this subject, every rule listed; the TypeScript
// rules apply to TypeScript files only.

import sonarjs from 'eslint-plugin-sonarjs';
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
      name: 'rules/security',
      files: CODE_FILES,
      plugins: {
        sonarjs,
      },
      rules: {
        // ---- ESLint ----
        // Custom: a sanitizer bypass is a security review, not a shortcut.
        // Warn: a reviewed bypass (trusted, constant markup) may be justified with an eslint-disable comment.
        'no-restricted-properties': [
          'warn',
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
        // Off: not in the Sonar way profile of SonarQube.
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
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/frame-ancestors': ['off'],
        'sonarjs/hardcoded-secret-signatures': ['error'],
        'sonarjs/hashing': ['error'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/hidden-files': ['off'],
        'sonarjs/insecure-cookie': ['error'],
        'sonarjs/insecure-jwt-token': ['error'],
        'sonarjs/link-with-target-blank': ['error'],
        'sonarjs/no-angular-bypass-sanitization': ['error'],
        // Warn: a SonarQube security hotspot: to review, a local URL may be fine.
        'sonarjs/no-clear-text-protocols': ['warn'],
        // Warn: a SonarQube security hotspot: to review, a documented example may be fine.
        'sonarjs/no-hardcoded-ip': ['warn'],
        'sonarjs/no-hardcoded-passwords': ['error'],
        'sonarjs/no-hardcoded-secrets': ['error'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-intrusive-permissions': ['off'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-ip-forward': ['off'],
        'sonarjs/no-mime-sniff': ['error'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-mixed-content': ['off'],
        'sonarjs/no-os-command-from-path': ['error'],
        'sonarjs/no-referrer-policy': ['error'],
        'sonarjs/no-session-cookies-on-static-assets': ['error'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/no-unsafe-unzip': ['off'],
        'sonarjs/no-weak-cipher': ['error'],
        'sonarjs/no-weak-keys': ['error'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/os-command': ['off'],
        'sonarjs/post-message': ['error'],
        'sonarjs/production-debug': ['error'],
        // Warn: a SonarQube security hotspot: to review, `Math.random` is fine outside security.
        'sonarjs/pseudo-random': ['warn'],
        'sonarjs/publicly-writable-directories': ['error'],
        'sonarjs/session-regeneration': ['error'],
        'sonarjs/slow-regex': ['error'],
        'sonarjs/sql-queries': ['error'],
        'sonarjs/strict-transport-security': ['error'],
        'sonarjs/unverified-certificate': ['error'],
        'sonarjs/unverified-hostname': ['error'],
        'sonarjs/weak-ssl': ['error'],
        // Off: not in the Sonar way profile of SonarQube.
        'sonarjs/web-sql-database': ['off'],
        'sonarjs/x-powered-by': ['error'],
        'sonarjs/xml-parser-xxe': ['error'],
      },
    },
    {
      name: 'rules/security/typescript',
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
