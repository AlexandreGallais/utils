# Getting started

`utils` is a library of small TypeScript functions for UIs that show live values: gauges, charts, alarms,
synoptics. It has no dependency and runs in any browser.

## Two ways to use it

- **Import it** as a package: `import { formatNumberSimple } from 'utils';`. Bundlers keep only what is used.
- **Copy a file**: every export lives in its own file. Its page lists the other files it needs, under
  **Source**, and shows the code with a copy button.

## Find a function

- Press <kbd>Ctrl</kbd> <kbd>K</kbd> (or <kbd>⌘</kbd> <kbd>K</kbd>) and type a name or a need: _thousands_,
  _blink_, _rotate around_, _CSV_.
- Or browse the [API](/api/) by category.

## Conventions

- **Angles** are in degrees, 0° up and clockwise, everywhere.
- **Every parameter is required**, so a call shows every choice: `formatNumber(value, '1.2-2', 'en-US')`.
  The [`…Simple` variants](./simple-variants.md) fix the usual choices.
- **Errors**: an invalid argument throws a `RangeError` (out of range) or a `TypeError` (unparsable);
  `parse…` functions return `undefined` instead, and `parse…OrThrow` variants throw.
- **Caches** are opt-in: `…Cached` variants keep computed values, the plain functions do not.
- **Arguments are never mutated**: functions return new arrays and objects.

## Example

```ts
import { Clock, formatNumberSimple, isBlinkOnSimple, MovingAverage, smoothTowards } from 'utils';

const clock = new Clock({}); // one shared tick source for the whole UI
const speed = new MovingAverage(20); // smooths the noisy 1 000 Hz input
let needle = 0;

simulation.on('speed', (value) => speed.push(value));

clock.subscribe(({ timestamp, deltaMs }) => {
  needle = smoothTowards(needle, speed.value, deltaMs, 150); // same smoothing whatever the frame rate
  label.textContent = `${formatNumberSimple(needle, '1.1-1')} kn`;
  alarm.classList.toggle('on', isBlinkOnSimple(timestamp, 1000)); // every alarm blinks in phase
});
```
