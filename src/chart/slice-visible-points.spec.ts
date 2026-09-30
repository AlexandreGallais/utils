import { sliceVisiblePoints } from './slice-visible-points';

describe(sliceVisiblePoints, () => {
  const series = [0, 10, 20, 30, 40].map((x) => ({ x, y: x / 10 }));

  it.for([
    { minX: 12, maxX: 25, expected: [20] },
    { minX: 10, maxX: 30, expected: [10, 20, 30] },
    { minX: -5, maxX: 100, expected: [0, 10, 20, 30, 40] },
    { minX: 12, maxX: 18, expected: [] },
    { minX: 50, maxX: 60, expected: [] },
  ])('keeps the points in [$minX, $maxX]', ({ minX, maxX, expected }) => {
    expect(sliceVisiblePoints(series, minX, maxX, false).map(({ x }) => x)).toStrictEqual(expected);
  });

  it.for([
    { minX: 12, maxX: 25, expected: [10, 20, 30] },
    { minX: 10, maxX: 30, expected: [0, 10, 20, 30, 40] },
    { minX: -5, maxX: 100, expected: [0, 10, 20, 30, 40] },
    { minX: 12, maxX: 18, expected: [10, 20] },
    { minX: 50, maxX: 60, expected: [40] },
    { minX: -20, maxX: -10, expected: [0] },
  ])('adds the neighbours of [$minX, $maxX]', ({ minX, maxX, expected }) => {
    expect(sliceVisiblePoints(series, minX, maxX, true).map(({ x }) => x)).toStrictEqual(expected);
  });

  it('returns an empty list without point', () => {
    expect(sliceVisiblePoints([], 0, 1, true)).toStrictEqual([]);
  });
});
