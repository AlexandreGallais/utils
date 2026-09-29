// Shared clock and synchronized animations (blinking, phases, CSS animation delays).

export { Clock } from './clock.ts';
export type { ClockOptions } from './clock-options.ts';
export type { ClockTick } from './clock-tick.ts';
export { getAnimationPhase } from './get-animation-phase.ts';
export { getSyncedAnimationDelay } from './get-synced-animation-delay.ts';
export { isBlinkOn } from './is-blink-on.ts';
export type { TickSource } from './tick-source.ts';
export { getSyncedAnimationDelaySimple } from './get-synced-animation-delay-simple.ts';
export { isBlinkOnSimple } from './is-blink-on-simple.ts';
