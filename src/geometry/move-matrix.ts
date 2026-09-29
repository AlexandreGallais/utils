import type { Matrix2D } from './matrix-2d.ts';

/**
 * Moves an element by an offset in the parent (screen) coordinates, whatever its rotation, flip or scale:
 * `moveMatrix(m, 10, 0)` always moves it 10 units to the right on screen.
 *
 * @param matrix - The current transform of the element.
 * @param dx - Horizontal offset in the parent coordinates, positive to the right.
 * @param dy - Vertical offset in the parent coordinates, positive downwards.
 * @returns The moved transform.
 * @example
 * moveMatrix(parseTransform('rotate(90)') ?? createIdentityMatrix(), 10, 0); // rotate(90) drawn 10 units to the right
 */
export function moveMatrix(matrix: Matrix2D, dx: number, dy: number): Matrix2D {
  return { a: matrix.a, b: matrix.b, c: matrix.c, d: matrix.d, e: matrix.e + dx, f: matrix.f + dy };
}
