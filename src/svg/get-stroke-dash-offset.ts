import { clamp } from '../math';

/**
 * Computes the `stroke-dashoffset` that shows only the first part of a stroke, with
 * `stroke-dasharray` set to the path length: a progress ring filling up, a line drawing itself, a
 * countdown arc. Animate `progress` to animate the drawing.
 *
 * @param pathLength - Length of the path, such as `path.getTotalLength()` or `getArcLength(…)`.
 * @param progress - Visible part of the stroke, from 0 (hidden) to 1 (complete); clamped. Defaults to `0`.
 * @returns The offset to set on `stroke-dashoffset`.
 * @example
 * ring.setAttribute('stroke-dasharray', String(length));
 * ring.setAttribute('stroke-dashoffset', String(getStrokeDashOffset(length, 0.75))); // 75 % drawn
 */
export function getStrokeDashOffset(pathLength: number, progress?: number | null): number {
  const resolvedProgress = progress ?? 0;
  return pathLength * (1 - clamp(resolvedProgress, 0, 1));
}
