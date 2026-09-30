import { uncapitalize } from './uncapitalize';

describe(uncapitalize, () => {
  it.for([
    ['RingBuffer', 'ringBuffer'],
    ['Élan', 'élan'],
    ['already', 'already'],
    ['HTTP', 'hTTP'],
    ['', ''],
  ] as const)('uncapitalizes %j as %j', ([input, expected]) => {
    expect(uncapitalize(input)).toBe(expected);
  });

  it('takes the defaults for null or undefined', () => {
    expect(uncapitalize()).toStrictEqual(uncapitalize(''));
    expect(uncapitalize(null)).toStrictEqual(uncapitalize(''));
  });
});
