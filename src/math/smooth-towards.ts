/**
 * Moves a value towards a target with exponential smoothing, whatever the frame rate: about 63 % of the
 * distance is covered every `timeConstantMs`. Smooths a needle fed by noisy values.
 *
 * @param current - The displayed value.
 * @param target - The latest value.
 * @param deltaMs - The time elapsed since the previous call, in milliseconds.
 * @param timeConstantMs - The time constant, in milliseconds; `0` returns `target`.
 * @returns The new displayed value.
 * @example
 * needle = smoothTowards(needle, speed, deltaMs, 150);
 */
export function smoothTowards(current: number, target: number, deltaMs: number, timeConstantMs: number): number {
  if (timeConstantMs <= 0) {
    return target;
  }
  return target + (current - target) * Math.exp(-deltaMs / timeConstantMs);
}
