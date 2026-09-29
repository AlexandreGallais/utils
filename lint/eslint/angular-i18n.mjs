// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Internationalisation of Angular templates with @angular/localize: every text is marked for translation, with
// a meaning and a description for the translators. Only for applications translated with @angular/localize.

/**
 * i18n rules for Angular (requires @angular/localize).
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread after angular and angular-template.
 */
export default function angularI18nBlock() {
  return [
    {
      name: 'angular-i18n/templates',
      files: ['**/*.html'],
      rules: {
        // Every text and translatable attribute carries an `i18n` marker with a custom id.
        '@angular-eslint/template/i18n': ['error', { checkId: true, checkText: true, checkAttributes: true }],
      },
    },
    {
      name: 'angular-i18n/typescript',
      files: ['**/*.ts'],
      rules: {
        // `` messages carry a meaning and a description.
        '@angular-eslint/require-localize-metadata': ['error', { requireDescription: true, requireMeaning: true }],
        // `` is called at runtime (not in a field initialiser evaluated before the locale is loaded).
        '@angular-eslint/runtime-localize': ['error'],
      },
    },
  ];
}
