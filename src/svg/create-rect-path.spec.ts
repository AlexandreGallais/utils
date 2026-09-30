import { createRectPath } from './create-rect-path';

describe(createRectPath, () => {
  it('draws the rectangle clockwise', () => {
    expect(createRectPath({ x: 0, y: 0, width: 20, height: 10 })).toBe('M 0 0 H 20 V 10 H 0 Z');
    expect(createRectPath({ x: -5, y: 2.5, width: 10, height: 5 })).toBe('M -5 2.5 H 5 V 7.5 H -5 Z');
  });
});
