import type { Rect } from '../geometry';
import type { BarScale } from './bar-scale';
import { valueToBarPosition } from './value-to-bar-position';

/**
 * Computes the part of a bar gauge between two values, across its whole thickness: a threshold zone (8 to
 * 10 in red), or the fill level of the bar (`min` to the current value). Values out of the scale are cut at
 * the ends of the bar; the order of `from` and `to` does not matter.
 *
 * @param from - One end of the value range.
 * @param to - The other end of the value range.
 * @param scale - Value range, drawing area and direction of the bar.
 * @returns The rectangle to draw, of zero length when the range is empty or out of the scale.
 * @example
 * const scale = { min: 0, max: 10, rect: { x: 0, y: 0, width: 20, height: 200 }, direction: 'up' } as const;
 * valueRangeToRect(8, 10, scale); // { x: 0, y: 0, width: 20, height: 40 } (red zone at the top)
 * valueRangeToRect(scale.min, 2.5, scale); // { x: 0, y: 150, width: 20, height: 50 } (fill level)
 */
export function valueRangeToRect(from: number, to: number, scale: BarScale): Rect {
  const first = valueToBarPosition(from, scale, true);
  const second = valueToBarPosition(to, scale, true);
  const start = Math.min(first, second);
  const length = Math.abs(second - first);
  const { rect } = scale;
  return scale.direction === 'up' || scale.direction === 'down'
    ? { x: rect.x, y: start, width: rect.width, height: length }
    : { x: start, y: rect.y, width: length, height: rect.height };
}
