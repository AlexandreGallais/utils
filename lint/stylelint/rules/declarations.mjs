// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style fixed
// on save: the property order, the Prettier formatting (never disabled); `warning` = a choice to justify (disabled
// for one line, with a reason). Notations are free.
// Declarations and properties: duplicates, shorthands, `!important`, custom properties.

/**
 * Declarations rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function declarationsBlock() {
  return {
    rules: {
      'block-no-empty': true,
      // Off: a notation choice, not a mistake.
      'block-no-redundant-nested-style-rules': null,
      // Off: formatting, checked by prettier/prettier.
      'custom-property-empty-line-before': null,
      'custom-property-no-missing-var-function': true,
      'custom-property-pattern': ['^([a-z][a-z0-9]*)(-[a-z0-9]+)*$', { severity: 'warning' }],
      'declaration-block-no-duplicate-custom-properties': true,
      'declaration-block-no-duplicate-properties': [
        true,
        { ignore: ['consecutive-duplicates-with-different-syntaxes'] },
      ],
      // Off: a notation choice, not a mistake.
      'declaration-block-no-redundant-longhand-properties': null,
      'declaration-block-no-shorthand-property-overrides': true,
      // Off: formatting, checked by prettier/prettier.
      'declaration-block-single-line-max-declarations': null,
      // Off: formatting, checked by prettier/prettier.
      'declaration-empty-line-before': null,
      // Custom: `!important` wins over everything; justify it where it is needed.
      'declaration-no-important': [true, { severity: 'warning' }],
      'declaration-property-max-values': null,
      'declaration-property-unit-allowed-list': null,
      'declaration-property-unit-disallowed-list': null,
      'declaration-property-value-allowed-list': null,
      'declaration-property-value-keyword-no-deprecated': true,
      'declaration-property-value-no-unknown': null,
      'property-allowed-list': null,
      'property-disallowed-list': null,
      'property-layout-mappings': null,
      'property-no-deprecated': true,
      'property-no-unknown': true,
      // Off: the Angular build adds the vendor prefixes.
      'property-no-vendor-prefix': null,
      // Off: a notation choice, not a mistake.
      'shorthand-property-no-redundant-values': null,
    },
  };
}
