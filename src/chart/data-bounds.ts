/** The visible window of a chart, in data units: the y axis grows upwards, unlike screen coordinates. */
export interface DataBounds {
  /** Smallest visible x value (left edge). */
  readonly minX: number;
  /** Largest visible x value (right edge). */
  readonly maxX: number;
  /** Smallest visible y value (bottom edge). */
  readonly minY: number;
  /** Largest visible y value (top edge). */
  readonly maxY: number;
}
