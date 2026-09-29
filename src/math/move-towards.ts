/** Milliseconds per second: rates are per second, time deltas in milliseconds. */
const MS_PER_SECOND = 1000;

/**
 * Moves a value towards a target without exceeding a maximum rate of change (a slew-rate limiter): a needle,
 * a rudder or a valve that cannot jump. Frame-rate independent: the step is `maxRatePerSecond × deltaMs`.
 *
 * @param current - The current value.
 * @param target - The value to reach.
 * @param maxRatePerSecond - Maximum change per second, a non-negative number.
 * @param deltaMs - Time elapsed since the previous call, in milliseconds.
 * @returns The new value: `target` once within reach, never beyond it.
 * @example
 * // rudder turning at most 5° per second
 * rudderAngle = moveTowards(rudderAngle, orderedAngle, 5, tick.deltaMs);
 */
export function moveTowards(current: number, target: number, maxRatePerSecond: number, deltaMs: number): number {
  const maxStep = (Math.abs(maxRatePerSecond) * Math.max(0, deltaMs)) / MS_PER_SECOND;
  const difference = target - current;
  return Math.abs(difference) <= maxStep ? target : current + Math.sign(difference) * maxStep;
}
