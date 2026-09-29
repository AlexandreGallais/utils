import { getDataBounds } from './get-data-bounds.ts';

describe(getDataBounds, () => {
  it('returns the extent of the points', () => {
    expect(
      getDataBounds([
        { x: 3, y: 5 },
        { x: 10, y: -2 },
        { x: 0, y: 1 },
      ]),
    ).toStrictEqual({ minX: 0, maxX: 10, minY: -2, maxY: 5 });
  });

  it('returns undefined without point', () => {
    expect(getDataBounds([])).toBeUndefined();
  });
});
