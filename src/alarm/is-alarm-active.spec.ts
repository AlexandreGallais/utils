import type { AlarmState } from './alarm-state';
import { isAlarmActive } from './is-alarm-active';

describe(isAlarmActive, () => {
  it.for([
    ['normal', false],
    ['active-unacknowledged', true],
    ['active-acknowledged', true],
    ['cleared-unacknowledged', false],
  ] as const satisfies readonly (readonly [AlarmState, boolean])[])('returns %s → %s', ([state, expected]) => {
    expect(isAlarmActive(state)).toBe(expected);
  });
});
