# Getting started

`utils` is a library of small TypeScript functions for UIs that show live values: gauges, charts, alarms,
synoptics. It has no dependency and runs in any browser.

## Two ways to use it

- **Import it** as a package: `import { formatNumber } from 'utils';`. Bundlers keep only what is used.
- **Copy a file**: every export lives in its own file. Its page lists the other files it needs, under
  **Source**, and shows the code with a copy button.

## Find a function

- Press <kbd>Ctrl</kbd> <kbd>K</kbd> (or <kbd>⌘</kbd> <kbd>K</kbd>) and type a name or a need: _thousands_,
  _rotate_, _anchor_, _gauge_.
- Or browse the [API](/api/) by category.

## Conventions

- **Angles** are in degrees, 0° up and clockwise, everywhere.
- **Defaults in the signature** for the settings: `formatNumber(value)`, `svgRotate(15)`. No
  `null`: pass `value ?? undefined` to get a default.
- **Inputs are trusted**: no argument validation; a `parse…` function throws a single `TypeError` when its
  text does not match the expected format.
- **Arguments are never mutated**: functions return new arrays and objects.

## Example

```ts
import { formatNumber, remap } from 'utils';

label.textContent = `${formatNumber(speed, '1.1-1')} kn`;
const angle = remap(speed, 0, 40, -135, 135, true); // the needle angle, stopped at the ends
```
