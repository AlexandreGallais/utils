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
});
