import { createPolylinePath } from './create-polyline-path.ts';

const TRIANGLE = [
  { x: 0, y: 10 },
  { x: 5, y: 0 },
  { x: 10.00001, y: 10 },
];

describe(createPolylinePath, () => {
  it('joins the points with lines', () => {
    expect(createPolylinePath(TRIANGLE, false)).toBe('M 0 10 L 5 0 L 10 10');
  });

  it('closes the shape', () => {
    expect(createPolylinePath(TRIANGLE, true)).toBe('M 0 10 L 5 0 L 10 10 Z');
  });

  it('returns an empty path without point, even closed', () => {
    expect(createPolylinePath([], true)).toBe('');
  });
});
