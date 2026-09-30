import type { Matrix2D } from './matrix-2d';
import type { Point } from './point';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

/**
 * Creates a scaling around a center, like SVG `scale(sx sy)`. A negative factor flips: `createScaleMatrix(-1, 1, { x:
 * 0, y: 0 })`
 * mirrors horizontally.
 *
 * @param sx - Horizontal factor; negative to flip horizontally. Defaults to `1`.
 * @param sy - Vertical factor; negative to flip vertically. Defaults to `sx` (a uniform scale).
 * @param center - Point that stays in place, such as `{ x: 0, y: 0 }`. Defaults to the origin `{ x: 0, y: 0 }`.
 * @returns A matrix scaling every point from `center`.
 * @example
 * createScaleMatrix(2, 2, { x: 0, y: 0 }); // { a: 2, b: 0, c: 0, d: 2, e: 0, f: 0 }
 * createScaleMatrix(-1, 1, { x: 50, y: 0 }); // horizontal flip around x = 50
 */
export function createScaleMatrix(sx?: number | null, sy?: number | null, center?: Point | null): Matrix2D {
  const resolvedSx = sx ?? 1;
  const resolvedSy = sy ?? sx ?? 1;
  const resolvedCenter = center ?? ORIGIN;
  const { x: cx, y: cy } = resolvedCenter;
  return { a: resolvedSx, b: 0, c: 0, d: resolvedSy, e: cx - resolvedSx * cx, f: cy - resolvedSy * cy };
}
