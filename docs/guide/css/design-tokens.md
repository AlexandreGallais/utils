# Design tokens

A **token** is a named design decision: a color, a spacing, a radius, a font size, a duration. The design
system defines the tokens as CSS custom properties, and every component uses them instead of raw values. A
brand change, a dark theme or a density change is then a change of tokens, not of hundreds of components.

## Three levels

| Level                    | Named after             | Example                                                  | Used by                                 |
| ------------------------ | ----------------------- | -------------------------------------------------------- | --------------------------------------- |
| **Primitive**            | what the value is       | `--color-blue-500`, `--space-300`                        | semantic tokens only                    |
| **Semantic**             | what the value is for   | `--color-action`, `--color-text-muted`, `--space-inline` | components                              |
| **Component** (optional) | a part of one component | `--button-padding`                                       | that component, to let a parent tune it |

Components use **semantic** tokens: `--color-action` says why the button is blue, and a theme can change it
without touching the button.

Primitives: the palette and the scales.

<<< @/../examples/design-system/src/styles/tokens/_primitives.scss

Semantic tokens, and a dark theme that only changes them:

<<< @/../examples/design-system/src/styles/tokens/_semantic.scss

## Naming

`--<category>-<name>`, kebab-case: `--color-text-muted`, `--space-inline`, `--radius-control`,
`--font-size-title`, `--z-overlay`, `--duration-fast`. The `design-tokens` Stylelint block enforces the
categories (`custom-property-pattern`).

- Scales use steps with room between them (`100`, `200`, `300`…) so that a value can be inserted later.
- Colors in `oklch()`: perceptually uniform, so `--color-blue-500` and `--color-red-500` have the same
  lightness, and derived shades are predictable.
- No value in a name (`--space-16px`): the value may change, the name stays.

## Use them

```scss
.button {
  padding-block: var(--space-inline);
  color: var(--color-action-text);
  background: var(--color-action);
  border-radius: var(--radius-control);
}
```

The `design-tokens` block of Stylelint refuses a raw color, spacing, radius, shadow, font or z-index outside
the token files, so a forgotten `#3366cc` never reaches the code review.

## Component tokens: an API for parents

A component can expose a few custom properties with a default token, so that a parent adjusts it without
overriding its internals:

```scss
:host {
  --button-padding: var(--space-inline); // the public knob, defaults to a token
}

.button {
  padding: var(--button-padding);
}
```

```scss
.toolbar ds-button {
  --button-padding: var(--space-100); // a denser button, without touching the button's styles
}
```

## Themes

A theme is a set of semantic tokens under a selector (`[data-theme='dark']`, or
`@media (prefers-color-scheme: dark)` to follow the system). Primitives never change: only the mapping from
purpose to value does. Switch with one attribute on `<html>`:

```ts
document.documentElement.dataset['theme'] = 'dark';
```

## Animatable tokens

A custom property is animated as a string (it jumps). Register it with `@property` to interpolate it:

```css
@property --progress {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: false;
}
```
