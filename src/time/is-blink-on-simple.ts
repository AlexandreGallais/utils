import { isBlinkOn } from './is-blink-on';

/** Fraction of the period spent on: half. */
const DUTY_CYCLE = 0.5;

/**
 * Tells whether a blinking element is on at a given time, like `isBlinkOn`, on half of the period.
 *
 * @param timeMs - The shared time, such as the `timestamp` of a clock tick.
 * @param periodMs - Duration of one on-off cycle, in milliseconds.
 * @returns `true` during the first half of each period.
 * @simple Duty cycle of 50 %.
 * @example
 * alarm.classList.toggle('on', isBlinkOnSimple(tick.timestamp, 1000));
 */
export function isBlinkOnSimple(timeMs: number, periodMs: number): boolean {
  return isBlinkOn(timeMs, periodMs, DUTY_CYCLE);
}
