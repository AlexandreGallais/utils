/** A duration split into days, hours, minutes, seconds and milliseconds. */
export interface DurationParts {
  /** `-1` for a negative duration, `1` otherwise; the other fields are never negative. */
  readonly sign: -1 | 1;
  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  /** In [0, 1000[, possibly fractional. */
  readonly milliseconds: number;
  /** The whole duration, signed. */
  readonly totalMilliseconds: number;
}
