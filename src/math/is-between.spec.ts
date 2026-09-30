import { isBetween } from './is-between';

describe(isBetween, () => {
  it.for([
    [5, 0, 10, true],
    [0, 0, 10, true],
    [10, 0, 10, true],
    [11, 0, 10, false],
  ] as const)('checks %s in [%s, %s] inclusively as %s', ([value, min, max, expected]) => {
    expect(isBetween(value, min, max, true)).toBe(expected);
  });

  it('excludes the bounds when not inclusive', () => {
    expect(isBetween(0, 0, 10, false)).toBe(false);
    expect(isBetween(10, 0, 10, false)).toBe(false);
    expect(isBetween(5, 0, 10, false)).toBe(true);
  });
});
