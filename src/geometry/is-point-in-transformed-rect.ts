import { invertMatrix } from './invert-matrix.ts';
import type { Matrix2D } from './matrix-2d.ts';
import type { Point } from './point.ts';
import { rectContainsPoint } from './rect-contains-point.ts';
import type { Rect } from './rect.ts';
import { transformPoint } from './transform-point.ts';

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
  return inverse !== undefined && rectContainsPoint(rect, transformPoint(point, inverse));
}
