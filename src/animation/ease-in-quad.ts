/**
 * Starts slowly and accelerates (quadratic): an object leaving its rest position.
 *
 * @param progress - Linear progress of the animation, in [0, 1].
 * @returns Eased progress: 0 at the start, 1 at the end.
 * @example
 * startTween(clock, { from: 0, to: 100, durationMs: 300, easing: easeInQuad, onUpdate: render });
 */
export function easeInQuad(progress: number): number {
  return progress * progress;
}
