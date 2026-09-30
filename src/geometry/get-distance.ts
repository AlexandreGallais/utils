import type { Point } from './point';

/**
 * Computes the straight-line (Euclidean) distance between two points.
 *
 * @param a - A point.
 * @param b - Another point.
 * @returns The distance, never negative.
 * @example
 * getDistance({ x: 0, y: 0 }, { x: 3, y: 4 }); // 5
 */
export function getDistance(a: Point, b: Point): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}
