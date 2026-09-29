// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Internationalisation of Angular templates with @angular/localize: every text is marked for translation, with
// a custom id. Only for applications translated with @angular/localize (see also frameworks/angular-i18n.mjs).

/**
 * i18n rules for Angular templates.
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread after templates/angular-template.
 */
export default function angularI18nTemplatesBlock() {
  return [
    {
      name: 'templates/angular-i18n',
      files: ['**/*.html'],
      rules: {
        // Every text and translatable attribute carries an `i18n` marker with a custom id.
        '@angular-eslint/template/i18n': ['error', { checkId: true, checkText: true, checkAttributes: true }],
      },
    },
  ];
}
