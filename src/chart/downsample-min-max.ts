import type { Point } from '../geometry';

/**
 * Reduces a long series to at most two points per bucket, its lowest and highest, so that a line drawn
 * through the result shows the same peaks as the full series: typically one bucket per pixel column, to
 * draw 100 000 samples on an 800 px wide chart at every refresh.
 *
 * @param points - The series, sorted by ascending `x`.
 * @param bucketCount - Number of groups of consecutive points, such as the width of the chart in pixels.
 * @returns A new array with the kept points, in their original order; a copy when the series already has
 * no more than two points per bucket.
 * @throws {RangeError} When `bucketCount` is not a positive integer.
 * @example
 * downsampleMinMax(samples, plotWidth);
 */
export function downsampleMinMax(points: readonly Point[], bucketCount: number): Point[] {
  if (!Number.isSafeInteger(bucketCount) || bucketCount < 1) {
    throw new RangeError(`bucketCount must be a positive integer, got ${bucketCount}`);
  }
  if (points.length <= bucketCount * 2) {
    return [...points];
  }
  const bucketSize = points.length / bucketCount;
  const result: Point[] = [];
  for (let bucket = 0; bucket < bucketCount; bucket++) {
    const bucketStart = Math.floor(bucket * bucketSize);
    const bucketEnd = Math.floor((bucket + 1) * bucketSize);
    let minIndex = bucketStart;
    let maxIndex = bucketStart;
    let min = Infinity;
    let max = -Infinity;
    for (const [offset, { y }] of points.slice(bucketStart, bucketEnd).entries()) {
      if (y < min) {
        min = y;
        minIndex = bucketStart + offset;
      }
      if (y > max) {
        max = y;
        maxIndex = bucketStart + offset;
      }
    }
    result.push(...points.slice(Math.min(minIndex, maxIndex), Math.min(minIndex, maxIndex) + 1));
    if (maxIndex !== minIndex) {
      result.push(...points.slice(Math.max(minIndex, maxIndex), Math.max(minIndex, maxIndex) + 1));
    }
  }
  return result;
}
