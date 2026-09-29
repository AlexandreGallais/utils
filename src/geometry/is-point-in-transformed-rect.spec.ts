import { isPointInTransformedRect } from './is-point-in-transformed-rect.ts';
import { rotationMatrix } from './rotation-matrix.ts';
import { scaleMatrix } from './scale-matrix.ts';

const RECT = { x: -20, y: -10, width: 40, height: 20 };

describe(isPointInTransformedRect, () => {
  it.for([
    { point: { x: 0, y: 15 }, expected: true },
    { point: { x: 15, y: 0 }, expected: false },
    { point: { x: 5, y: -20 }, expected: true },
  ])('hits $point in a rectangle turned by 90°', ({ point, expected }) => {
    expect(isPointInTransformedRect(point, RECT, rotationMatrix(90, { x: 0, y: 0 }))).toBe(expected);
  });

  it('returns false for a flattened transform', () => {
    expect(isPointInTransformedRect({ x: 0, y: 0 }, RECT, scaleMatrix(0, 1, { x: 0, y: 0 }))).toBe(false);
  });
});
