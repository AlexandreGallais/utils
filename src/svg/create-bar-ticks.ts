import type { Point } from '../geometry';
import { generateScaleValues } from './internal';
import { valueToBarPosition } from './value-to-bar-position';
import type { BarScale } from './bar-scale';

/** A graduation of a bar gauge, returned by `createBarTicks`. */
export interface BarTick {
  /** Value of the graduation. */
  readonly value: number;
  /** Coordinate along the bar: a `y` for a vertical bar, an `x` for a horizontal one. */
  readonly position: number;
  /** End of the tick line on the aligned edge of the bar. */
  readonly start: Point;
  /** Other end of the tick line, towards the inside of the bar. */
  readonly end: Point;
  /** Whether the graduation is on a major step (longer tick, usually labelled). */
  readonly isMajor: boolean;
}

/** Scale, steps and tick lengths of the graduations built by `createBarTicks`. */
export interface BarTicksOptions extends BarScale {
  /** Interval between major graduations, from `min`. */
  readonly majorStep: number;
  /** Interval between minor graduations, from `min`; no minor graduation when omitted. */
  readonly minorStep?: number | null;
  /** Length of major ticks, across the bar; the whole thickness of the bar when omitted. */
  readonly majorLength?: number | null;
  /** Length of minor ticks, across the bar; half the major length when omitted. */
  readonly minorLength?: number | null;

  /**
   * Edge the ticks start from: `'start'` is the left edge of a vertical bar or the top edge of a horizontal
   * one, `'end'` the opposite edge.
   */
  readonly align?: 'end' | 'start' | null;
}

/**
 * Computes the graduations of a bar gauge: major ticks every `majorStep`, shorter minor ticks every
 * `minorStep`, a minor tick falling on a major one dropped. Ticks are drawn across the bar from one of its
 * edges; draw them all at once with `createTicksPath`.
 *
 * @param options - Value range, drawing area, direction, steps, tick lengths and aligned edge.
 * @returns The graduations, in increasing value order.
 * @throws {RangeError} When a step is not a positive finite number, or `max` is not greater than `min`.
 * @example
 * const ticks = createBarTicks({
 *   min: 0, max: 10, rect: { x: 0, y: 0, width: 20, height: 200 }, direction: 'up',
 *   majorStep: 5, minorStep: 1, majorLength: 12, minorLength: 6, align: 'end',
 * });
 * scale.setAttribute('d', createTicksPath(ticks));
 */
export function createBarTicks(options: BarTicksOptions): BarTick[] {
  const { rect, direction } = options;
  const align = options.align ?? 'start';
  const isVertical = direction === 'up' || direction === 'down';
  const thickness = isVertical ? rect.width : rect.height;
  const majorLength = options.majorLength ?? thickness;
  const minorLength = options.minorLength ?? majorLength / 2;
  const edge = isVertical ? rect.x : rect.y;
  const origin = align === 'start' ? edge : edge + thickness;
  const inward = align === 'start' ? 1 : -1;
  return generateScaleValues(options.min, options.max, options.majorStep, options.minorStep).map(
    ({ value, isMajor }) => {
      const position = valueToBarPosition(value, options, true);
      const tip = origin + inward * (isMajor ? majorLength : minorLength);
      return {
        value,
        position,
        start: isVertical ? { x: origin, y: position } : { x: position, y: origin },
        end: isVertical ? { x: tip, y: position } : { x: position, y: tip },
        isMajor,
      };
    },
  );
}
