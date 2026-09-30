import { lerp } from './lerp';

/**
 * Moves a value towards a target with frame-rate independent exponential smoothing: about 63 % of the
 * distance is covered every `timeConstantMs`, whatever the refresh rate (unlike a fixed
 * `lerp(current, target, 0.1)` per frame). Use it to smooth a gauge needle fed by noisy values.
 *
 * @param current - The displayed value.
 * @param target - The latest measured value.
 * @param deltaMs - Time elapsed since the previous call, in milliseconds.
 * @param timeConstantMs - Smoothing time constant, in milliseconds; `0` or less returns `target` directly.
 * @returns The new displayed value.
 * @example
 * needle = smoothTowards(needle, speed, deltaMs, 150);
 */
export function smoothTowards(current: number, target: number, deltaMs: number, timeConstantMs: number): number {
  return timeConstantMs <= 0 ? target : lerp(current, target, 1 - Math.exp(-deltaMs / timeConstantMs));
}
