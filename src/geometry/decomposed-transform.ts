/**
 * A transform split into readable steps, applied in this order to a point: scale, skew, rotation, then
 * translation (`translate(…) rotate(…) skewX(…) scale(…)` in an SVG `transform` list).
 */
export interface DecomposedTransform {
  /** Horizontal translation. */
  readonly translateX: number;
  /** Vertical translation. */
  readonly translateY: number;
  /** Rotation in degrees, clockwise on screen, in ]-180, 180]. */
  readonly rotation: number;
  /** Horizontal scale, never negative. */
  readonly scaleX: number;
  /** Vertical scale; negative when the transform is flipped (mirrored). */
  readonly scaleY: number;
  /** Horizontal skew angle, in degrees. */
  readonly skewX: number;
}
