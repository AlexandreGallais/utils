import { pluralize } from './pluralize';

describe(pluralize, () => {
  it.for([
    [1, 'alarm'],
    [-1, 'alarm'],
    [0, 'alarms'],
    [3, 'alarms'],
    [1.5, 'alarms'],
  ] as const)('picks the form for %s', ([count, expected]) => {
    expect(pluralize(count, 'alarm', 'alarms', Math.abs(count) === 1)).toBe(expected);
  });

  it('uses the given plural and singular rule', () => {
    expect(pluralize(2, 'box', 'boxes', Math.abs(2) === 1)).toBe('boxes');
    expect(pluralize(0, 'alarme', 'alarmes', true)).toBe('alarme');
  });

  it('takes the defaults', () => {
    expect(pluralize(3, 'alarm')).toStrictEqual(pluralize(3, 'alarm', 'alarms', false));
  });
});
