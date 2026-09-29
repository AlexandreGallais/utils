/** Exponent of a cubic curve. */
const CUBIC = 3;
/** Middle of the animation, where the curve switches from easing in to easing out. */
const HALF = 0.5;

/**
 * Accelerates then decelerates more strongly than `easeInOutQuad` (cubic).
 *
 * @param progress - Linear progress of the animation, in [0, 1].
 * @returns Eased progress: 0 at the start, 1 at the end.
 * @example
 * startTween(clock, { from: 0, to: 100, durationMs: 300, easing: easeInOutCubic, onUpdate: render });
 */
export function easeInOutCubic(progress: number): number {
  return progress < HALF ? (2 * progress) ** CUBIC / 2 : 1 - (2 - 2 * progress) ** CUBIC / 2;
}
