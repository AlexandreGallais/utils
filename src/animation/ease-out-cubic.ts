/** Exponent of a cubic curve. */
const CUBIC = 3;

/**
 * Starts fast and decelerates more strongly than `easeOutQuad` (cubic): a needle settling on its value.
 *
 * @param progress - Linear progress of the animation, in [0, 1].
 * @returns Eased progress: 0 at the start, 1 at the end.
 * @example
 * startTween(clock, { from: 0, to: 100, durationMs: 300, easing: easeOutCubic, onUpdate: render });
 */
export function easeOutCubic(progress: number): number {
  return 1 - (1 - progress) ** CUBIC;
}
