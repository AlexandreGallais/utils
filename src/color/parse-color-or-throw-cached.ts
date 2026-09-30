import { parseColorCached } from './parse-color-cached';
import type { Rgba } from './rgba';

/**
 * Parses any CSS color string with the cache of `parseColorCached`, but throws instead of returning
 * `undefined`.
 *
 * @param input - A color string, such as `'#1e90ff'`, `'rgb(30 144 255)'` or `'dodgerblue'`.
 * @returns The frozen color, the same object for the same input.
 * @throws {TypeError} When `input` is not a valid color.
 * @cached Shares the cache of `parseColorCached`: results by input string, frozen.
 * @example
 * parseColorOrThrowCached('red'); // { r: 255, g: 0, b: 0, a: 1 }
 * parseColorOrThrowCached('nope'); // throws TypeError: Invalid color: 'nope'
 */
export function parseColorOrThrowCached(input: string): Rgba {
  const color = parseColorCached(input);
  if (!color) {
    throw new TypeError(`Invalid color: '${input}'`);
  }
  return color;
}
