// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style fixed
// on save: the property order, the Prettier formatting (never disabled); `warning` = a choice to justify (disabled
// for one line, with a reason). Notations are free.
// Values and units: units, lengths, numbers, functions, strings, and `rem` without decimals.

/**
 * Values and units rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function valuesAndUnitsBlock() {
  return {
    rules: {
      'annotation-no-unknown': null,
      // Custom: `rem` values are whole steps (`1rem`, `2rem`): `1.25rem` is an in-between size, not a clean step.
      'declaration-property-value-disallowed-list': [
        { '/.*/': [String.raw`/\b\d+\.\d+rem\b/`] },
        { severity: 'warning', message: 'A rem value is a whole step (1rem, 2rem), not a decimal.' },
      ],
      'function-allowed-list': null,
      'function-calc-no-unspaced-operator': true,
      'function-disallowed-list': null,
      'function-linear-gradient-no-nonstandard-direction': true,
      // Off: a notation choice, not a mistake.
      'function-name-case': null,
      'function-no-unknown': null,
      // Off: a notation choice, not a mistake.
      'length-zero-no-unit': null,
      // Off: a notation choice, not a mistake.
      'number-max-precision': null,
      'string-no-newline': true,
      'time-min-milliseconds': null,
      'unit-allowed-list': null,
      'unit-disallowed-list': null,
      'unit-layout-mappings': null,
      'unit-no-unknown': true,
      // Off: a notation choice, not a mistake.
      'value-keyword-case': null,
      'value-keyword-layout-mappings': null,
      // Off: the Angular build adds the vendor prefixes.
      'value-no-vendor-prefix': null,
    },
  };
}
