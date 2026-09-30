import { centerMatrixOn } from './center-matrix-on';
import { parseTransform } from './parse-transform';
import { transformPoint } from './transform-point';

describe(centerMatrixOn, () => {
  it('draws the pivot on the target, keeping the rotation', () => {
    const matrix = parseTransform('translate(3 4) rotate(30) scale(-2 1)') ?? { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
    const centered = centerMatrixOn(matrix, { x: 10, y: 10 }, { x: 200, y: 100 });
    const drawn = transformPoint({ x: 10, y: 10 }, centered);
    expect(drawn.x).toBeCloseTo(200, 9);
    expect(drawn.y).toBeCloseTo(100, 9);
    expect([centered.a, centered.b, centered.c, centered.d]).toStrictEqual([matrix.a, matrix.b, matrix.c, matrix.d]);
  });

  it('takes the defaults for null or undefined', () => {
    expect(centerMatrixOn()).toStrictEqual(
      centerMatrixOn({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }),
    );
    expect(centerMatrixOn(null, null, null)).toStrictEqual(
      centerMatrixOn({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }),
    );
  });
});
