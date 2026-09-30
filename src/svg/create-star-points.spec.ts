import { createStarPoints } from './create-star-points';

describe(createStarPoints, () => {
  it('alternates tips and notches, the first tip up', () => {
    const points = createStarPoints({ x: 0, y: 0 }, 10, 5, 2).map(({ x, y }) => ({
      x: Math.round(x * 1e9) / 1e9 + 0,
      y: Math.round(y * 1e9) / 1e9 + 0,
    }));
    expect(points).toStrictEqual([
      { x: 0, y: -10 },
      { x: 5, y: 0 },
      { x: 0, y: 10 },
      { x: -5, y: 0 },
    ]);
  });

  it('returns two vertices per branch', () => {
    expect(createStarPoints({ x: 12, y: 12 }, 10, 4, 5)).toHaveLength(10);
  });

  it.for([1, 0, 2.5])('throws a RangeError for %s branches', (branches) => {
    expect(() => createStarPoints({ x: 0, y: 0 }, 10, 5, branches)).toThrow(RangeError);
  });

  it('takes the defaults for null or undefined', () => {
    expect(createStarPoints(undefined, 10, 5)).toStrictEqual(createStarPoints({ x: 0, y: 0 }, 10, 5, 5));
    expect(createStarPoints(null, 10, 5, null)).toStrictEqual(createStarPoints({ x: 0, y: 0 }, 10, 5, 5));
  });
});
