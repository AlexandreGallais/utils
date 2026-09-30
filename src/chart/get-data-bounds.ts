import type { Point } from '../geometry';
import type { DataBounds } from './data-bounds';

/**
 * Computes the extent of data points in one pass, to fit a chart to its data.
 *
 * @param points - The series to measure, in any order. Defaults to `[]`.
 * @returns The smallest bounds containing every point, or `undefined` for an empty list.
 * @example
 * getDataBounds([{ x: 0, y: 5 }, { x: 10, y: -2 }]); // { minX: 0, maxX: 10, minY: -2, maxY: 5 }
 */
export function getDataBounds(points?: Iterable<Point> | null): DataBounds | undefined {
  const resolvedPoints = points ?? [];
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const { x, y } of resolvedPoints) {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  return minX > maxX ? undefined : { minX, maxX, minY, maxY };
}
