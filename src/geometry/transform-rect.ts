import type { Matrix2D } from './matrix-2d.ts';
import type { Rect } from './rect.ts';
import { transformPoint } from './transform-point.ts';

/**
 * Computes the axis-aligned box that a transformed rectangle occupies: the on-screen box of a symbol that
 * users may have rotated, flipped or scaled. Place decorations relative to this box (with `placeRect`) and
 * they stay at the same visual spot, whatever the transform of the symbol.
 *
 * @param rect - The rectangle in its local space, such as `element.getBBox()`.
 * @param matrix - The transform of that space, such as the result of `parseTransform` or `getCTM()`.
 * @returns The smallest axis-aligned rectangle containing the four transformed corners.
 * @example
 * // a 40 × 20 symbol rotated by 90° around its origin
 * transformRect({ x: 0, y: 0, width: 40, height: 20 }, rotationMatrix(90, { x: 0, y: 0 })); // { x: -20, y: 0, width: 20, height: 40 }
 */
export function transformRect(rect: Rect, matrix: Matrix2D): Rect {
  const right = rect.x + rect.width;
  const bottom = rect.y + rect.height;
  const corners = [
    transformPoint({ x: rect.x, y: rect.y }, matrix),
    transformPoint({ x: right, y: rect.y }, matrix),
    transformPoint({ x: right, y: bottom }, matrix),
    transformPoint({ x: rect.x, y: bottom }, matrix),
  ];
  const xs = corners.map((corner) => corner.x);
  const ys = corners.map((corner) => corner.y);
  const left = Math.min(...xs);
  const top = Math.min(...ys);
  return { x: left, y: top, width: Math.max(...xs) - left, height: Math.max(...ys) - top };
}
