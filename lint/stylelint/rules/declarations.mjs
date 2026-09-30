// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warning` = a style without autofix (disabled for one line, with a reason).
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
      'block-no-redundant-nested-style-rules': [true, { severity: 'warning' }],
      'custom-property-empty-line-before': [
        'always',
        { except: ['after-custom-property', 'first-nested'], ignore: ['after-comment', 'inside-single-line-block'] },
      ],
      'custom-property-no-missing-var-function': true,
      'custom-property-pattern': ['^([a-z][a-z0-9]*)(-[a-z0-9]+)*$', { severity: 'warning' }],
      'declaration-block-no-duplicate-custom-properties': true,
      'declaration-block-no-duplicate-properties': [
        true,
        { ignore: ['consecutive-duplicates-with-different-syntaxes'] },
      ],
      'declaration-block-no-redundant-longhand-properties': true,
      'declaration-block-no-shorthand-property-overrides': true,
      'declaration-block-single-line-max-declarations': [1, { severity: 'warning' }],
      'declaration-empty-line-before': [
        'always',
        { except: ['after-declaration', 'first-nested'], ignore: ['after-comment', 'inside-single-line-block'] },
      ],
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
      'property-no-vendor-prefix': true,
      'shorthand-property-no-redundant-values': true,
    },
  };
}
