import { parseColor } from './parse-color.ts';
import type { Rgba } from './rgba.ts';

/**
 * Parses any CSS color string, like `parseColor`, but throws instead of returning `undefined`. Each call
 * parses again: see `parseColorOrThrowCached`.
 *
 * @param input - A color string, such as `'#1e90ff'`, `'rgb(30 144 255)'` or `'dodgerblue'`.
 * @returns A new color object.
 * @throws {TypeError} When `input` is not a valid color.
 * @example
 * parseColorOrThrow('red'); // { r: 255, g: 0, b: 0, a: 1 }
 * parseColorOrThrow('nope'); // throws TypeError: Invalid color: 'nope'
 */
export function parseColorOrThrow(input: string): Rgba {
  const color = parseColor(input);
  if (!color) {
    throw new TypeError(`Invalid color: '${input}'`);
  }
  return color;
}
