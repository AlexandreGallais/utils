/** The fields of a date, as numbers people read, returned by `getDateParts`. */
export interface DateParts {
  /** Full year, such as `2026`. */
  readonly year: number;
  /** Month, from 1 (January) to 12, unlike `Date#getMonth()`. */
  readonly month: number;
  /** Day of the month, from 1. */
  readonly day: number;
  /** Hours, from 0 to 23. */
  readonly hour: number;
  /** Minutes, from 0 to 59. */
  readonly minute: number;
  /** Seconds, from 0 to 59. */
  readonly second: number;
  /** Milliseconds, from 0 to 999. */
  readonly millisecond: number;
  /** ISO day of the week, from 1 (Monday) to 7 (Sunday), unlike `Date#getDay()`. */
  readonly weekday: number;
  /** Day of the year, from 1 (1 January) to 366. */
  readonly dayOfYear: number;
  /** Milliseconds since 1970-01-01T00:00:00Z. */
  readonly timestamp: number;
}
