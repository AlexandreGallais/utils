import { randomInt } from './random-int';

/**
 * Draws a date between two others, to the millisecond, for test data such as event timestamps.
 *
 * @param start - Earliest date, included.
 * @param end - Latest date, included.
 * @param random - Source of numbers in [0, 1), such as a seeded generator for reproducible runs. Defaults to
 * `Math.random`.
 * @returns A new date.
 * @throws {RangeError} When a date is invalid or `start` is after `end`.
 * @example
 * randomDate(new Date('2026-01-01'), new Date('2026-12-31'), Math.random);
 */
export function randomDate(start: Date, end: Date, random?: (() => number) | null): Date {
  const resolvedRandom = random ?? Math.random;
  return new Date(randomInt(start.getTime(), end.getTime(), resolvedRandom));
}
