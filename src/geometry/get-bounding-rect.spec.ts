import { getBoundingRect } from './get-bounding-rect.ts';

describe(getBoundingRect, () => {
  it('encloses every point', () => {
    expect(
      getBoundingRect([
        { x: 10, y: 40 },
        { x: 30, y: 5 },
        { x: 20, y: 20 },
      ]),
    ).toStrictEqual({ x: 10, y: 5, width: 20, height: 35 });
  });

  it('builds the rectangle between two opposite corners, in any order', () => {
    expect(
      getBoundingRect([
        { x: 50, y: 0 },
        { x: -10, y: 30 },
      ]),
    ).toStrictEqual({ x: -10, y: 0, width: 60, height: 30 });
  });

  it('gives an empty rectangle for a single point', () => {
    expect(getBoundingRect([{ x: 3, y: 4 }])).toStrictEqual({ x: 3, y: 4, width: 0, height: 0 });
  });

  it('returns undefined for no point', () => {
    expect(getBoundingRect([])).toBeUndefined();
  });
});
