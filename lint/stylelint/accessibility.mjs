// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose (same as the ESLint blocks).
// Accessibility of styles (@double-great/stylelint-a11y): visible focus, reduced motion respected, readable
// texts. For applications used by the public or by people with disabilities.

/**
 * Accessibility rules for styles.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function accessibilityBlock() {
  return {
    plugins: ['@double-great/stylelint-a11y'],
    rules: {
      // Generated text (`content: 'New'`) is not read by every screen reader.
      'a11y/content-property-no-static-value': true,
      // Custom: texts of at least 15 px.
      'a11y/font-size-is-readable': true,
      // Off: a vertical rhythm is a design choice, not an accessibility requirement.
      'a11y/line-height-is-vertical-rhythmed': null,
      // Off: dark mode is a feature of the design system tokens, not of each file.
      'a11y/media-prefers-color-scheme': null,
      // Animations stop for people who ask for reduced motion.
      'a11y/media-prefers-reduced-motion': true,
      // Off: `display: none` is the right way to hide from everyone; this rule targets a different pattern.
      'a11y/no-display-none': null,
      'a11y/no-obsolete-attribute': true,
      'a11y/no-obsolete-element': true,
      // `outline: none` removes the focus ring of keyboard users.
      'a11y/no-outline-none': true,
      // Off: line length is a layout decision of each component.
      'a11y/no-spread-text': null,
      // Justified text creates rivers of spaces, hard to read for dyslexic readers.
      'a11y/no-text-align-justify': true,
      // A `:hover` style has its `:focus` equivalent.
      'a11y/selector-pseudo-class-focus': true,
    },
  };
}
