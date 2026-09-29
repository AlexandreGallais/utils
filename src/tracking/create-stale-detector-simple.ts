import { createStaleDetector } from './create-stale-detector.ts';
import type { StaleDetector } from './stale-detector.ts';

/**
 * Creates a detector for values that stopped refreshing, like `createStaleDetector`.
 *
 * @param maxAgeMs - Longest silence before the value is stale, in milliseconds.
 * @returns A detector, stale until its first `update`.
 * @throws {RangeError} When `maxAgeMs` is not a positive finite number.
 * @simple `performance.now()` as the clock.
 * @example
 * const freshness = createStaleDetectorSimple(1000);
 */
export function createStaleDetectorSimple(maxAgeMs: number): StaleDetector {
  return createStaleDetector(maxAgeMs, () => performance.now());
}
