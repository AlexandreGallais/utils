import type { AlarmState } from './alarm-state';

/** The state of an alarm on and not seen yet. */
const ACTIVE_UNACKNOWLEDGED = 'active-unacknowledged';
/** The state of an alarm off and not seen. */
const CLEARED_UNACKNOWLEDGED = 'cleared-unacknowledged';

/** The next state when the condition is on, by current state. */
const WHEN_ACTIVE: Readonly<Record<AlarmState, AlarmState>> = {
  normal: ACTIVE_UNACKNOWLEDGED,
  [ACTIVE_UNACKNOWLEDGED]: ACTIVE_UNACKNOWLEDGED,
  'active-acknowledged': 'active-acknowledged',
  [CLEARED_UNACKNOWLEDGED]: ACTIVE_UNACKNOWLEDGED,
};

/** The next state when the condition is off, by current state. */
const WHEN_INACTIVE: Readonly<Record<AlarmState, AlarmState>> = {
  normal: 'normal',
  [ACTIVE_UNACKNOWLEDGED]: CLEARED_UNACKNOWLEDGED,
  'active-acknowledged': 'normal',
  [CLEARED_UNACKNOWLEDGED]: CLEARED_UNACKNOWLEDGED,
};

/**
 * Moves an alarm to its next state when its condition is evaluated: an alarm that goes off before being
 * acknowledged stays visible until someone acknowledges it, so a short event is never missed. Pure, to use
 * in a `computed` or a reducer at every refresh.
 *
 * @param state - The current state.
 * @param isActive - Whether the alarm condition is on now, such as `level === 'alarm'`.
 * @returns The new state.
 * @example
 * state = updateAlarmState('normal', true); // 'active-unacknowledged'
 * state = updateAlarmState(state, false); // 'cleared-unacknowledged'
 */
export function updateAlarmState(state: AlarmState, isActive: boolean): AlarmState {
  return (isActive ? WHEN_ACTIVE : WHEN_INACTIVE)[state];
}
