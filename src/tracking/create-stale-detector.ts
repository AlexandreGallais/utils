import type { StaleDetector } from './stale-detector';

/**
 * Creates a detector for values that stopped refreshing: a sensor, a network feed or a simulation variable
 * that should update every 100 ms but has been silent for a second is shown as invalid rather than as a
 * frozen, trustworthy-looking number. Call `update` on each value, `isStale` when drawing.
 *
 * @param maxAgeMs - Longest silence before the value is stale, in milliseconds.
 * @param now - Clock in milliseconds, such as `() => performance.now()` (a fake clock in tests). Defaults to
 * `performance.now()`.
 * @returns A detector, stale until its first `update`.
 * @throws {RangeError} When `maxAgeMs` is not a positive finite number.
 * @example
 * const speedFreshness = createStaleDetector(1000, () => performance.now());
 * feed.on('speed', (value) => { speed.set(value); speedFreshness.update(); });
 * clock.subscribe(() => isSpeedStale.set(speedFreshness.isStale()), 250);
 */
export function createStaleDetector(maxAgeMs: number, now?: (() => number) | null): StaleDetector {
  const resolvedNow = now ?? ((): number => performance.now());
  if (!Number.isFinite(maxAgeMs) || maxAgeMs <= 0) {
    throw new RangeError(`maxAgeMs must be a positive finite number, got ${maxAgeMs}`);
  }
  let lastUpdateMs = -Infinity;
  return {
    update(): void {
      lastUpdateMs = resolvedNow();
    },
    isStale(): boolean {
      return resolvedNow() - lastUpdateMs > maxAgeMs;
    },
    getAgeMs(): number {
      return resolvedNow() - lastUpdateMs;
    },
  };
}
