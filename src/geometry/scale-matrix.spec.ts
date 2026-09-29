import { scaleMatrix } from './scale-matrix.ts';

describe(scaleMatrix, () => {
  it('scales uniformly by default', () => {
    expect(scaleMatrix(2)).toStrictEqual({ a: 2, b: 0, c: 0, d: 2, e: 0, f: 0 });
  });

  it('scales each axis', () => {
    expect(scaleMatrix(2, 3)).toStrictEqual({ a: 2, b: 0, c: 0, d: 3, e: 0, f: 0 });
  });

  it('keeps the center in place', () => {
    const matrix = scaleMatrix(-1, 1, { x: 50, y: 10 });
    expect(matrix).toStrictEqual({ a: -1, b: 0, c: 0, d: 1, e: 100, f: 0 });
    expect(matrix.a * 50 + matrix.e).toBe(50);
  });
});
