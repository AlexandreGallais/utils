import { degreesToRadians } from '../angle/degrees-to-radians.ts';
import type { Matrix2D } from './matrix-2d.ts';
import type { Point } from './point.ts';

/**
 * Creates a rotation around a center, like SVG `rotate(angle cx cy)`: clockwise on screen for a positive
 * angle.
 *
 * @param angleDegrees - Rotation in degrees, clockwise when positive.
 * @param center - Center of the rotation, such as `{ x: 0, y: 0 }` or the center of a symbol.
 * @returns A matrix rotating every point around `center`.
 * @example
 * rotationMatrix(90, { x: 0, y: 0 }); // { a: 0, b: 1, c: -1, d: 0, e: 0, f: 0 } (rounded)
 * rotationMatrix(180, { x: 50, y: 50 }); // turns around (50, 50)
 */
export function rotationMatrix(angleDegrees: number, center: Point): Matrix2D {
  const radians = degreesToRadians(angleDegrees);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const { x: cx, y: cy } = center;
  return { a: cos, b: sin, c: -sin, d: cos, e: cx - cos * cx + sin * cy, f: cy - sin * cx - cos * cy };
}
