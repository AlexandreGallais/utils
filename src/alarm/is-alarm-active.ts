import type { AlarmState } from './alarm-state.ts';

/**
 * Checks whether the condition of an alarm is on, acknowledged or not: the alarms to count in a banner or
 * to keep in the active list.
 *
 * @param state - The state to test, as returned by `updateAlarmState`.
 * @returns `true` for `'active-unacknowledged'` and `'active-acknowledged'`.
 * @example
 * const activeCount = alarms.filter(({ state }) => isAlarmActive(state)).length;
 */
export function isAlarmActive(state: AlarmState): boolean {
  return state === 'active-unacknowledged' || state === 'active-acknowledged';
}
