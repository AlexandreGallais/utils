import { smoothTowards } from '../math';

/** Estimates how fast a live value changes, created by `createRateEstimator`. */
export interface RateEstimator {
  /** The smoothed rate of change, in units per second; `NaN` before the second value. */
  readonly rate: number;

  /**
   * Adds a sample. A sample not later than the previous one is ignored.
   *
   * @param value - The measured value, in the unit the rate is expressed per second.
   * @param timestampMs - When it was measured, in milliseconds.
   * @returns The updated rate, in units per second.
   */
  push(value: number, timestampMs: number): number;

  /** Forgets the samples, after a pause or a jump in the simulation. */
  reset(): void;
}

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
