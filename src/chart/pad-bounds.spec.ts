import { padBounds } from './pad-bounds.ts';

describe(padBounds, () => {
  it('adds a fraction of the range on each side', () => {
    expect(padBounds({ minX: 0, maxX: 100, minY: -10, maxY: 10 }, 0.1, 1)).toStrictEqual({
      minX: -10,
      maxX: 110,
      minY: -12,
      maxY: 12,
    });
  });

  it('uses the fallback margin for an empty axis', () => {
    expect(padBounds({ minX: 0, maxX: 100, minY: 20, maxY: 20 }, 0.1, 1)).toStrictEqual({
      minX: -10,
      maxX: 110,
      minY: 19,
      maxY: 21,
    });
    expect(padBounds({ minX: 5, maxX: 5, minY: 0, maxY: 0 }, 0.1, 2)).toStrictEqual({
      minX: 3,
      maxX: 7,
      minY: -2,
      maxY: 2,
    });
  });
});
