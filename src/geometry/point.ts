/** A position in a 2D coordinate system (SVG, canvas or screen: the y axis points down). */
export interface Point {
  /** Horizontal coordinate, growing to the right. */
  readonly x: number;
  /** Vertical coordinate, growing downwards. */
  readonly y: number;
}
