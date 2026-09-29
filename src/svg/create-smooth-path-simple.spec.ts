import { createSmoothPathSimple } from './create-smooth-path-simple.ts';
import { createSmoothPath } from './create-smooth-path.ts';

describe(createSmoothPathSimple, () => {
  it('uses a tension of 1', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 5, y: 5 },
      { x: 10, y: 0 },
    ];
    expect(createSmoothPathSimple(points)).toBe(createSmoothPath(points, 1));
  });
});
