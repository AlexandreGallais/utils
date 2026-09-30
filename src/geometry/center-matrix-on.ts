import type { Matrix2D } from './matrix-2d';
import type { Point } from './point';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };
/** The identity matrix: no transform, when none is given. */
const IDENTITY = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

/**
 * Moves an element so that one of its local points lands on a target in the parent coordinates, keeping its
 * rotation, flip and scale: recenters a symbol drawn off-center, snaps a label anchor to a position.
 *
 * @param matrix - The current transform of the element. Defaults to the identity matrix.
 * @param pivot - The local point to place, such as the center of its bounding box. Defaults to the origin `{ x: 0, y: 0
 * }`.
 * @param target - Where the pivot must be drawn, in the parent coordinates. Defaults to the origin `{ x: 0, y: 0 }`.
 * @returns The moved transform.
 * @example
 * centerMatrixOn(parseTransform('rotate(30)') ?? createIdentityMatrix(), { x: 10, y: 10 }, { x: 200, y: 100 });
 * // still rotated by 30°, local (10, 10) now drawn at (200, 100)
 */
export function centerMatrixOn(matrix?: Matrix2D | null, pivot?: Point | null, target?: Point | null): Matrix2D {
  const resolvedMatrix = matrix ?? IDENTITY;
  const resolvedPivot = pivot ?? ORIGIN;
  const resolvedTarget = target ?? ORIGIN;
  const { a, b, c, d } = resolvedMatrix;
  return {
    a,
    b,
    c,
    d,
    e: resolvedTarget.x - (a * resolvedPivot.x + c * resolvedPivot.y),
    f: resolvedTarget.y - (b * resolvedPivot.x + d * resolvedPivot.y),
  };
}
