import { composeMatrix } from './compose-matrix';
import { resetMatrixRotationAndFlip } from './reset-matrix-rotation-and-flip';
import { transformPoint } from './transform-point';

describe(resetMatrixRotationAndFlip, () => {
  it('keeps the pivot in place', () => {
    const matrix = composeMatrix({ translateX: 50, translateY: 20, rotation: 120, scaleX: -2, scaleY: 1, skewX: 0 });
    const pivot = { x: 10, y: 5 };
    const before = transformPoint(pivot, matrix);
    const after = transformPoint(pivot, resetMatrixRotationAndFlip(matrix, pivot));
    expect(after.x).toBeCloseTo(before.x, 9);
    expect(after.y).toBeCloseTo(before.y, 9);
  });

  it('drops a rotation and a flip, keeps the size and the position', () => {
    expect(resetMatrixRotationAndFlip({ a: 0, b: -2, c: -2, d: 0, e: 100, f: 50 }, { x: 0, y: 0 })).toStrictEqual({
      a: 2,
      b: 0,
      c: 0,
      d: 2,
      e: 100,
      f: 50,
    });
  });

  it('keeps distinct scales', () => {
    const matrix = composeMatrix({ translateX: 3, translateY: 4, rotation: 37, scaleX: 2, scaleY: -0.5, skewX: 0 });
    const reset = resetMatrixRotationAndFlip(matrix, { x: 0, y: 0 });
    expect(reset.a).toBeCloseTo(2, 9);
    expect(reset.d).toBeCloseTo(0.5, 9);
    expect([reset.b, reset.c, reset.e, reset.f]).toStrictEqual([0, 0, 3, 4]);
  });

  it('leaves an upright transform unchanged', () => {
    expect(resetMatrixRotationAndFlip({ a: 1, b: 0, c: 0, d: 1, e: 7, f: 8 }, { x: 0, y: 0 })).toStrictEqual({
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      e: 7,
      f: 8,
    });
  });
});
