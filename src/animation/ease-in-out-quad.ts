/** Middle of the animation, where the curve switches from easing in to easing out. */
const HALF = 0.5;

/**
 * Accelerates then decelerates (quadratic): a move between two positions.
 *
 * @param progress - Linear progress of the animation, in [0, 1].
 * @returns Eased progress: 0 at the start, 1 at the end.
 * @example
 * startTween(clock, { from: 0, to: 100, durationMs: 300, easing: easeInOutQuad, onUpdate: render });
 */
export function easeInOutQuad(progress: number): number {
  return progress < HALF ? 2 * progress * progress : 1 - (2 - 2 * progress) ** 2 / 2;
}
