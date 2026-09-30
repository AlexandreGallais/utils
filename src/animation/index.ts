// Animations driven by a shared clock: easing curves, tweens, blinking with a rest state.

export type { EasingFunction } from './easing-function';
export { easeInOutCubic } from './ease-in-out-cubic';
export { easeInOutQuad } from './ease-in-out-quad';
export { easeInOutSine } from './ease-in-out-sine';
export { easeInQuad } from './ease-in-quad';
export { easeOutCubic } from './ease-out-cubic';
export { easeOutQuad } from './ease-out-quad';
export { linear } from './linear';
export type { AnimationOptions } from './start-animation';
export { startAnimation } from './start-animation';
export { startTween } from './start-tween';
export type { TweenOptions } from './start-tween';
export type { BlinkOptions } from './start-blink';
export { startBlink } from './start-blink';
export { startBlinkSimple } from './start-blink-simple';
export { startAnimationSimple } from './start-animation-simple';
