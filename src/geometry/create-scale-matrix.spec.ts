import { createScaleMatrix } from './create-scale-matrix';

describe(createScaleMatrix, () => {
  it('scales uniformly', () => {
    expect(createScaleMatrix(2, 2, { x: 0, y: 0 })).toStrictEqual({ a: 2, b: 0, c: 0, d: 2, e: 0, f: 0 });
  });

  it('scales each axis', () => {
    expect(createScaleMatrix(2, 3, { x: 0, y: 0 })).toStrictEqual({ a: 2, b: 0, c: 0, d: 3, e: 0, f: 0 });
  });

  it('keeps the center in place', () => {
    const matrix = createScaleMatrix(-1, 1, { x: 50, y: 10 });
    expect(matrix).toStrictEqual({ a: -1, b: 0, c: 0, d: 1, e: 100, f: 0 });
    expect(matrix.a * 50 + matrix.e).toBe(50);
  });

  it('takes the defaults for null or undefined', () => {
    expect(createScaleMatrix()).toStrictEqual(createScaleMatrix(1, 1, { x: 0, y: 0 }));
    expect(createScaleMatrix(null, null, null)).toStrictEqual(createScaleMatrix(1, 1, { x: 0, y: 0 }));
  });
  it('scales uniformly for a null or undefined sy', () => {
    expect(createScaleMatrix(2)).toStrictEqual(createScaleMatrix(2, 2, { x: 0, y: 0 }));
    expect(createScaleMatrix(2, null, null)).toStrictEqual(createScaleMatrix(2, 2, { x: 0, y: 0 }));
  });
});
