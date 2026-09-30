import type { DataBounds } from './data-bounds';

/** Margin added on each side when none is given: 5 % of the span. */
const DEFAULT_RATIO = 0.05;

/**
 * Adds a margin around a chart window, as a fraction of its range, so that the extreme points are not drawn
 * on the edges. An empty axis (a constant series) gets a margin of `fallback` on each side instead.
 *
 * @param bounds - The window, typically from `getDataBounds`.
 * @param ratio - Margin on each side, as a fraction of the range: `0.05` adds 5 %. Defaults to `0.05`.
 * @param fallback - Margin on each side of an axis whose range is zero, in data units. Defaults to `1`.
 * @returns The padded window.
 * @example
 * padBounds({ minX: 0, maxX: 100, minY: 20, maxY: 20 }, 0.1, 1); // { minX: -10, maxX: 110, minY: 19, maxY: 21 }
 */
export function padBounds(bounds: DataBounds, ratio?: number | null, fallback?: number | null): DataBounds {
  const resolvedRatio = ratio ?? DEFAULT_RATIO;
  const resolvedFallback = fallback ?? 1;
  const marginX = getMargin(bounds.maxX - bounds.minX, resolvedRatio, resolvedFallback);
  const marginY = getMargin(bounds.maxY - bounds.minY, resolvedRatio, resolvedFallback);
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
