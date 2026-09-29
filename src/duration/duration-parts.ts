/** A duration split into calendar-free units, as returned by `splitDuration` and the duration parsers. */
export interface DurationParts {
  /** `1` for a positive (or zero) duration, `-1` for a negative one; the other fields are never negative. */
  readonly sign: -1 | 1;
  /** Whole days (24 hours each). */
  readonly days: number;
  /** Hours, in [0, 23]. */
  readonly hours: number;
  /** Minutes, in [0, 59]. */
  readonly minutes: number;
  /** Seconds, in [0, 59]. */
  readonly seconds: number;
  /** Milliseconds, in [0, 1000[, possibly fractional (C# `TimeSpan` ticks are 0.0001 ms). */
  readonly milliseconds: number;
  /** The whole duration in milliseconds, signed. */
  readonly totalMilliseconds: number;
}
