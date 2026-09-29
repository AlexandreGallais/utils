import type { Matrix2D } from './matrix-2d.ts';

/**
 * Composes two transforms, in the order of an SVG `transform` list: `multiplyMatrices(m1, m2)` is
 * `transform="m1 m2"`, where `m2` applies first (in the local space) and `m1` then.
 *
 * @param m1 - Outer transform, applied last.
 * @param m2 - Inner transform, applied first.
 * @returns The combined transform.
 * @example
 * // translate(100 0) then, inside it, scale(2): a point (1, 1) lands on (102, 2)
 * multiplyMatrices(createTranslationMatrix(100, 0), createScaleMatrix(2, 2, { x: 0, y: 0 })); // { a: 2, b: 0, c: 0, d: 2, e: 100, f: 0 }
 */
export function multiplyMatrices(m1: Matrix2D, m2: Matrix2D): Matrix2D {
  return {
    a: m1.a * m2.a + m1.c * m2.b,
    b: m1.b * m2.a + m1.d * m2.b,
    c: m1.a * m2.c + m1.c * m2.d,
    d: m1.b * m2.c + m1.d * m2.d,
    e: m1.a * m2.e + m1.c * m2.f + m1.e,
    f: m1.b * m2.e + m1.d * m2.f + m1.f,
  };
}
