import type { AlarmState } from './alarm-state';

/**
 * Checks whether an alarm waits for an acknowledgement: the states that blink (with `isBlinkOn` or
 * `startBlink`) and sound the horn.
 *
 * @param state - The state to test, as returned by `updateAlarmState`.
 * @returns `true` for `'active-unacknowledged'` and `'cleared-unacknowledged'`.
 * @example
 * const isVisible = !isAlarmUnacknowledged(state) || isBlinkOn(timestamp, 1000, 0.5);
 */
export function isAlarmUnacknowledged(state: AlarmState): boolean {
  return state === 'active-unacknowledged' || state === 'cleared-unacknowledged';
}
