import { rectContainsPoint } from './rect-contains-point.ts';

const RECT = { x: 0, y: 0, width: 10, height: 10 };

describe(rectContainsPoint, () => {
  it.for([
    [{ x: 5, y: 5 }, true],
    [{ x: 0, y: 0 }, true],
    [{ x: 10, y: 10 }, true],
    [{ x: 10.1, y: 5 }, false],
    [{ x: 5, y: -0.1 }, false],
    [{ x: -1, y: 11 }, false],
  ] as const)('tests %j as %s', ([point, expected]) => {
    expect(rectContainsPoint(RECT, point)).toBe(expected);
  });
});
