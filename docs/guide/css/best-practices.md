# CSS best practices

What makes the styles of a design system clean, predictable and cheap to maintain. Most items are enforced by
the Stylelint blocks; the others are reviewed.

## Structure

- **Every style in a layer**, in the order of the design system ([Cascade layers](./cascade-layers.md)).
- **Every value from a token** ([Design tokens](./design-tokens.md)): no raw color, spacing, radius or font.
- **One component, one stylesheet**, scoped by Angular: no global selector for a component, no `::ng-deep`
  (deprecated, it leaks styles into children). Expose custom properties to let a parent adjust a child.
- **Shallow selectors**: classes only, 3 levels of nesting at most, no `#id`, no element-qualified class
  (`div.card`). Past that, split the component.
- **`:where()` for zero specificity** in the base and reset layers, so that any component overrides them:

  ```scss
  :where(a) {
    color: var(--color-action);
  }
  ```

## Layout

- **Flexbox and grid with `gap`**, not margins between siblings: spacing is owned by the parent.
- **Container queries** for components that adapt to their slot rather than to the screen:

  ```scss
  :host {
    container-type: inline-size;
  }

  @container (width < 30rem) {
    .item {
      flex-direction: column;
    }
  }
  ```

- **Logical properties** (`margin-inline-start`, `padding-block`) when right-to-left languages are supported
  (`logical-properties` block).
- **Relative units**: `rem` for sizes and fonts (they follow the user's font size), `%`, `fr`, `ch`; `px` for
  borders and hairlines.
- **Fluid sizes** with `clamp()`: `font-size: clamp(var(--font-size-body), 2.5vw, var(--font-size-title));`.

## Colors

- **`oklch()`** for the palette: perceptually uniform lightness, predictable shades, wide gamut.
- **`color-mix()`** to derive states in the token files:
  `--color-action-hover: color-mix(in oklch, var(--color-action), var(--color-gray-900) 15%);`.
- **Check contrast** of text and background pairs: `getApcaLevel` and `getWcagLevel` of this library compute
  it, for instance in a test of the token files.

## Motion

- Animate **`transform` and `opacity` only**: the browser composites them on the GPU; `width`, `top` or
  `box-shadow` recompute the layout or repaint at each frame (`performance` block).
- **Respect reduced motion**:

  ```scss
  @media (prefers-reduced-motion: reduce) {
    .button {
      transition: none;
    }
  }
  ```

- Durations and easings as tokens (`--duration-fast`, `--easing-standard`).

## Accessibility

- **Visible focus**: never `outline: none` without a replacement; style `:focus-visible` (keyboard) rather than
  `:focus` (`accessibility` block).
- **Hide visually, not from screen readers** with a `.visually-hidden` utility; `display: none` hides from
  everyone.
- **No justified text**, readable font sizes (at least 15 px for body text).

## Sass

- `@use` and `@forward` only (`@import` is removed from Sass), with a namespace (`@use 'tokens' as tokens`).
- Custom properties over Sass variables for anything that may change at runtime (themes, densities); Sass
  variables and mixins for compile-time helpers (breakpoints, repeated patterns).
- No `@extend`: it merges selectors across files and makes the order unpredictable; use a mixin or a class.
