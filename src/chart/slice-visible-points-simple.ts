import type { Point } from '../geometry';
import { sliceVisiblePoints } from './slice-visible-points';

/**
 * Keeps the points of a time series inside a horizontal window like `sliceVisiblePoints`, ready to draw a line to the edges.
 *
 * @param points - The series, sorted by ascending `x`.
 * @param minX - Left edge of the window.
 * @param maxX - Right edge of the window.
 * @returns A new array with the points to draw.
 * @simple The closest point outside each edge is kept.
 * @example
 * sliceVisiblePointsSimple(history, now - 60_000, now);
 */
export function sliceVisiblePointsSimple(points: readonly Point[], minX: number, maxX: number): Point[] {
  return sliceVisiblePoints(points, minX, maxX, true);
}
