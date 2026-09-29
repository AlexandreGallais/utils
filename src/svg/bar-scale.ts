import type { Rect } from '../geometry/rect.ts';
import type { BarDirection } from './bar-direction.ts';

/** Maps the values of a bar gauge onto its drawing area. */
export interface BarScale {
  /** Value at the origin of the bar (the bottom of an `'up'` bar). */
  readonly min: number;
  /** Value at the far end of the bar. */
  readonly max: number;
  /** Drawing area of the bar, in SVG user units. */
  readonly rect: Rect;
  /** Direction in which values grow. */
  readonly direction: BarDirection;
}
