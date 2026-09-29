// Animations driven by a shared clock: easing curves, tweens, blinking with a rest state.

export type { EasingFunction } from './easing-function.ts';
export { easeInOutCubic } from './ease-in-out-cubic.ts';
export { easeInOutQuad } from './ease-in-out-quad.ts';
export { easeInOutSine } from './ease-in-out-sine.ts';
export { easeInQuad } from './ease-in-quad.ts';
export { easeOutCubic } from './ease-out-cubic.ts';
export { easeOutQuad } from './ease-out-quad.ts';
export { linear } from './linear.ts';
export type { AnimationOptions } from './animation-options.ts';
export { startAnimation } from './start-animation.ts';
export { startTween } from './start-tween.ts';
export type { TweenOptions } from './tween-options.ts';
export type { BlinkOptions } from './blink-options.ts';
export { startBlink } from './start-blink.ts';
export { startBlinkSimple } from './start-blink-simple.ts';
export { startAnimationSimple } from './start-animation-simple.ts';
