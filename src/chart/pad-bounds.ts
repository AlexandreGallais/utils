import type { DataBounds } from './data-bounds.ts';

/**
 * Adds a margin around a chart window, as a fraction of its range, so that the extreme points are not drawn
 * on the edges. An empty axis (a constant series) gets a margin of `fallback` on each side instead.
 *
 * @param bounds - The window, typically from `getDataBounds`.
 * @param ratio - Margin on each side, as a fraction of the range: `0.05` adds 5 %.
 * @param fallback - Margin on each side of an axis whose range is zero, in data units.
 * @returns The padded window.
 * @example
 * padBounds({ minX: 0, maxX: 100, minY: 20, maxY: 20 }, 0.1); // { minX: -10, maxX: 110, minY: 19, maxY: 21 }
 */
export function padBounds(bounds: DataBounds, ratio: number, fallback = 1): DataBounds {
  const marginX = getMargin(bounds.maxX - bounds.minX, ratio, fallback);
  const marginY = getMargin(bounds.maxY - bounds.minY, ratio, fallback);
  return {
    minX: bounds.minX - marginX,
    maxX: bounds.maxX + marginX,
    minY: bounds.minY - marginY,
    maxY: bounds.maxY + marginY,
  };
}

/**
 * Computes the margin of one axis.
 *
 * @param span - The range of the axis.
 * @param ratio - Margin as a fraction of the range.
 * @param fallback - Margin of an empty axis.
 * @returns The margin on each side, in data units.
 */
function getMargin(span: number, ratio: number, fallback: number): number {
  return span === 0 ? fallback : span * ratio;
}
