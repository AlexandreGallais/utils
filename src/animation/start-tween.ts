import { lerp } from '../math/lerp.ts';
import type { TickSource } from '../time/tick-source.ts';
import { easeOutQuad } from './ease-out-quad.ts';
import { startAnimation } from './start-animation.ts';
import type { TweenOptions } from './tween-options.ts';

/**
 * Animates a number from one value to another on a shared clock: a position, an opacity, a needle angle.
 * The movement eases out by default, like most UI transitions; the last update gives exactly `to`.
 *
 * @param clock - The tick source, such as the application's `Clock`.
 * @param options - Start and end values, duration, easing curve and callbacks.
 * @returns A function that stops the tween where it is.
 * @example
 * startTween(clock, {
 *   from: 0,
 *   to: 120,
 *   durationMs: 300,
 *   onUpdate: (x) => symbol.setAttribute('transform', `translate(${x} 0)`),
 * });
 */
export function startTween(clock: TickSource, options: TweenOptions): () => void {
  const { from, to, durationMs, easing = easeOutQuad, onUpdate, onComplete } = options;
  return startAnimation(clock, {
    durationMs,
    easing,
    onFrame: (progress) => {
      onUpdate(progress >= 1 ? to : lerp(from, to, progress));
    },
    ...(onComplete && { onComplete }),
  });
}
