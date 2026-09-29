import type { Point } from '../geometry/point.ts';
import type { DataBounds } from './data-bounds.ts';

/**
 * Zooms a chart window around a fixed data point, such as the value under the mouse wheel: that point stays
 * at the same place on screen.
 *
 * @param bounds - The current window.
 * @param factor - Zoom factor: `2` shows half the range, `0.5` twice the range.
 * @param center - The data point that stays still, such as the value under the mouse or the middle of the
 * window.
 * @returns The new window.
 * @throws {RangeError} When `factor` is not a positive finite number.
 * @example
 * zoomBounds({ minX: 0, maxX: 100, minY: 0, maxY: 10 }, 2, { x: 100, y: 0 }); // { minX: 50, maxX: 100, minY: 0, maxY: 5 }
 */
export function zoomBounds(bounds: DataBounds, factor: number, center: Point): DataBounds {
  if (!Number.isFinite(factor) || factor <= 0) {
    throw new RangeError(`factor must be a positive finite number, got ${factor}`);
  }
  const { x, y } = center;
  return {
    minX: x + (bounds.minX - x) / factor,
    maxX: x + (bounds.maxX - x) / factor,
    minY: y + (bounds.minY - y) / factor,
    maxY: y + (bounds.maxY - y) / factor,
  };
}
