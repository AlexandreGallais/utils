import { degreesToRadians } from '../angle';
import type { Matrix2D } from './matrix-2d';
import type { Point } from './point';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

/**
 * Creates a rotation around a center, like SVG `rotate(angle cx cy)`: clockwise on screen for a positive
 * angle.
 *
 * @param angleDegrees - Rotation in degrees, clockwise when positive. Defaults to `0`.
 * @param center - Center of the rotation, such as `{ x: 0, y: 0 }` or the center of a symbol. Defaults to the origin `{
 * x: 0, y: 0 }`.
 * @returns A matrix rotating every point around `center`.
 * @example
 * createRotationMatrix(90, { x: 0, y: 0 }); // { a: 0, b: 1, c: -1, d: 0, e: 0, f: 0 } (rounded)
 * createRotationMatrix(180, { x: 50, y: 50 }); // turns around (50, 50)
 */
export function createRotationMatrix(angleDegrees?: number | null, center?: Point | null): Matrix2D {
  const resolvedAngleDegrees = angleDegrees ?? 0;
  const resolvedCenter = center ?? ORIGIN;
  const radians = degreesToRadians(resolvedAngleDegrees);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const { x: cx, y: cy } = resolvedCenter;
  return { a: cos, b: sin, c: -sin, d: cos, e: cx - cos * cx + sin * cy, f: cy - sin * cx - cos * cy };
}
