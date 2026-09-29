/** A peak indicator for a live value, created by `createPeakHold`. */
export interface PeakHold {
  /** The displayed peak; `NaN` before the first value. */
  readonly value: number;

  /**
   * Adds a value: a higher value becomes the new peak, a lower one lets the peak fall back once the hold
   * time is over.
   *
   * @param value - The current value.
   * @param timestampMs - When it was measured, in milliseconds.
   * @returns The updated peak.
   */
  update(value: number, timestampMs: number): number;

  /** Forgets the peak. */
  reset(): void;
}
