import { acknowledgeAlarm } from './acknowledge-alarm.ts';
import type { AlarmState } from './alarm-state.ts';

describe(acknowledgeAlarm, () => {
  it.for([
    ['normal', 'normal'],
    ['active-unacknowledged', 'active-acknowledged'],
    ['active-acknowledged', 'active-acknowledged'],
    ['cleared-unacknowledged', 'normal'],
  ] as const satisfies readonly (readonly [AlarmState, AlarmState])[])('goes from %s to %s', ([state, expected]) => {
    expect(acknowledgeAlarm(state)).toBe(expected);
  });
});
