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
