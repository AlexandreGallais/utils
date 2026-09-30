// Shared clock and synchronized animations (blinking, phases, CSS animation delays).

export { Clock } from './clock';
export type { ClockOptions } from './clock';
export type { ClockTick } from './clock-tick';
export { getAnimationPhase } from './get-animation-phase';
export { getSyncedAnimationDelay } from './get-synced-animation-delay';
export { isBlinkOn } from './is-blink-on';
export type { TickSource } from './tick-source';
