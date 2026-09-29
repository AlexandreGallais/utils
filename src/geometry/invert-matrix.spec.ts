import { invertMatrix } from './invert-matrix.ts';
import { multiplyMatrices } from './multiply-matrices.ts';
import { createRotationMatrix } from './create-rotation-matrix.ts';

describe(invertMatrix, () => {
  it('inverts a scale and a translation', () => {
    expect(invertMatrix({ a: 2, b: 0, c: 0, d: 2, e: 100, f: 0 })).toStrictEqual({
      a: 0.5,
      b: -0,
      c: -0,
      d: 0.5,
      e: -50,
      f: 0,
    });
  });

  it('gives the identity once multiplied by the original', () => {
    const matrix = multiplyMatrices(createRotationMatrix(33, { x: 5, y: 7 }), { a: -2, b: 0, c: 0, d: 3, e: 4, f: -1 });
    const inverse = invertMatrix(matrix);
    const product = inverse && multiplyMatrices(matrix, inverse);
    expect(product?.a).toBeCloseTo(1, 9);
    expect(product?.b).toBeCloseTo(0, 9);
    expect(product?.d).toBeCloseTo(1, 9);
    expect(product?.e).toBeCloseTo(0, 9);
    expect(product?.f).toBeCloseTo(0, 9);
  });

  it.for([
    { a: 0, b: 0, c: 0, d: 1, e: 0, f: 0 },
    { a: 1, b: 2, c: 2, d: 4, e: 0, f: 0 },
    { a: NaN, b: 0, c: 0, d: 1, e: 0, f: 0 },
  ])('returns undefined for the singular matrix %j', (matrix) => {
    expect(invertMatrix(matrix)).toBeUndefined();
  });
});
