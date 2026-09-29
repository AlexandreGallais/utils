import type { Matrix2D } from './matrix-2d.ts';
import { rotationMatrix } from './rotation-matrix.ts';

function apply(matrix: Matrix2D, x: number, y: number): [number, number] {
  return [matrix.a * x + matrix.c * y + matrix.e, matrix.b * x + matrix.d * y + matrix.f];
}

describe(rotationMatrix, () => {
  it('rotates clockwise on screen around the origin', () => {
    const [x, y] = apply(rotationMatrix(90), 10, 0);
    expect(x).toBeCloseTo(0, 9);
    expect(y).toBeCloseTo(10, 9);
  });

  it('rotates around a center', () => {
    const [x, y] = apply(rotationMatrix(180, { x: 50, y: 50 }), 60, 50);
    expect(x).toBeCloseTo(40, 9);
    expect(y).toBeCloseTo(50, 9);
  });

  it('keeps the center in place', () => {
    const [x, y] = apply(rotationMatrix(37, { x: 12, y: -7 }), 12, -7);
    expect(x).toBeCloseTo(12, 9);
    expect(y).toBeCloseTo(-7, 9);
  });

  it('is the identity for a full turn', () => {
    const matrix = rotationMatrix(360);
    expect(matrix.a).toBeCloseTo(1, 9);
    expect(matrix.b).toBeCloseTo(0, 9);
  });
});
