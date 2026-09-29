/** Tells whether a live value is too old to be trusted, created by `createStaleDetector`. */
export interface StaleDetector {
  /** Records that a fresh value has just arrived. */
  update(): void;

  /**
   * Checks the age of the last value, to grey out or flag a value that stopped refreshing.
   *
   * @returns `true` when no value arrived within the maximum age, or none at all yet.
   */
  isStale(): boolean;

  /**
   * Measures the time since the last value.
   *
   * @returns The age in milliseconds; `Infinity` before the first value.
   */
  getAgeMs(): number;
}
