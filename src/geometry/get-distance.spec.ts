import { getDistance } from './get-distance';

describe(getDistance, () => {
  it.for([
    [{ x: 0, y: 0 }, { x: 3, y: 4 }, 5],
    [{ x: 1, y: 1 }, { x: 1, y: 1 }, 0],
    [{ x: -1, y: -1 }, { x: 2, y: 3 }, 5],
    [{ x: 5, y: 0 }, { x: 0, y: 0 }, 5],
  ] as const)('measures %j → %j as %s', ([a, b, expected]) => {
    expect(getDistance(a, b)).toBe(expected);
  });
});
