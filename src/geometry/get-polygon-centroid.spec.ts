import { getPolygonCentroid } from './get-polygon-centroid';

describe(getPolygonCentroid, () => {
  it('finds the centroid of a triangle', () => {
    expect(
      getPolygonCentroid([
        { x: 0, y: 0 },
        { x: 6, y: 0 },
        { x: 0, y: 6 },
      ]),
    ).toStrictEqual({ x: 2, y: 2 });
  });

  it('weights a concave polygon by its area', () => {
    // An L shape: a 4 × 2 bar and a 2 × 2 foot.
    const centroid = getPolygonCentroid([
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 4, y: 2 },
      { x: 2, y: 2 },
      { x: 2, y: 4 },
      { x: 0, y: 4 },
    ]);
    expect(centroid?.x).toBeCloseTo(5 / 3, 10);
    expect(centroid?.y).toBeCloseTo(5 / 3, 10);
  });

  it('averages the vertices of a flat polygon', () => {
    expect(
      getPolygonCentroid([
        { x: 0, y: 0 },
        { x: 4, y: 2 },
      ]),
    ).toStrictEqual({ x: 2, y: 1 });
  });

  it('returns undefined without vertex', () => {
    expect(getPolygonCentroid([])).toBeUndefined();
  });

  it('takes the defaults for null or undefined', () => {
    expect(getPolygonCentroid()).toStrictEqual(getPolygonCentroid([]));
    expect(getPolygonCentroid(null)).toStrictEqual(getPolygonCentroid([]));
  });
});
