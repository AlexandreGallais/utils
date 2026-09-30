import { getDistanceToSegment } from './get-distance-to-segment';

describe(getDistanceToSegment, () => {
  const start = { x: 0, y: 0 };
  const end = { x: 10, y: 0 };

  it.for([
    { point: { x: 5, y: 3 }, expected: 3 },
    { point: { x: 5, y: -3 }, expected: 3 },
    { point: { x: -3, y: 4 }, expected: 5 },
    { point: { x: 13, y: 4 }, expected: 5 },
    { point: { x: 7, y: 0 }, expected: 0 },
  ])('measures $expected from $point', ({ point, expected }) => {
    expect(getDistanceToSegment(point, start, end)).toBe(expected);
  });

  it('measures to a point for an empty segment', () => {
    expect(getDistanceToSegment({ x: 3, y: 4 }, start, start)).toBe(5);
  });

  it('takes the defaults for null or undefined', () => {
    expect(getDistanceToSegment()).toStrictEqual(getDistanceToSegment({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
    expect(getDistanceToSegment(null, null, null)).toStrictEqual(
      getDistanceToSegment({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }),
    );
  });
});
