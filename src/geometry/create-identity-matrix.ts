import type { Matrix2D } from './matrix-2d.ts';

/**
 * Creates the identity transform: points are left unchanged. The starting point of a transform built step
 * by step.
 *
 * @returns `matrix(1 0 0 1 0 0)`.
 * @example
 * createIdentityMatrix(); // { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
 */
export function createIdentityMatrix(): Matrix2D {
  return { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
}
