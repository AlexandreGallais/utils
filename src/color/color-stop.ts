import type { Rgb } from './rgb.ts';
import type { Rgba } from './rgba.ts';

/** A color at a position of a gradient, for `getGradientColor`. */
export interface ColorStop {
  /** Position of the stop, in the unit of the mapped value (such as a temperature). */
  readonly offset: number;
  /** Color at that position. */
  readonly color: Rgb | Rgba;
}
