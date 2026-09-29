import { remap } from '../math/remap.ts';

/**
 * Converts a value to the angle of a round gauge's needle: `min` sits at `startAngle`, `max` at `endAngle`
 * (library convention: 0° up, clockwise). Out-of-range values stop at the ends of the scale by default.
 *
 * @param value - The value to show.
 * @param min - Value at the start of the scale.
 * @param max - Value at the end of the scale.
 * @param startAngle - Angle of `min`, in degrees.
 * @param endAngle - Angle of `max`, in degrees.
 * @param shouldClamp - Whether to stop the needle at the ends instead of extrapolating.
 * @returns The angle in degrees, to use with `polarToCartesian` or a `rotate()` transform.
 * @example
 * // 270° gauge from 0 to 30 kn
 * needle.setAttribute('transform', `rotate(${valueToAngle(15, 0, 30, -135, 135)} 50 50)`); // rotate(0 50 50)
 */
export function valueToAngle(
  value: number,
  min: number,
  max: number,
  startAngle: number,
  endAngle: number,
  shouldClamp = true,
): number {
  return remap(value, min, max, startAngle, endAngle, shouldClamp);
}
