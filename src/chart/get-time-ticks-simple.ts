import { getTimeTicks } from './get-time-ticks';
import type { TimeTicks } from './time-ticks';

/** Approximate number of ticks: readable on a small chart, enough to read times. */
const TICK_COUNT = 5;

/**
 * Computes round graduations for a time axis like `getTimeTicks`, about five of them on local clock times.
 *
 * @param start - Start of the visible interval, in milliseconds since the epoch.
 * @param end - End of the visible interval.
 * @returns The ticks and their step.
 * @throws {RangeError} When the interval is invalid.
 * @simple About 5 ticks, aligned on local time.
 * @example
 * const { values, stepMs } = getTimeTicksSimple(Date.now() - 600_000, Date.now());
 */
export function getTimeTicksSimple(start: number, end: number): TimeTicks {
  return getTimeTicks(start, end, TICK_COUNT, false);
}
