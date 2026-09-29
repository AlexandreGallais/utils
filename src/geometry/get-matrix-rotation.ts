import { normalizeAngle } from '../angle/normalize-angle.ts';
import { getRotationRadians } from './internal/get-rotation-radians.ts';
import type { Matrix2D } from './matrix-2d.ts';

/** Half a turn, in degrees. */
const HALF_TURN = 180;
/** Degrees per radian. */
const DEGREES_PER_RADIAN = HALF_TURN / Math.PI;

/**
 * Reads the rotation of a transform in degrees, clockwise like SVG `rotate()`. A mirrored transform is read
 * as a horizontal flip then a rotation, so `scale(-1 1)` has no rotation (a vertical flip reads as a
 * horizontal flip rotated by 180°).
 *
 * @param matrix - The transform of the element, such as the result of `parseTransform`.
 * @returns The rotation, in [0, 360[.
 * @example
 * getMatrixRotation(parseTransform('rotate(30) scale(-1 1)') ?? createIdentityMatrix()); // 30
 */
export function getMatrixRotation(matrix: Matrix2D): number {
  return normalizeAngle(getRotationRadians(matrix) * DEGREES_PER_RADIAN);
}
