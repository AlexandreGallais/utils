import { smoothTowards } from '../math/smooth-towards.ts';
import type { RateEstimator } from './rate-estimator.ts';

/** Milliseconds per second. */
const MS_PER_SECOND = 1000;

/**
 * Creates an estimator of the rate of change of a noisy value, such as a heading trend in °/s or a climb
 * rate: the difference between consecutive samples, smoothed exponentially over time so that the result
 * does not depend on the sampling rate. For an angle, feed the unwrapped value (see `angleDifference`).
 *
 * @param timeConstantMs - Smoothing time: the estimate covers ~63 % of a step change after this delay; `0`
 * gives the raw rate between the last two samples.
 * @returns An estimator without sample.
 * @example
 * const headingRate = createRateEstimator(500);
 * feed.on('heading', ({ value, timestamp }) => turnRate.set(headingRate.push(value, timestamp)));
 */
export function createRateEstimator(timeConstantMs: number): RateEstimator {
  let lastValue = NaN;
  let lastTimestampMs = NaN;
  let rate = NaN;
  return {
    get rate(): number {
      return rate;
    },
    push(value: number, timestampMs: number): number {
      const deltaMs = timestampMs - lastTimestampMs;
      if (Number.isNaN(lastTimestampMs) || deltaMs > 0) {
        const instantRate = ((value - lastValue) * MS_PER_SECOND) / deltaMs;
        rate = Number.isNaN(rate) ? instantRate : smoothTowards(rate, instantRate, deltaMs, timeConstantMs);
        lastValue = value;
        lastTimestampMs = timestampMs;
      }
      return rate;
    },
    reset(): void {
      lastValue = NaN;
      lastTimestampMs = NaN;
      rate = NaN;
    },
  };
}
