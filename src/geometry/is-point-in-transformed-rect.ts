import { invertMatrix } from './invert-matrix';
import type { Matrix2D } from './matrix-2d';
import type { Point } from './point';
import { isPointInRect } from './is-point-in-rect';
import type { Rect } from './rect';
import { transformPoint } from './transform-point';

/**
 * Checks whether a point hits a rectangle drawn with a transform (rotated, flipped, scaled): the click test
 * of a rotated symbol. The point is brought back into the local coordinates of the rectangle, where the
 * test is a plain bounds check.
 *
 * @param point - The tested position, in the coordinates the transform maps to (the parent or the screen).
 * @param rect - The rectangle in its own coordinates, before the transform.
 * @param matrix - The transform of the rectangle, such as the result of `parseTransform` or `composeMatrix`.
 * @returns `true` when the point is inside or on the edge; `false` for a flattened (non-invertible) transform.
 * @example
 * isPointInTransformedRect(click, { x: -20, y: -10, width: 40, height: 20 }, parseTransform('rotate(90)'));
 */
export function isPointInTransformedRect(point: Point, rect: Rect, matrix: Matrix2D): boolean {
  const inverse = invertMatrix(matrix);
  return inverse !== undefined && isPointInRect(transformPoint(point, inverse), rect);
}
