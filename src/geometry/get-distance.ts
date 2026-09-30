import type { Point } from './point';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

/**
 * Computes the straight-line (Euclidean) distance between two points.
 *
 * @param a - A point. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param b - Another point. Defaults to the origin `{ x: 0, y: 0 }`.
 * @returns The distance, never negative.
 * @example
 * getDistance({ x: 0, y: 0 }, { x: 3, y: 4 }); // 5
 */
export function getDistance(a?: Point | null, b?: Point | null): number {
  const resolvedA = a ?? ORIGIN;
  const resolvedB = b ?? ORIGIN;
  return Math.hypot(resolvedB.x - resolvedA.x, resolvedB.y - resolvedA.y);
}
