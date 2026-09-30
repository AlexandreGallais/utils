import { findNearestPoint } from './find-nearest-point';

describe(findNearestPoint, () => {
  const series = [0, 10, 20, 30].map((x) => ({ x, y: x * 2 }));

  it.for([
    { x: -5, expected: 0 },
    { x: 4, expected: 0 },
    { x: 5, expected: 0 },
    { x: 6, expected: 10 },
    { x: 20, expected: 20 },
    { x: 29, expected: 30 },
    { x: 99, expected: 30 },
  ])('finds the point nearest to $x', ({ x, expected }) => {
    expect(findNearestPoint(series, x)?.x).toBe(expected);
  });

  it('returns undefined for an empty series', () => {
    expect(findNearestPoint([], 3)).toBeUndefined();
  });

  it('takes the defaults for null or undefined', () => {
    expect(findNearestPoint()).toStrictEqual(findNearestPoint([], 0));
    expect(findNearestPoint(null, null)).toStrictEqual(findNearestPoint([], 0));
  });
  it('looks near x = 0 for null or undefined', () => {
    expect(
      findNearestPoint([
        { x: 0, y: 1 },
        { x: 1, y: 3 },
        { x: 2, y: 2 },
      ]),
    ).toStrictEqual(
      findNearestPoint(
        [
          { x: 0, y: 1 },
          { x: 1, y: 3 },
          { x: 2, y: 2 },
        ],
        0,
      ),
    );
    expect(
      findNearestPoint(
        [
          { x: 0, y: 1 },
          { x: 1, y: 3 },
          { x: 2, y: 2 },
        ],
        null,
      ),
    ).toStrictEqual(
      findNearestPoint(
        [
          { x: 0, y: 1 },
          { x: 1, y: 3 },
          { x: 2, y: 2 },
        ],
        0,
      ),
    );
  });
});
