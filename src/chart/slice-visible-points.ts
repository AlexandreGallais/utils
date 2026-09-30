import type { Point } from '../geometry';

/**
 * Keeps the points of a time series inside a horizontal window, by binary search: `O(log n)` instead of a
 * full scan, for long histories scrolled or zoomed at every frame. With neighbours, the last point before
 * and the first point after the window are kept too, so that a line drawn through the result reaches the
 * edges of the chart.
 *
 * @param points - The series, sorted by ascending `x`. Defaults to `[]`.
 * @param minX - Left edge of the window.
 * @param maxX - Right edge of the window.
 * @param isNeighborIncluded - Whether to keep the closest point outside each edge. Defaults to `true`.
 * @returns A new array with the points to draw, in order.
 * @example
 * const series = [{ x: 0, y: 1 }, { x: 10, y: 3 }, { x: 20, y: 2 }, { x: 30, y: 5 }];
 * sliceVisiblePoints(series, 12, 25, false); // [{ x: 20, y: 2 }]
 * sliceVisiblePoints(series, 12, 25, true); // [{ x: 10, y: 3 }, { x: 20, y: 2 }, { x: 30, y: 5 }]
 */
export function sliceVisiblePoints(
  points: readonly Point[] | null | undefined,
  minX: number,
  maxX: number,
  isNeighborIncluded?: boolean | null,
): Point[] {
  const resolvedPoints = points ?? [];
  const resolvedIsNeighborIncluded = isNeighborIncluded ?? true;
  const start = findFirstIndex(resolvedPoints, (x) => x >= minX);
  const end = findFirstIndex(resolvedPoints, (x) => x > maxX);
  return resolvedIsNeighborIncluded
    ? resolvedPoints.slice(Math.max(start - 1, 0), Math.min(end + 1, resolvedPoints.length))
    : resolvedPoints.slice(start, end);
}

/**
 * Finds by binary search the first point whose `x` satisfies a condition that stays true once reached.
 *
 * @param points - Points sorted by ascending `x`.
 * @param isReached - The monotonic condition on `x`.
 * @returns The index of the first matching point, `points.length` when none matches.
 */
function findFirstIndex(points: readonly Point[], isReached: (x: number) => boolean): number {
  let low = 0;
  let high = points.length;
  while (low < high) {
    const middle = (low + high) >>> 1;
    // Destructuring default instead of `?.`: `middle` is always in range.
    const [{ x } = { x: Infinity }] = points.slice(middle, middle + 1);
    if (isReached(x)) {
      high = middle;
    } else {
      low = middle + 1;
    }
  }
  return low;
}
