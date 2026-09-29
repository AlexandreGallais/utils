import { snapToGrid } from './snap-to-grid.ts';

describe(snapToGrid, () => {
  it.for([
    { point: { x: 23, y: 38 }, expected: { x: 20, y: 40 } },
    { point: { x: -14, y: 5 }, expected: { x: -10, y: 10 } },
    { point: { x: 0, y: 0 }, expected: { x: 0, y: 0 } },
  ])('snaps $point to $expected', ({ point, expected }) => {
    expect(snapToGrid(point, 10, { x: 0, y: 0 })).toStrictEqual(expected);
  });

  it('snaps to a shifted grid', () => {
    expect(snapToGrid({ x: 23, y: 38 }, 10, { x: 5, y: 5 })).toStrictEqual({ x: 25, y: 35 });
  });

  it('avoids floating-point noise', () => {
    expect(snapToGrid({ x: 0.31, y: 0.69 }, 0.1, { x: 0, y: 0 })).toStrictEqual({ x: 0.3, y: 0.7 });
  });

  it.for([0, -1, NaN, Infinity])('throws a RangeError for a grid of %s', (gridSize) => {
    expect(() => snapToGrid({ x: 0, y: 0 }, gridSize, { x: 0, y: 0 })).toThrow(RangeError);
  });
});
