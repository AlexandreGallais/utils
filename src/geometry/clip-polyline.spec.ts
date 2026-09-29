import { clipPolyline } from './clip-polyline.ts';

describe(clipPolyline, () => {
  const rect = { x: 0, y: 0, width: 10, height: 10 };

  it('keeps a line inside as one run', () => {
    const points = [
      { x: 1, y: 1 },
      { x: 5, y: 9 },
      { x: 9, y: 1 },
    ];
    expect(clipPolyline(points, rect)).toStrictEqual([points]);
  });

  it('splits a line leaving and coming back', () => {
    expect(
      clipPolyline(
        [
          { x: 5, y: 5 },
          { x: 15, y: 5 },
          { x: 5, y: 8 },
        ],
        rect,
      ),
    ).toStrictEqual([
      [
        { x: 5, y: 5 },
        { x: 10, y: 5 },
      ],
      [
        { x: 10, y: 6.5 },
        { x: 5, y: 8 },
      ],
    ]);
  });

  it('keeps the part of a segment crossing the rectangle', () => {
    expect(
      clipPolyline(
        [
          { x: -5, y: 5 },
          { x: 15, y: 5 },
          { x: 15, y: 20 },
        ],
        rect,
      ),
    ).toStrictEqual([
      [
        { x: 0, y: 5 },
        { x: 10, y: 5 },
      ],
    ]);
  });

  it('drops segments outside', () => {
    expect(
      clipPolyline(
        [
          { x: -5, y: 5 },
          { x: -5, y: 8 },
          { x: 5, y: 8 },
          { x: 8, y: 8 },
        ],
        rect,
      ),
    ).toStrictEqual([
      [
        { x: 0, y: 8 },
        { x: 5, y: 8 },
        { x: 8, y: 8 },
      ],
    ]);
  });

  it.for([0, 1])('returns no run for %s point', (count) => {
    expect(
      clipPolyline(
        Array.from({ length: count }, () => ({ x: 1, y: 1 })),
        rect,
      ),
    ).toStrictEqual([]);
  });
});
