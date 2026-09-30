import type { Matrix2D } from './matrix-2d';

/**
 * Creates a translation, like SVG `translate(tx ty)`.
 *
 * @param tx - Horizontal offset.
 * @param ty - Vertical offset.
 * @returns A matrix that moves every point by `(tx, ty)`.
 * @example
 * createTranslationMatrix(10, 20); // { a: 1, b: 0, c: 0, d: 1, e: 10, f: 20 }
 */
export function createTranslationMatrix(tx: number, ty: number): Matrix2D {
  return { a: 1, b: 0, c: 0, d: 1, e: tx, f: ty };
}
