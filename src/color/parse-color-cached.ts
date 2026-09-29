import { parseColor } from './parse-color.ts';
import type { Rgba } from './rgba.ts';

/** Entries kept before the cache is cleared: bounds the memory used by arbitrary inputs. */
const CACHE_SIZE = 512;

/** Parsed colors by raw input, `false` for an invalid one. */
const cache = new Map<string, Rgba | false>();

/**
 * Parses any CSS color string, like `parseColor`, with a cache: parsing the same string again is a map
 * lookup (~20× faster). UIs parse the same few color strings at every refresh.
 *
 * @param input - A color string, such as `'#1e90ff'`, `'rgb(30 144 255)'` or `'dodgerblue'`.
 * @returns The frozen color, the same object for the same input, or `undefined` when the string is not a
 * color (never throws).
 * @cached Results by input string, 512 entries, cleared when full. Results are frozen: they are shared.
 * @example
 * parseColorCached('#FFF'); // { r: 255, g: 255, b: 255, a: 1 }
 * parseColorCached('#FFF') === parseColorCached('#FFF'); // true
 */
export function parseColorCached(input: string): Rgba | undefined {
  let color = cache.get(input);
  if (color === undefined) {
    const parsed = parseColor(input);
    color = parsed ? Object.freeze(parsed) : false;
    if (cache.size >= CACHE_SIZE) {
      cache.clear();
    }
    cache.set(input, color);
  }
  return color === false ? undefined : color;
}
