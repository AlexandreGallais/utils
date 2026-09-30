import type { Point } from './point';
import type { Rect } from './rect';

/**
 * Computes the smallest axis-aligned rectangle containing every point, in one pass.
 *
 * @param points - The points to enclose (two opposite corners give the rectangle between them). Defaults to `[]`.
 * @returns The bounding rectangle, or `undefined` for an empty list.
 * @example
 * getBoundingRect([{ x: 10, y: 40 }, { x: 30, y: 5 }, { x: 20, y: 20 }]); // { x: 10, y: 5, width: 20, height: 35 }
 */
export function getBoundingRect(points?: Iterable<Point> | null): Rect | undefined {
  const resolvedPoints = points ?? [];
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const { x, y } of resolvedPoints) {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  return minX > maxX ? undefined : { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}
