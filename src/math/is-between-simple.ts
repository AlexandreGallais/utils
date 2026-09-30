import { isBetween } from './is-between';

/**
 * Checks whether a value lies in an interval like `isBetween`, bounds included.
 *
 * @param value - The value to test.
 * @param min - Lower bound.
 * @param max - Upper bound.
 * @returns `true` when `min <= value <= max`.
 * @simple Bounds included.
 * @example
 * isBetweenSimple(speed, 0, 40);
 */
export function isBetweenSimple(value: number, min: number, max: number): boolean {
  return isBetween(value, min, max, true);
}
