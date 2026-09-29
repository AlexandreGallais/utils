// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Internationalisation of Angular TypeScript code with @angular/localize: `$localize` messages carry a meaning
// and a description for the translators (see also templates/angular-i18n.mjs).

/**
 * i18n rules for Angular TypeScript code.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread after frameworks/angular.
 */
export default function angularI18nBlock() {
  return [
    {
      name: 'frameworks/angular-i18n',
      files: ['**/*.ts'],
      rules: {
        // `$localize` messages carry a meaning and a description.
        '@angular-eslint/require-localize-metadata': ['error', { requireDescription: true, requireMeaning: true }],
        // `$localize` is called at runtime (not in a field initialiser evaluated before the locale is loaded).
        '@angular-eslint/runtime-localize': ['error'],
      },
    },
  ];
}
