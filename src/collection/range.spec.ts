import { range } from './range.ts';

describe(range, () => {
  it.for([
    [0, 5, 1, [0, 1, 2, 3, 4]],
    [0, 1, 0.25, [0, 0.25, 0.5, 0.75]],
    [5, 0, -2, [5, 3, 1]],
    [0, 0, 1, []],
    [5, 0, 1, []],
    [0, 0.3, 0.1, [0, 0.1, 0.2]],
  ] as const)('ranges from %s to %s by %s', ([start, end, step, expected]) => {
    expect(range(start, end, step)).toStrictEqual(expected);
  });

  it('uses a step of 1 by default', () => {
    expect(range(2, 5)).toStrictEqual([2, 3, 4]);
  });

  it.for([0, NaN, Infinity])('throws a RangeError for step %s', (step) => {
    expect(() => range(0, 1, step)).toThrow(RangeError);
  });
});
