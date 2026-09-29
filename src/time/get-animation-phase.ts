/**
 * Computes the position within a repeating animation cycle at a given time, on a shared timeline. Elements
 * animated from the same time source (such as `performance.now()`) stay in phase: use it for synchronized
 * pulses, fades or rotations.
 *
 * @param timeMs - Current time on the shared timeline, in milliseconds.
 * @param periodMs - Duration of a cycle, in milliseconds; a positive number.
 * @returns The phase, in [0, 1[: `0` at the start of each cycle.
 * @throws {RangeError} When `periodMs` is not a positive finite number.
 * @example
 * const phase = getAnimationPhase(performance.now(), 2000);
 * symbol.style.opacity = String(0.5 + 0.5 * Math.cos(phase * 2 * Math.PI)); // synchronized pulse
 */
export function getAnimationPhase(timeMs: number, periodMs: number): number {
  if (!Number.isFinite(periodMs) || periodMs <= 0) {
    throw new RangeError(`periodMs must be a positive finite number, got ${periodMs}`);
  }
  // `+ 0` turns a `-0` into `0`.
  return (((timeMs % periodMs) + periodMs) % periodMs) / periodMs + 0;
}
