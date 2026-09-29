import type { AlarmState } from './alarm-state.ts';
import { isAlarmUnacknowledged } from './is-alarm-unacknowledged.ts';

describe(isAlarmUnacknowledged, () => {
  it.for([
    ['normal', false],
    ['active-unacknowledged', true],
    ['active-acknowledged', false],
    ['cleared-unacknowledged', true],
  ] as const satisfies readonly (readonly [AlarmState, boolean])[])('returns %s → %s', ([state, expected]) => {
    expect(isAlarmUnacknowledged(state)).toBe(expected);
  });
});
