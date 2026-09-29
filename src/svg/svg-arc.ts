/**
 * An arc around an element, for the `drawSvg…` functions: a gauge track, a band, a sector. Angles follow
 * the library convention: 0° up, clockwise.
 */
export interface SvgArc {
  /** The element whose visible center is the center of the arc, such as the hub or the face of a gauge. */
  readonly center: SVGGraphicsElement;
  /** Distance from the center, in the coordinates of the drawn path. */
  readonly radius: number;
  /** Angle where the arc starts, in degrees (0° up, clockwise). */
  readonly startAngle: number;
  /** Opening of the arc, in degrees: positive clockwise, 360 for a full circle. */
  readonly sweepAngle: number;
}
