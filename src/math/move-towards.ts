const MS_PER_SECOND = 1000;

/**
 * Moves a value towards a target at a limited rate (a slew-rate limiter), whatever the frame rate: a needle
 * or a rudder that cannot jump.
 *
 * @param current - The current value.
 * @param target - The value to reach.
 * @param maxRatePerSecond - The largest change per second.
 * @param deltaMs - The time elapsed since the previous call, in milliseconds.
 * @returns The new value, never beyond `target`.
 * @example
 * moveTowards(0, 10, 5, 1000); // 5
 * moveTowards(8, 10, 5, 1000); // 10
 */
export function moveTowards(current: number, target: number, maxRatePerSecond: number, deltaMs: number): number {
  const maxStep = (maxRatePerSecond * deltaMs) / MS_PER_SECOND;
  const difference = target - current;
  return Math.abs(difference) <= maxStep ? target : current + Math.sign(difference) * maxStep;
}
