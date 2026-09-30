/** An arc around the center of an element, for `createSvgArcPath` and its siblings (0° up, clockwise). */
export interface SvgArc {
  /** The element whose visible center is the center of the arc, such as the hub of a gauge. */
  readonly center: SVGGraphicsElement;
  /** In the coordinates of the drawn path. */
  readonly radius: number;
  /** In degrees. */
  readonly startAngle: number;
  /** The opening in degrees: positive clockwise, 360 for a full circle. */
  readonly sweepAngle: number;
}
