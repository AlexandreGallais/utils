# Cascade layers

`@layer` decides which rule wins **before** specificity: a rule of a later layer beats a rule of an earlier
layer, whatever their selectors. The specificity wars of large stylesheets (`.a .b .c`, `!important`) end:
the order of the layers is declared once, and each style goes in its layer.

## The order of the design system

<<< @/../examples/design-system/src/styles/_layers.scss

| Layer        | Contains                                                                   |
| ------------ | -------------------------------------------------------------------------- |
| `reset`      | The normalisation of browser styles (`box-sizing`, margins)                |
| `tokens`     | The custom properties: primitives, semantic tokens, themes                 |
| `base`       | Styles of bare elements: `body`, headings, links                           |
| `layout`     | Page structure: grids, containers, stacks                                  |
| `components` | The styles of the atoms, molecules and organisms                           |
| `utilities`  | Single-purpose classes (`.visually-hidden`): they must win over components |
| `overrides`  | Rare, justified exceptions (third-party widgets)                           |

The `layers` Stylelint block refuses any other layer name, so the order stays the one agreed.

## Rules to know

- **Unlayered styles beat every layer.** A stylesheet without `@layer` (a third-party library, a forgotten
  file) wins over the whole design system. Put everything in a layer, or import third-party CSS into one:
  `@import url('widget.css') layer(overrides);`.
- **The first declaration of the order wins.** Declare the order before any layered rule: the first
  `@layer a, b;` or `@layer a { }` seen sets the position of `a`. In Sass, `@use` must come before any other
  rule, so the order lives in its own partial, loaded first:

<<< @/../examples/design-system/src/styles/styles.scss

- **`!important` is inverted.** An important declaration of an **earlier** layer beats an important one of a
  later layer (the reset can protect a critical rule). The `strictness` block forbids `!important` anyway: a
  later layer is the clean way to win.
- **Layers nest.** `@layer components.buttons { }` creates a sub-layer, ordered inside `components`; the
  `layers` rule checks the top-level name.

## Angular components

Component styles (emulated encapsulation) are scoped by Angular, and their layer is set in the file:

```scss
@layer components {
  .button {
    color: var(--color-action-text);
  }
}
```

A utility class then always wins over a component style, with no `!important` and no `::ng-deep`:

```html
<ds-button class="visually-hidden" />
```
