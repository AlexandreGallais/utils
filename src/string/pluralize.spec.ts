import { pluralize } from './pluralize.ts';

describe(pluralize, () => {
  it.for([
    [1, 'alarm'],
    [-1, 'alarm'],
    [0, 'alarms'],
    [3, 'alarms'],
    [1.5, 'alarms'],
  ] as const)('picks the form for %s', ([count, expected]) => {
    expect(pluralize(count, 'alarm')).toBe(expected);
  });

  it('uses the given plural and singular rule', () => {
    expect(pluralize(2, 'box', 'boxes')).toBe('boxes');
    expect(pluralize(0, 'alarme', 'alarmes', true)).toBe('alarme');
  });
});
