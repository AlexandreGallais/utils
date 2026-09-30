// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced,
// `Warn` = the exception that justifies disabling a warning. Severity: `error` = a real mistake, or a style fixed
// on save: the property order, the Prettier formatting (never disabled); `warning` = a choice to justify (disabled
// for one line, with a reason). Notations are free.
// Selectors: validity, specificity, patterns, nesting of selectors, Angular custom elements and `::ng-deep`.

/**
 * Selectors rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function selectorsBlock() {
  return {
    rules: {
      // Off: a notation choice, not a mistake.
      'keyframe-selector-notation': null,
      // Warn: often a false alarm with nesting; check that the later, weaker selector is not overridden.
      'no-descending-specificity': [true, { severity: 'warning' }],
      'no-duplicate-selectors': null,
      'selector-anb-no-unmatchable': true,
      'selector-attribute-name-disallowed-list': null,
      'selector-attribute-operator-allowed-list': null,
      'selector-attribute-operator-disallowed-list': null,
      // Off: a notation choice, not a mistake.
      'selector-attribute-quotes': null,
      'selector-class-pattern': ['^([a-z][a-z0-9]*)(-[a-z0-9]+)*$', { severity: 'warning' }],
      'selector-combinator-allowed-list': null,
      'selector-combinator-disallowed-list': null,
      'selector-disallowed-list': null,
      // Off: a naming convention the code review is enough for.
      'selector-id-pattern': null,
      'selector-max-attribute': null,
      'selector-max-class': null,
      'selector-max-combinators': null,
      // Custom: a selector of more than 4 parts is fragile.
      'selector-max-compound-selectors': [4, { severity: 'warning' }],
      // Custom: an `#id` selector is too specific to override; use a class.
      'selector-max-id': [0, { severity: 'warning' }],
      'selector-max-pseudo-class': null,
      'selector-max-specificity': null,
      'selector-max-type': null,
      'selector-max-universal': null,
      'selector-nested-pattern': null,
      'selector-no-deprecated': null,
      'selector-no-invalid': null,
      'selector-no-qualifying-type': null,
      'selector-no-unmatchable': null,
      // Off: the Angular build adds the vendor prefixes.
      'selector-no-vendor-prefix': null,
      // Off: a notation choice, not a mistake.
      'selector-not-notation': null,
      'selector-pseudo-class-allowed-list': null,
      'selector-pseudo-class-disallowed-list': null,
      'selector-pseudo-class-no-unknown': true,
      'selector-pseudo-element-allowed-list': null,
      // Off: a notation choice, not a mistake.
      'selector-pseudo-element-colon-notation': null,
      // Custom: `::ng-deep` is deprecated by Angular; style a child through its inputs or CSS custom properties.
      'selector-pseudo-element-disallowed-list': [['ng-deep'], { severity: 'warning' }],
      // Custom: `::ng-deep` is known (selector-pseudo-element-disallowed-list warns about it).
      'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['ng-deep'] }],
      // Off: a notation choice, not a mistake.
      'selector-type-case': null,
      // Custom: Angular component selectors (`app-user-list`) are custom elements.
      'selector-type-no-unknown': [true, { ignore: ['custom-elements'] }],
    },
  };
}
