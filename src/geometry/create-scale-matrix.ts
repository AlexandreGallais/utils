import type { Matrix2D } from './matrix-2d';
import type { Point } from './point';

/**
 * Creates a scaling around a center, like SVG `scale(sx sy)`. A negative factor flips: `createScaleMatrix(-1, 1, { x: 0, y: 0 })`
 * mirrors horizontally.
 *
 * @param sx - Horizontal factor; negative to flip horizontally.
 * @param sy - Vertical factor; negative to flip vertically.
 * @param center - Point that stays in place, such as `{ x: 0, y: 0 }`.
 * @returns A matrix scaling every point from `center`.
 * @example
 * createScaleMatrix(2, 2, { x: 0, y: 0 }); // { a: 2, b: 0, c: 0, d: 2, e: 0, f: 0 }
 * createScaleMatrix(-1, 1, { x: 50, y: 0 }); // horizontal flip around x = 50
 */
export function createScaleMatrix(sx: number, sy: number, center: Point): Matrix2D {
  const { x: cx, y: cy } = center;
  return { a: sx, b: 0, c: 0, d: sy, e: cx - sx * cx, f: cy - sy * cy };
}
