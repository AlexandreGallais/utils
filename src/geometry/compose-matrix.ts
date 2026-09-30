import { degreesToRadians } from '../angle';
import type { DecomposedTransform } from './decomposed-transform';
import type { Matrix2D } from './matrix-2d';

/**
 * Builds a matrix from readable steps, the inverse of `decomposeMatrix`: the same as the SVG transform
 * `translate(translateX translateY) rotate(rotation) skewX(skewX) scale(scaleX scaleY)`.
 *
 * @param transform - Translation, rotation (degrees), scales and skew (degrees).
 * @returns The equivalent `a b c d e f` values.
 * @example
 * composeMatrix({ translateX: 10, translateY: 0, rotation: 90, scaleX: 2, scaleY: 2, skewX: 0 });
 * // { a: 0, b: 2, c: -2, d: 0, e: 10, f: 0 } (rounded)
 */
export function composeMatrix(transform: DecomposedTransform): Matrix2D {
  const radians = degreesToRadians(transform.rotation);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const shear = Math.tan(degreesToRadians(transform.skewX));
  const { scaleX, scaleY } = transform;
  return {
    a: cos * scaleX,
    b: sin * scaleX,
    c: (cos * shear - sin) * scaleY,
    d: (sin * shear + cos) * scaleY,
    e: transform.translateX,
    f: transform.translateY,
  };
}
