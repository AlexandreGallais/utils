import type { Matrix2D } from './matrix-2d';

/** The identity matrix: no transform, when none is given. */
const IDENTITY = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

/**
 * Moves an element by an offset in the parent (screen) coordinates, whatever its rotation, flip or scale:
 * `moveMatrix(m, 10, 0)` always moves it 10 units to the right on screen.
 *
 * @param matrix - The current transform of the element. Defaults to the identity matrix.
 * @param dx - Horizontal offset in the parent coordinates, positive to the right. Defaults to `0`.
 * @param dy - Vertical offset in the parent coordinates, positive downwards. Defaults to `0`.
 * @returns The moved transform.
 * @example
 * moveMatrix(parseTransform('rotate(90)') ?? createIdentityMatrix(), 10, 0); // rotate(90) drawn 10 units to the right
 */
export function moveMatrix(matrix?: Matrix2D | null, dx?: number | null, dy?: number | null): Matrix2D {
  const resolvedMatrix = matrix ?? IDENTITY;
  const resolvedDx = dx ?? 0;
  const resolvedDy = dy ?? 0;
  return {
    a: resolvedMatrix.a,
    b: resolvedMatrix.b,
    c: resolvedMatrix.c,
    d: resolvedMatrix.d,
    e: resolvedMatrix.e + resolvedDx,
    f: resolvedMatrix.f + resolvedDy,
  };
}
