import { identityMatrix } from './identity-matrix.ts';
import { multiplyMatrices } from './multiply-matrices.ts';

const TRANSLATE = { a: 1, b: 0, c: 0, d: 1, e: 100, f: 0 };
const SCALE = { a: 2, b: 0, c: 0, d: 2, e: 0, f: 0 };
const ROTATE_90 = { a: 0, b: 1, c: -1, d: 0, e: 0, f: 0 };

describe(multiplyMatrices, () => {
  it('applies the second transform first', () => {
    expect(multiplyMatrices(TRANSLATE, SCALE)).toStrictEqual({ a: 2, b: 0, c: 0, d: 2, e: 100, f: 0 });
    expect(multiplyMatrices(SCALE, TRANSLATE)).toStrictEqual({ a: 2, b: 0, c: 0, d: 2, e: 200, f: 0 });
  });

  it('composes rotations', () => {
    expect(multiplyMatrices(ROTATE_90, ROTATE_90)).toStrictEqual({ a: -1, b: 0, c: -0, d: -1, e: 0, f: 0 });
  });

  it('is neutral with the identity', () => {
    expect(multiplyMatrices(identityMatrix(), ROTATE_90)).toStrictEqual(ROTATE_90);
    expect(multiplyMatrices(TRANSLATE, identityMatrix())).toStrictEqual(TRANSLATE);
  });
});
