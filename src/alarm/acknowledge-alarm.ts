import type { AlarmState } from './alarm-state.ts';

/** The state after an acknowledgement, by current state. */
const ACKNOWLEDGED: Readonly<Record<AlarmState, AlarmState>> = {
  normal: 'normal',
  'active-unacknowledged': 'active-acknowledged',
  'active-acknowledged': 'active-acknowledged',
  'cleared-unacknowledged': 'normal',
};

/**
 * Applies an operator acknowledgement: an active alarm stops blinking and stays displayed, a cleared one
 * disappears.
 *
 * @param state - The current state.
 * @returns The state after the acknowledgement.
 * @example
 * acknowledgeAlarm('active-unacknowledged'); // 'active-acknowledged'
 * acknowledgeAlarm('cleared-unacknowledged'); // 'normal'
 */
export function acknowledgeAlarm(state: AlarmState): AlarmState {
  return ACKNOWLEDGED[state];
}
