import { shallowEqual } from './shallow-equal';

describe(shallowEqual, () => {
  it.for([
    [1, 1, true],
    [NaN, NaN, true],
    [0, -0, false],
    ['a', 'b', false],
    [null, null, true],
    [null, {}, false],
    [{ x: 1, y: 2 }, { y: 2, x: 1 }, true],
    [{ x: 1 }, { x: 1, y: 2 }, false],
    [{ x: 1, y: undefined }, { x: 1, z: undefined }, false],
    [{ x: 1 }, { x: 2 }, false],
    [[1, 2], [1, 2], true],
    [[1, 2], { 0: 1, 1: 2 }, false],
    [{ p: { x: 1 } }, { p: { x: 1 } }, false],
  ] as const)('compares %j and %j as %s', ([a, b, expected]) => {
    expect(shallowEqual(a, b)).toBe(expected);
  });

  it('accepts shared nested references', () => {
    const point = { x: 1 };
    expect(shallowEqual({ point }, { point })).toBe(true);
  });
});
