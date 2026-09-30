import type { Rect } from './rect';

/** Where to draw a content scaled by `fitRect`, and by how much it was scaled. */
export interface FittedRect extends Rect {
  /** Factor applied to the natural size of the content. */
  readonly scale: number;
}
