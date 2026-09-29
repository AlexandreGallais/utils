/**
 * Keeps a constant speed: the value moves as fast as time.
 *
 * @param progress - Linear progress of the animation, in [0, 1].
 * @returns Eased progress: 0 at the start, 1 at the end.
 * @example
 * startTween(clock, { from: 0, to: 100, durationMs: 300, easing: linear, onUpdate: render });
 */
export function linear(progress: number): number {
  return progress;
}
