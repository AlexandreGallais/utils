import type { Point } from '../geometry';

/**
 * Finds the point of a series closest to a horizontal position, by binary search: the sample under the
 * mouse for a tooltip or a crosshair, in `O(log n)` whatever the length of the history.
 *
 * @param points - The series, sorted by ascending `x`. Defaults to `[]`.
 * @param x - The position to look up, in the unit of the points (use `scale.invert` for a mouse position). Defaults to
 * `0`.
 * @returns The closest point (the earlier one on a tie), or `undefined` for an empty series.
 * @example
 * const sample = findNearestPoint(history, xScale.invert(event.offsetX));
 */
export function findNearestPoint(points?: readonly Point[] | null, x?: number | null): Point | undefined {
  const resolvedPoints = points ?? [];
  const resolvedX = x ?? 0;
  let low = 0;
  let high = resolvedPoints.length;
  while (low < high) {
    const middle = (low + high) >>> 1;
    // Destructuring default instead of `?.`: `middle` is always in range.
    const [{ x: middleX } = { x: Infinity }] = resolvedPoints.slice(middle, middle + 1);
    if (middleX < resolvedX) {
      low = middle + 1;
    } else {
      high = middle;
    }
  }
  // `low` is the first point at or after `x`: the nearest is it or the one before.
  const candidates = resolvedPoints.slice(Math.max(low - 1, 0), low + 1);
  let nearest: Point | undefined;
  for (const point of candidates) {
    if (nearest === undefined || Math.abs(point.x - resolvedX) < Math.abs(nearest.x - resolvedX)) {
      nearest = point;
    }
  }
  return nearest;
}
