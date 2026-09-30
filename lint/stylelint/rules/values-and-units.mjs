// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warning` = a style without autofix (disabled for one line, with a reason).
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
      'function-name-case': 'lower',
      'function-no-unknown': null,
      'length-zero-no-unit': [true, { ignore: ['custom-properties'], ignorePreludeOfAtRules: ['function', 'mixin'] }],
      'number-max-precision': [4, { severity: 'warning' }],
      'string-no-newline': true,
      'time-min-milliseconds': null,
      'unit-allowed-list': null,
      'unit-disallowed-list': null,
      'unit-layout-mappings': null,
      'unit-no-unknown': true,
      'value-keyword-case': 'lower',
      'value-keyword-layout-mappings': null,
      'value-no-vendor-prefix': [true, { ignoreValues: ['box', 'inline-box'] }],
    },
  };
}
