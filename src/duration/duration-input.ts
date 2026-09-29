/** A duration given as units, every field optional and possibly fractional or negative. */
export interface DurationInput {
  /** Weeks (7 days). */
  readonly weeks?: number;
  /** Days (24 hours). */
  readonly days?: number;
  /** Hours. */
  readonly hours?: number;
  /** Minutes. */
  readonly minutes?: number;
  /** Seconds. */
  readonly seconds?: number;
  /** Milliseconds. */
  readonly milliseconds?: number;
}
