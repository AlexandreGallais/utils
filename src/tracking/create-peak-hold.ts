import { moveTowards } from '../math';
import type { PeakHold } from './peak-hold';

/**
 * Creates a peak-hold indicator, like the marker of an audio level meter or the max needle of a gauge: the
 * highest recent value stays displayed for `holdMs`, then falls back to the current value, at once or at a
 * limited speed.
 *
 * @param holdMs - How long a peak stays before falling back, in milliseconds.
 * @param decayPerSecond - Fall speed after the hold, in units per second; `Infinity` jumps to the current
 * value. Defaults to `Number.POSITIVE_INFINITY`.
 * @returns An indicator without value.
 * @throws {RangeError} When `holdMs` is negative or not finite, or `decayPerSecond` is not positive.
 * @example
 * const maxRpm = createPeakHold(2000, 500);
 * clock.subscribe(({ timestamp }) => peakMarker.set(maxRpm.update(engine.rpm, timestamp)));
 */
export function createPeakHold(holdMs: number, decayPerSecond?: number | null): PeakHold {
  const resolvedDecayPerSecond = decayPerSecond ?? Number.POSITIVE_INFINITY;
  if (!Number.isFinite(holdMs) || holdMs < 0) {
    throw new RangeError(`holdMs must be a non-negative finite number, got ${holdMs}`);
  }
  if (Number.isNaN(resolvedDecayPerSecond) || resolvedDecayPerSecond <= 0) {
    throw new RangeError(`decayPerSecond must be a positive number, got ${resolvedDecayPerSecond}`);
  }
  let peak = NaN;
  let peakTimestampMs = 0;
  let lastTimestampMs = 0;
  return {
    get value(): number {
      return peak;
    },
    update(value: number, timestampMs: number): number {
      const releaseMs = peakTimestampMs + holdMs;
      if (Number.isNaN(peak) || value >= peak) {
        peak = value;
        peakTimestampMs = timestampMs;
      } else if (timestampMs > releaseMs) {
        peak =
          resolvedDecayPerSecond === Infinity
            ? value
            : moveTowards(peak, value, resolvedDecayPerSecond, timestampMs - Math.max(lastTimestampMs, releaseMs));
      }
      lastTimestampMs = timestampMs;
      return peak;
    },
    reset(): void {
      peak = NaN;
    },
  };
}
