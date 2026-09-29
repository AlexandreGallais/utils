/** Graduations of a time axis, returned by `getTimeTicks`. */
export interface TimeTicks {
  /** The tick timestamps, in milliseconds since the epoch, ascending. */
  readonly values: readonly number[];
  /** The interval between two ticks, to choose the label format (see `getTimeTickPattern`). */
  readonly stepMs: number;
}
