import { randomDate } from './random-date.ts';

/**
 * Draws a date between two others like `randomDate`.
 *
 * @param start - Earliest date, included.
 * @param end - Latest date, included.
 * @returns A new date.
 * @throws {RangeError} When a date is invalid or `start` is after `end`.
 * @simple `Math.random` as the source (not replayable: use the full version with `createSeededRandom` for that).
 * @example
 * randomDateSimple(new Date(2026, 0, 1), new Date(2026, 11, 31));
 */
export function randomDateSimple(start: Date, end: Date): Date {
  return randomDate(start, end, Math.random);
}
