import { getNiceTicks } from './get-nice-ticks.ts';

/** Approximate number of ticks: readable on a small chart, enough to read values. */
const TICK_COUNT = 5;

/**
 * Computes round axis graduations like `getNiceTicks`, about five of them.
 *
 * @param min - Start of the interval.
 * @param max - End of the interval.
 * @returns The tick values, ascending.
 * @throws {RangeError} When `min` is greater than `max`.
 * @simple About 5 ticks.
 * @example
 * getNiceTicksSimple(0, 97); // [0, 20, 40, 60, 80]
 */
export function getNiceTicksSimple(min: number, max: number): number[] {
  return getNiceTicks(min, max, TICK_COUNT);
}
