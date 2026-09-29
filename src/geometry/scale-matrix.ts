import type { Matrix2D } from './matrix-2d.ts';
import type { Point } from './point.ts';

/**
 * Creates a scaling around a center, like SVG `scale(sx sy)`. A negative factor flips: `scaleMatrix(-1, 1)`
 * mirrors horizontally.
 *
 * @param sx - Horizontal factor; negative to flip horizontally.
 * @param sy - Vertical factor; negative to flip vertically. Same as `sx` when omitted.
 * @param center - Point that stays in place; the origin when omitted.
 * @returns A matrix scaling every point from `center`.
 * @example
 * scaleMatrix(2); // { a: 2, b: 0, c: 0, d: 2, e: 0, f: 0 }
 * scaleMatrix(-1, 1, { x: 50, y: 0 }); // horizontal flip around x = 50
 */
export function scaleMatrix(sx: number, sy: number = sx, center?: Point): Matrix2D {
  const cx = center?.x ?? 0;
  const cy = center?.y ?? 0;
  return { a: sx, b: 0, c: 0, d: sy, e: cx - sx * cx, f: cy - sy * cy };
}
