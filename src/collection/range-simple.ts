import { range } from './range';

/**
 * Lists the integers from `start` to `end` (excluded) like `range`.
 *
 * @param start - First value.
 * @param end - Value where the list stops, excluded.
 * @returns The values.
 * @simple Step of 1.
 * @example
 * rangeSimple(0, 5); // [0, 1, 2, 3, 4]
 */
export function rangeSimple(start: number, end: number): number[] {
  return range(start, end, 1);
}
