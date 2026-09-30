import type { Matrix2D } from './matrix-2d';

/**
 * Creates a translation, like SVG `translate(tx ty)`.
 *
 * @param tx - Horizontal offset. Defaults to `0`.
 * @param ty - Vertical offset. Defaults to `0`.
 * @returns A matrix that moves every point by `(tx, ty)`.
 * @example
 * createTranslationMatrix(10, 20); // { a: 1, b: 0, c: 0, d: 1, e: 10, f: 20 }
 */
export function createTranslationMatrix(tx?: number | null, ty?: number | null): Matrix2D {
  const resolvedTx = tx ?? 0;
  const resolvedTy = ty ?? 0;
  return { a: 1, b: 0, c: 0, d: 1, e: resolvedTx, f: resolvedTy };
}
