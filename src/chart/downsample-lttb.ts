import type { Point } from '../geometry/point.ts';

/** Fewest points kept: the first, the last and one in between. */
const MIN_TARGET_COUNT = 3;

/**
 * Reduces a long series to a given number of points with the Largest-Triangle-Three-Buckets algorithm
 * (Steinarsson, 2013): each bucket keeps the point that forms the largest triangle with its neighbours, so
 * the shape of the curve survives better than with `downsampleMinMax` for a smooth signal, with fewer
 * points. The first and last points are always kept.
 *
 * @param points - The series, sorted by ascending `x`.
 * @param targetCount - Number of points to keep, at least 3 (such as the plot width in pixels).
 * @returns A new array with the kept points, in order; a copy when the series is not longer than
 * `targetCount`.
 * @throws {RangeError} When `targetCount` is not an integer of at least 3.
 * @example
 * createPolylinePath(projectPoints(downsampleLttb(samples, 400), bounds, plot), false);
 */
export function downsampleLttb(points: readonly Point[], targetCount: number): Point[] {
  if (!Number.isSafeInteger(targetCount) || targetCount < MIN_TARGET_COUNT) {
    throw new RangeError(`targetCount must be an integer of at least ${MIN_TARGET_COUNT}, got ${targetCount}`);
  }
  const [first] = points;
  const [last] = points.slice(-1);
  if (first === undefined || last === undefined || points.length <= targetCount) {
    return [...points];
  }
  // The inner points are split into `targetCount - 2` buckets; the first and last points stand alone.
  const bucketSize = (points.length - 2) / (targetCount - 2);
  const result: Point[] = [first];
  let previous = first;
  for (let bucket = 0; bucket < targetCount - 2; bucket++) {
    const start = Math.floor(bucket * bucketSize) + 1;
    const end = Math.floor((bucket + 1) * bucketSize) + 1;
    // The average of the next bucket; the last point after the last bucket.
    const nextEnd = Math.min(Math.floor((bucket + 2) * bucketSize) + 1, points.length - 1);
    const next = averagePoint(points.slice(end, nextEnd)) ?? last;
    let selected = previous;
    let maxArea = -1;
    for (const point of points.slice(start, end)) {
      // Twice the area of the triangle (previous, point, next): the factor does not change the maximum.
      const area = Math.abs(
        (previous.x - next.x) * (point.y - previous.y) - (previous.x - point.x) * (next.y - previous.y),
      );
      if (area > maxArea) {
        maxArea = area;
        selected = point;
      }
    }
    result.push(selected);
    previous = selected;
  }
  result.push(last);
  return result;
}

/**
 * Computes the centroid of a group of points.
 *
 * @param points - The points of the next bucket.
 * @returns Their average position, or `undefined` for an empty group.
 */
function averagePoint(points: readonly Point[]): Point | undefined {
  if (points.length === 0) {
    return undefined;
  }
  let sumX = 0;
  let sumY = 0;
  for (const { x, y } of points) {
    sumX += x;
    sumY += y;
  }
  return { x: sumX / points.length, y: sumY / points.length };
}
