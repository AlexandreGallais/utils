import { getLogTicks } from './get-log-ticks.ts';

describe(getLogTicks, () => {
  it.for([
    { min: 0.5, max: 2000, expected: [1, 10, 100, 1000] },
    { min: 1, max: 1000, expected: [1, 10, 100, 1000] },
    { min: 0.001, max: 0.1, expected: [0.001, 0.01, 0.1] },
    { min: 2, max: 9, expected: [] },
    { min: 10, max: 10, expected: [10] },
  ])('lists the powers of ten in [$min, $max]', ({ min, max, expected }) => {
    expect(getLogTicks(min, max)).toStrictEqual(expected);
  });

  it.for([
    [0, 10],
    [-1, 10],
    [10, 1],
    [1, Infinity],
    [NaN, 1],
  ])('throws a RangeError for [%s, %s]', ([min = 0, max = 0]) => {
    expect(() => getLogTicks(min, max)).toThrow(RangeError);
  });
});
