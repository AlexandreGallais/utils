import type { AlarmState } from './alarm-state.ts';
import { updateAlarmState } from './update-alarm-state.ts';

describe(updateAlarmState, () => {
  it.for([
    ['normal', true, 'active-unacknowledged'],
    ['normal', false, 'normal'],
    ['active-unacknowledged', true, 'active-unacknowledged'],
    ['active-unacknowledged', false, 'cleared-unacknowledged'],
    ['active-acknowledged', true, 'active-acknowledged'],
    ['active-acknowledged', false, 'normal'],
    ['cleared-unacknowledged', true, 'active-unacknowledged'],
    ['cleared-unacknowledged', false, 'cleared-unacknowledged'],
  ] as const satisfies readonly (readonly [AlarmState, boolean, AlarmState])[])(
    'goes from %s (active: %s) to %s',
    ([state, isActive, expected]) => {
      expect(updateAlarmState(state, isActive)).toBe(expected);
    },
  );
});
