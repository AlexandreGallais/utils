import { clamp } from '../math/clamp.ts';

/**
 * Computes the `stroke-dashoffset` that shows only the first part of a stroke, with
 * `stroke-dasharray` set to the path length: a progress ring filling up, a line drawing itself, a
 * countdown arc. Animate `progress` to animate the drawing.
 *
 * @param pathLength - Length of the path, such as `path.getTotalLength()` or `getArcLength(…)`.
 * @param progress - Visible part of the stroke, from 0 (hidden) to 1 (complete); clamped.
 * @returns The offset to set on `stroke-dashoffset`.
 * @example
 * ring.setAttribute('stroke-dasharray', String(length));
 * ring.setAttribute('stroke-dashoffset', String(getStrokeDashOffset(length, 0.75))); // 75 % drawn
 */
export function getStrokeDashOffset(pathLength: number, progress: number): number {
  return pathLength * (1 - clamp(progress, 0, 1));
}
