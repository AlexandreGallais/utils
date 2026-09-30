import { interpolateTable } from './interpolate-table';

const TANK = [
  [0, 0],
  [10, 150],
  [20, 380],
  [30, 600],
] as const;

describe(interpolateTable, () => {
  it.for([
    [15, 265],
    [10, 150],
    [25, 490],
    [0, 0],
    [30, 600],
    [-5, 0],
    [40, 600],
  ] as const)('reads %s as %s', ([x, expected]) => {
    expect(interpolateTable(x, TANK)).toBe(expected);
  });

  it('reads a large table', () => {
    const table = Array.from({ length: 1001 }, (_, index) => [index, index * 2] as const);
    expect(interpolateTable(512.25, table)).toBe(1024.5);
  });

  it('handles a single point and duplicate inputs', () => {
    expect(interpolateTable(5, [[1, 7]])).toBe(7);
    expect(
      interpolateTable(1.5, [
        [1, 10],
        [1, 20],
        [2, 30],
      ]),
    ).toBe(25);
  });

  it('returns NaN for an empty table', () => {
    expect(interpolateTable(1, [])).toBeNaN();
  });
});
