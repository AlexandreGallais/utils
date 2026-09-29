/**
 * Accelerates then decelerates along a sine curve: the gentlest ease, for pulses and breathing effects.
 *
 * @param progress - Linear progress of the animation, in [0, 1].
 * @returns Eased progress: 0 at the start, 1 at the end.
 * @example
 * startTween(clock, { from: 0, to: 100, durationMs: 300, easing: easeInOutSine, onUpdate: render });
 */
export function easeInOutSine(progress: number): number {
  return (1 - Math.cos(Math.PI * progress)) / 2;
}
