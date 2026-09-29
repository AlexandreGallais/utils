# Stylelint blocks

Stylelint has no flat config: the blocks of `lint/stylelint/` return config objects, merged in order by
`composeStylelint` (later rules replace earlier ones; `extends`, `plugins` and `overrides` add up).

| Block                | What it checks                                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `base`               | Standard CSS (`stylelint-config-standard`), invalid or unknown code, no named colors, disable comments with a reason |
| `scss`               | Sass: `@use` with a namespace, no `@import`, no dead or risky code                                                   |
| `order`              | Custom properties first, then declarations grouped by role, then nested rules (autofix)                              |
| `strictness`         | No `!important`, no `#id`, 3 levels of nesting at most                                                               |
| `design-tokens`      | Colors, spacing, radii, shadows, fonts, z-indexes only through tokens; token naming                                  |
| `layers`             | Only the cascade layers of the design system                                                                         |
| `performance`        | Animations only on `transform` and `opacity`                                                                         |
| `accessibility`      | Visible focus, reduced motion, readable texts                                                                        |
| `logical-properties` | `margin-inline-start` instead of `margin-left` (right-to-left languages)                                             |
| `prettier`           | Formatting                                                                                                           |

## design-tokens

A component never writes a raw color or size: it picks a token. Only the token files define raw values.

<<< @/../lint/stylelint/design-tokens.mjs

```scss
.button {
  color: #fff; // ✗ color-no-hex, declaration-strict-value
  padding: 12px; // ✗ declaration-strict-value
  padding: var(--space-inline); // ✓
  background: var(--color-action); // ✓
}
```

## layers

The cascade order is declared once by the design system; a file cannot invent a layer. Stylelint has no rule
for this, so the block ships its own (`lint/stylelint/rules/layer-name-allowed-list.mjs`).

<<< @/../lint/stylelint/layers.mjs

## accessibility

<<< @/../lint/stylelint/accessibility.mjs
