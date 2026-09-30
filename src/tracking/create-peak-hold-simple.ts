import { createPeakHold } from './create-peak-hold';
import type { PeakHold } from './peak-hold';

/**
 * Creates a peak-hold indicator like `createPeakHold`, whose peak drops at once to the current value after the hold time.
 *
 * @param holdMs - How long a peak stays, in milliseconds.
 * @returns An indicator without value.
 * @throws {RangeError} When `holdMs` is negative or not finite.
 * @simple Instant fall after the hold.
 * @example
 * const maxRpm = createPeakHoldSimple(2000);
 */
export function createPeakHoldSimple(holdMs: number): PeakHold {
  return createPeakHold(holdMs, Infinity);
}
