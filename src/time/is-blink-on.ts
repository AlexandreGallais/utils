import { getAnimationPhase } from './get-animation-phase';

/**
 * Tells whether a blinking element is visible at a given time. Every element computing its state from the
 * same time source (such as `performance.now()` or the time of a shared clock tick) blinks in phase, without
 * sharing any state: backgrounds, wires and SVG symbols switch at the same instant.
 *
 * @param timeMs - Current time on the shared timeline, in milliseconds.
 * @param periodMs - Duration of a full on/off cycle, in milliseconds; a positive number.
 * @param dutyCycle - Fraction of the period during which the element is on, in [0, 1].
 * @returns `true` during the "on" part of the cycle.
 * @throws {RangeError} When `periodMs` is not a positive finite number.
 * @example
 * const isVisible = isBlinkOn(performance.now(), 1000, 0.5); // on for 500 ms, off for 500 ms
 * alarm.style.visibility = isVisible ? 'visible' : 'hidden';
 */
export function isBlinkOn(timeMs: number, periodMs: number, dutyCycle: number): boolean {
  return getAnimationPhase(timeMs, periodMs) < dutyCycle;
}
