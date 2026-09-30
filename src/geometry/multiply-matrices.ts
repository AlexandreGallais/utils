import type { Matrix2D } from './matrix-2d';

/** The identity matrix: no transform, when none is given. */
const IDENTITY = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

/**
 * Composes two transforms, in the order of an SVG `transform` list: `multiplyMatrices(m1, m2)` is
 * `transform="m1 m2"`, where `m2` applies first (in the local space) and `m1` then.
 *
 * @param m1 - Outer transform, applied last. Defaults to the identity matrix.
 * @param m2 - Inner transform, applied first. Defaults to the identity matrix.
 * @returns The combined transform.
 * @example
 * // translate(100 0) then, inside it, scale(2): a point (1, 1) lands on (102, 2)
 * multiplyMatrices(createTranslationMatrix(100, 0), createScaleMatrix(2, 2, { x: 0, y: 0 })); // { a: 2, b: 0, c: 0, d:
 * 2, e: 100, f: 0 }
 */
export function multiplyMatrices(m1?: Matrix2D | null, m2?: Matrix2D | null): Matrix2D {
  const resolvedM1 = m1 ?? IDENTITY;
  const resolvedM2 = m2 ?? IDENTITY;
  return {
    a: resolvedM1.a * resolvedM2.a + resolvedM1.c * resolvedM2.b,
    b: resolvedM1.b * resolvedM2.a + resolvedM1.d * resolvedM2.b,
    c: resolvedM1.a * resolvedM2.c + resolvedM1.c * resolvedM2.d,
    d: resolvedM1.b * resolvedM2.c + resolvedM1.d * resolvedM2.d,
    e: resolvedM1.a * resolvedM2.e + resolvedM1.c * resolvedM2.f + resolvedM1.e,
    f: resolvedM1.b * resolvedM2.e + resolvedM1.d * resolvedM2.f + resolvedM1.f,
  };
}
