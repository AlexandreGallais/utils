import type { Point } from '../geometry/point.ts';

/** A graduation of a bar gauge, returned by `createBarTicks`. */
export interface BarTick {
  /** Value of the graduation. */
  readonly value: number;
  /** Coordinate along the bar: a `y` for a vertical bar, an `x` for a horizontal one. */
  readonly position: number;
  /** End of the tick line on the aligned edge of the bar. */
  readonly start: Point;
  /** Other end of the tick line, towards the inside of the bar. */
  readonly end: Point;
  /** Whether the graduation is on a major step (longer tick, usually labelled). */
  readonly isMajor: boolean;
}
