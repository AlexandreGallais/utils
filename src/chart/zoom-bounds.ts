import type { Point } from '../geometry/point.ts';
import type { DataBounds } from './data-bounds.ts';

/**
 * Zooms a chart window around a fixed data point, such as the value under the mouse wheel: that point stays
 * at the same place on screen.
 *
 * @param bounds - The current window.
 * @param factor - Zoom factor: `2` shows half the range, `0.5` twice the range.
 * @param center - The data point that stays still; the middle of the window by default.
 * @returns The new window.
 * @throws {RangeError} When `factor` is not a positive finite number.
 * @example
 * zoomBounds({ minX: 0, maxX: 100, minY: 0, maxY: 10 }, 2, { x: 100, y: 0 }); // { minX: 50, maxX: 100, minY: 0, maxY: 5 }
 */
export function zoomBounds(bounds: DataBounds, factor: number, center?: Point): DataBounds {
  if (!Number.isFinite(factor) || factor <= 0) {
    throw new RangeError(`factor must be a positive finite number, got ${factor}`);
  }
  const { x = (bounds.minX + bounds.maxX) / 2, y = (bounds.minY + bounds.maxY) / 2 } = center ?? {};
  return {
    minX: x + (bounds.minX - x) / factor,
    maxX: x + (bounds.maxX - x) / factor,
    minY: y + (bounds.minY - y) / factor,
    maxY: y + (bounds.maxY - y) / factor,
  };
}
