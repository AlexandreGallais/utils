// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose (same as the ESLint blocks).
// Rendering performance: animations and transitions only on `transform` and `opacity`, which the browser
// composites on the GPU; animating `top`, `width` or `box-shadow` recomputes the layout or repaints each frame.

/**
 * Animation performance rules.
 *
 * @returns {import('stylelint').Config} The block, for composeStylelint.
 */
export default function performanceBlock() {
  return {
    plugins: ['stylelint-high-performance-animation'],
    rules: {
      // Paint properties (`color`, `box-shadow`) too: they repaint at each frame.
      'plugin/no-low-performance-animation-properties': true,
    },
  };
}
