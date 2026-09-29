import type { Point } from '../geometry/point.ts';

/** A graduation of a round gauge, returned by `createArcTicks`. */
export interface ArcTick {
  /** Value of the graduation. */
  readonly value: number;
  /** Angle of the graduation, in degrees (library convention: 0° up, clockwise). */
  readonly angle: number;
  /** Inner end of the tick line. */
  readonly start: Point;
  /** Outer end of the tick line. */
  readonly end: Point;
  /** Whether the graduation is on a major step (longer tick, usually labelled). */
  readonly isMajor: boolean;
}
