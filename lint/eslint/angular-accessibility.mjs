// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// Accessibility of Angular templates (WCAG): images with a text alternative, keyboard access, labels, ARIA.
// Add it to any application used by the public or by people with disabilities; see also the
// stylelint accessibility block for focus styles and reduced motion.

/**
 * Accessibility rules for Angular templates (turns on the rules the angular-template block leaves off).
 *
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread after angular-template.
 */
export default function angularAccessibilityBlock() {
  return [
    {
      name: 'angular-accessibility',
      files: ['**/*.html'],
      rules: {
        // `<img>`, `<object>`, `<area>` and `<input type="image">` describe their content.
        '@angular-eslint/template/alt-text': ['error'],
        // A `(click)` on a non-button element also handles the keyboard.
        '@angular-eslint/template/click-events-have-key-events': ['error'],
        // Headings, links and buttons have a readable content.
        '@angular-eslint/template/elements-content': ['error'],
        // An element with a click handler can take the focus.
        '@angular-eslint/template/interactive-supports-focus': ['error'],
        // Every form control has a `<label>`.
        '@angular-eslint/template/label-has-associated-control': ['error'],
        // Hover handlers have focus equivalents.
        '@angular-eslint/template/mouse-events-have-key-events': ['error'],
        // `autofocus` moves screen readers without warning.
        '@angular-eslint/template/no-autofocus': ['error'],
        // A positive `tabindex` breaks the natural keyboard order.
        '@angular-eslint/template/no-positive-tabindex': ['error'],
        // An ARIA role comes with its required attributes.
        '@angular-eslint/template/role-has-required-aria': ['error'],
        // `scope` only on table headers.
        '@angular-eslint/template/table-scope': ['error'],
        // Only valid ARIA attributes and values.
        '@angular-eslint/template/valid-aria': ['error'],
      },
    },
  ];
}
