import { zoomBounds } from './zoom-bounds.ts';

describe(zoomBounds, () => {
  const bounds = { minX: 0, maxX: 100, minY: 0, maxY: 10 };

  it('zooms in around the middle by default', () => {
    expect(zoomBounds(bounds, 2)).toStrictEqual({ minX: 25, maxX: 75, minY: 2.5, maxY: 7.5 });
  });

  it('keeps the center point in place', () => {
    expect(zoomBounds(bounds, 2, { x: 100, y: 0 })).toStrictEqual({ minX: 50, maxX: 100, minY: 0, maxY: 5 });
  });

  it('zooms out below 1', () => {
    expect(zoomBounds(bounds, 0.5)).toStrictEqual({ minX: -50, maxX: 150, minY: -5, maxY: 15 });
  });

  it.for([0, -1, Infinity, NaN])('throws a RangeError for factor %s', (factor) => {
    expect(() => zoomBounds(bounds, factor)).toThrow(RangeError);
  });
});
