import { uncapitalize } from './uncapitalize.ts';

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
