import type { BarScale } from './bar-scale.ts';

/** Scale, steps and tick lengths of the graduations built by `createBarTicks`. */
export interface BarTicksOptions extends BarScale {
  /** Interval between major graduations, from `min`. */
  readonly majorStep: number;
  /** Interval between minor graduations, from `min`; no minor graduation when omitted. */
  readonly minorStep?: number;
  /** Length of major ticks, across the bar; the whole thickness of the bar when omitted. */
  readonly majorLength?: number;
  /** Length of minor ticks, across the bar; half the major length when omitted. */
  readonly minorLength?: number;

  /**
   * Edge the ticks start from: `'start'` is the left edge of a vertical bar or the top edge of a horizontal
   * one, `'end'` the opposite edge.
   */
  readonly align?: 'end' | 'start';
}
