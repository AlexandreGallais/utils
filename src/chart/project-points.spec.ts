import { projectPoints } from './project-points.ts';

describe(projectPoints, () => {
  const rect = { x: 10, y: 20, width: 200, height: 100 };

  it('stretches the bounds over the rectangle with the y axis upwards', () => {
    expect(
      projectPoints(
        [
          { x: 0, y: 0 },
          { x: 5, y: 50 },
          { x: 10, y: 100 },
          { x: 20, y: -100 },
        ],
        { minX: 0, maxX: 10, minY: 0, maxY: 100 },
        rect,
      ),
    ).toStrictEqual([
      { x: 10, y: 120 },
      { x: 110, y: 70 },
      { x: 210, y: 20 },
      { x: 410, y: 220 },
    ]);
  });

  it('maps an empty axis to the left and bottom edges', () => {
    expect(projectPoints([{ x: 3, y: 7 }], { minX: 3, maxX: 3, minY: 7, maxY: 7 }, rect)).toStrictEqual([
      { x: 10, y: 120 },
    ]);
  });

  it('returns an empty list without point', () => {
    expect(projectPoints([], { minX: 0, maxX: 1, minY: 0, maxY: 1 }, rect)).toStrictEqual([]);
  });
});
