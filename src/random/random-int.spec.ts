import { randomInt } from './random-int';

describe(randomInt, () => {
  it('includes both bounds', () => {
    expect(randomInt(1, 6, () => 0)).toBe(1);
    expect(randomInt(1, 6, () => 0.999999)).toBe(6);
    expect(randomInt(1, 6, () => 0.5)).toBe(4);
  });

  it('rounds the bounds inwards', () => {
    expect(randomInt(0.5, 2.5, () => 0)).toBe(1);
    expect(randomInt(0.5, 2.5, () => 0.999)).toBe(2);
  });

  it('stays within the bounds with Math.random', () => {
    expect([3, 4]).toContain(randomInt(3, 4, Math.random));
  });

  it.for([
    [5, 1],
    [0.2, 0.8],
    [NaN, 1],
  ] as const)('throws a RangeError for [%s, %s]', ([min, max]) => {
    expect(() => randomInt(min, max, Math.random)).toThrow(RangeError);
  });
});
