import { randomHexColor } from './random-hex-color';

/**
 * Draws an opaque color like `randomHexColor`.
 *
 * @returns A lowercase `#rrggbb` color.
 * @simple `Math.random` as the source (not replayable: use the full version with `createSeededRandom` for that).
 * @example
 * randomHexColorSimple(); // '#3fa2c8'
 */
export function randomHexColorSimple(): string {
  return randomHexColor(Math.random);
}
