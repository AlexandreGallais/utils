import { remap } from '../math';

/** End angle when none is given: a full turn. */
const FULL_TURN = 360;

/**
 * Converts a value to the angle of a round gauge's needle: `min` sits at `startAngle`, `max` at `endAngle`
 * (library convention: 0° up, clockwise). Out-of-range values stop at the ends of the scale when clamped.
 *
 * @param value - The value to show.
 * @param min - Value at the start of the scale. Defaults to `0`.
 * @param max - Value at the end of the scale. Defaults to `1`.
 * @param startAngle - Angle of `min`, in degrees. Defaults to `0`.
 * @param endAngle - Angle of `max`, in degrees. Defaults to `360`.
 * @param shouldClamp - Whether to stop the needle at the ends instead of extrapolating. Defaults to `true`.
 * @returns The angle in degrees, to use with `polarToCartesian` or a `rotate()` transform.
 * @example
 * // 270° gauge from 0 to 30 kn
 * needle.setAttribute('transform', `rotate(${valueToAngle(15, 0, 30, -135, 135, true)} 50 50)`); // rotate(0 50 50)
 */
export function valueToAngle(
  value: number,
  min?: number | null,
  max?: number | null,
  startAngle?: number | null,
  endAngle?: number | null,
  shouldClamp?: boolean | null,
): number {
  const resolvedMin = min ?? 0;
  const resolvedMax = max ?? 1;
  const resolvedStartAngle = startAngle ?? 0;
  const resolvedEndAngle = endAngle ?? FULL_TURN;
  const resolvedShouldClamp = shouldClamp ?? true;
  return remap(value, resolvedMin, resolvedMax, resolvedStartAngle, resolvedEndAngle, resolvedShouldClamp);
}
