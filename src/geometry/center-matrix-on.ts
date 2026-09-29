import type { Matrix2D } from './matrix-2d.ts';
import type { Point } from './point.ts';

/**
 * Moves an element so that one of its local points lands on a target in the parent coordinates, keeping its
 * rotation, flip and scale: recenters a symbol drawn off-center, snaps a label anchor to a position.
 *
 * @param matrix - The current transform of the element.
 * @param pivot - The local point to place, such as the center of its bounding box.
 * @param target - Where the pivot must be drawn, in the parent coordinates.
 * @returns The moved transform.
 * @example
 * centerMatrixOn(parseTransform('rotate(30)') ?? createIdentityMatrix(), { x: 10, y: 10 }, { x: 200, y: 100 });
 * // still rotated by 30°, local (10, 10) now drawn at (200, 100)
 */
export function centerMatrixOn(matrix: Matrix2D, pivot: Point, target: Point): Matrix2D {
  const { a, b, c, d } = matrix;
  return { a, b, c, d, e: target.x - (a * pivot.x + c * pivot.y), f: target.y - (b * pivot.x + d * pivot.y) };
}
