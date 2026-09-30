import { getNiceTicks } from './get-nice-ticks';

describe(getNiceTicks, () => {
  it.for([
    { min: 0, max: 97, count: 5, expected: [0, 20, 40, 60, 80] },
    { min: 0, max: 100, count: 5, expected: [0, 20, 40, 60, 80, 100] },
    { min: -0.25, max: 0.25, count: 5, expected: [-0.2, -0.1, 0, 0.1, 0.2] },
    { min: 0, max: 1, count: 3, expected: [0, 0.5, 1] },
    { min: 0.1, max: 0.7, count: 6, expected: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7] },
    { min: 12, max: 1234, count: 4, expected: [500, 1000] },
    { min: 3, max: 7, count: 1, expected: [5] },
    { min: 0, max: 9, count: 1, expected: [0] },
  ])('ticks [$min, $max] in about $count steps', ({ min, max, count, expected }) => {
    expect(getNiceTicks(min, max, count)).toStrictEqual(expected);
  });

  it('uses 5 ticks', () => {
    expect(getNiceTicks(0, 10, 5)).toStrictEqual([0, 2, 4, 6, 8, 10]);
  });

  it('never returns a negative zero', () => {
    expect(Object.is(getNiceTicks(-1, 1, 2)[1], 0)).toBe(true);
  });

  it('returns the single value of an empty interval', () => {
    expect(getNiceTicks(4, 4, 5)).toStrictEqual([4]);
  });

  it.for([0, -1, 1.5])('throws a RangeError for count %s', (count) => {
    expect(() => getNiceTicks(0, 1, count)).toThrow(RangeError);
  });

  it('throws a RangeError for an inverted interval', () => {
    expect(() => getNiceTicks(1, 0, 5)).toThrow(RangeError);
  });
});
