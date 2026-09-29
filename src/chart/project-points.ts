import type { Point } from '../geometry/point.ts';
import type { Rect } from '../geometry/rect.ts';
import type { DataBounds } from './data-bounds.ts';

/**
 * Converts data points to screen coordinates: `bounds` is stretched over `rect` and the y axis is flipped so
 * that larger values are drawn higher. Points out of the bounds land out of the rectangle.
 *
 * @param points - The data points.
 * @param bounds - The data window shown by the chart.
 * @param rect - The plot area, in screen coordinates.
 * @returns The screen points, in the same order; an empty bounds axis maps to the left or bottom edge.
 * @example
 * projectPoints([{ x: 5, y: 50 }], { minX: 0, maxX: 10, minY: 0, maxY: 100 }, { x: 0, y: 0, width: 200, height: 100 });
 * // [{ x: 100, y: 50 }]
 */
export function projectPoints(points: readonly Point[], bounds: DataBounds, rect: Rect): Point[] {
  const scaleX = getScale(rect.width, bounds.maxX - bounds.minX);
  const scaleY = getScale(rect.height, bounds.maxY - bounds.minY);
  const bottom = rect.y + rect.height;
  return points.map(({ x, y }) => ({ x: rect.x + (x - bounds.minX) * scaleX, y: bottom - (y - bounds.minY) * scaleY }));
}

/**
 * Computes how many pixels a data unit takes along an axis.
 *
 * @param pixels - The length of the plot area on the axis.
 * @param span - The data interval shown on the axis.
 * @returns The ratio, `0` for an empty interval.
 */
function getScale(pixels: number, span: number): number {
  return span === 0 ? 0 : pixels / span;
}
