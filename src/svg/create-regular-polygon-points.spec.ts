import { createRegularPolygonPoints } from './create-regular-polygon-points';
import { formatPoints } from './format-points';

describe(createRegularPolygonPoints, () => {
  it('starts at the top and goes clockwise', () => {
    expect(formatPoints(createRegularPolygonPoints({ x: 50, y: 50 }, 10, 4, 0))).toBe('50,40 60,50 50,60 40,50');
  });

  it('applies the rotation', () => {
    expect(formatPoints(createRegularPolygonPoints({ x: 0, y: 0 }, 10, 3, 180))).toBe('0,10 -8.66,-5 8.66,-5');
  });

  it.for([2, 3.5, NaN])('throws a RangeError for %s sides', (sides) => {
    expect(() => createRegularPolygonPoints({ x: 0, y: 0 }, 10, sides, 0)).toThrow(RangeError);
  });
});
