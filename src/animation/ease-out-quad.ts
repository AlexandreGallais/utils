/**
 * Starts fast and decelerates (quadratic): an object coming to rest, the most natural for UI movements.
 *
 * @param progress - Linear progress of the animation, in [0, 1].
 * @returns Eased progress: 0 at the start, 1 at the end.
 * @example
 * startTween(clock, { from: 0, to: 100, durationMs: 300, easing: easeOutQuad, onUpdate: render });
 */
export function easeOutQuad(progress: number): number {
  return progress * (2 - progress);
}
