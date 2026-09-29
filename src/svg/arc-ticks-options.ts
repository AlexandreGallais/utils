import type { Point } from '../geometry/point.ts';

/** Geometry and scale of the graduations built by `createArcTicks`. */
export interface ArcTicksOptions {
  /** Center of the gauge. */
  readonly center: Point;
  /** Angle of `min`, in degrees (library convention: 0° up, clockwise). */
  readonly startAngle: number;
  /** Angle of `max`, in degrees. */
  readonly endAngle: number;
  /** Value at the start of the scale. */
  readonly min: number;
  /** Value at the end of the scale, greater than `min`. */
  readonly max: number;
  /** Interval between major graduations, from `min`. */
  readonly majorStep: number;
  /** Interval between minor graduations, from `min`; no minor graduation when omitted. */
  readonly minorStep?: number;
  /** Radius where major ticks start (towards the center). */
  readonly innerRadius: number;
  /** Radius where every tick ends (towards the outside). */
  readonly outerRadius: number;
  /** Radius where minor ticks start, so they are shorter; `innerRadius` when omitted. */
  readonly minorInnerRadius?: number;
}
