// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style the
// autofix applies (never disabled); `warning` = a style without autofix (disabled for one line, with a reason).
// At-rules: `@media`, `@import`, `@layer`, `@container` and the other at-rules.

/**
 * At rules rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function atRulesBlock() {
  return {
    rules: {
      'at-rule-allowed-list': null,
      'at-rule-descriptor-no-unknown': null,
      'at-rule-descriptor-value-no-unknown': null,
      'at-rule-disallowed-list': null,
      'at-rule-empty-line-before': [
        'always',
        { except: ['blockless-after-blockless', 'first-nested'], ignore: ['after-comment'], ignoreAtRules: ['else'] },
      ],
      'at-rule-no-deprecated': true,
      'at-rule-no-unknown': null,
      'at-rule-no-vendor-prefix': true,
      'at-rule-prelude-no-invalid': null,
      'at-rule-property-required-list': null,
      'container-name-pattern': ['^(--)?([a-z][a-z0-9]*)(-[a-z0-9]+)*$', { severity: 'warning' }],
      'custom-media-pattern': ['^([a-z][a-z0-9]*)(-[a-z0-9]+)*$', { severity: 'warning' }],
      'import-notation': 'string',
      'layer-name-pattern': ['^([a-z][a-z0-9]*)([.-][a-z0-9]+)*$', { severity: 'warning' }],
      'media-feature-name-allowed-list': null,
      'media-feature-name-disallowed-list': null,
      'media-feature-name-no-unknown': true,
      'media-feature-name-no-vendor-prefix': true,
      'media-feature-name-unit-allowed-list': null,
      'media-feature-name-value-allowed-list': null,
      'media-feature-name-value-no-unknown': null,
      'media-feature-range-notation': 'context',
      'media-query-no-invalid': null,
      'media-type-no-deprecated': true,
    },
  };
}
