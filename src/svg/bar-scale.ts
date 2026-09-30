import type { Rect } from '../geometry';

/**
 * Direction in which the values of a bar gauge grow: `'up'` fills from the bottom, `'down'` from the top,
 * `'right'` from the left, `'left'` from the right.
 */
export type BarDirection = 'down' | 'left' | 'right' | 'up';

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
