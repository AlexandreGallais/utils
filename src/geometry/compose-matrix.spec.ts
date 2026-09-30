import { composeMatrix } from './compose-matrix';

const NEUTRAL = { translateX: 0, translateY: 0, rotation: 0, scaleX: 1, scaleY: 1, skewX: 0 };

describe(composeMatrix, () => {
  it('builds the identity from neutral steps', () => {
    expect(composeMatrix(NEUTRAL)).toStrictEqual({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 });
  });

  it('combines translation, rotation and scale', () => {
    const matrix = composeMatrix({ ...NEUTRAL, translateX: 10, rotation: 90, scaleX: 2, scaleY: 2 });
    expect(matrix.a).toBeCloseTo(0, 9);
    expect(matrix.b).toBeCloseTo(2, 9);
    expect(matrix.c).toBeCloseTo(-2, 9);
    expect(matrix.d).toBeCloseTo(0, 9);
    expect(matrix.e).toBe(10);
  });

  it('applies a flip and a skew', () => {
    expect(composeMatrix({ ...NEUTRAL, scaleY: -1 })).toStrictEqual({ a: 1, b: 0, c: -0, d: -1, e: 0, f: 0 });
    expect(composeMatrix({ ...NEUTRAL, skewX: 45 }).c).toBeCloseTo(1, 9);
  });
});
