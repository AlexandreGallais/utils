import { getMatrixRotation } from './get-matrix-rotation.ts';
import { isMatrixFlipped } from './is-matrix-flipped.ts';
import { parseTransform } from './parse-transform.ts';
import { resetMatrixRotation } from './reset-matrix-rotation.ts';
import { transformPoint } from './transform-point.ts';

const CENTER = { x: 10, y: 10 };

describe(resetMatrixRotation, () => {
  it.for([
    'translate(100 50) rotate(45 10 10)',
    'translate(100 50) rotate(200) scale(2 3)',
    'translate(-5 8) rotate(30) scale(-1 1)',
    'rotate(90) skewX(20)',
  ])('straightens %s without moving its center', (transform) => {
    const matrix = parseTransform(transform) ?? { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
    const upright = resetMatrixRotation(matrix, CENTER);
    const before = transformPoint(CENTER, matrix);
    const after = transformPoint(CENTER, upright);
    expect(getMatrixRotation(upright)).toBeCloseTo(0, 9);
    expect(isMatrixFlipped(upright)).toBe(isMatrixFlipped(matrix));
    expect([after.x - before.x, after.y - before.y].map((delta) => Math.abs(delta) < 1e-9)).toStrictEqual([true, true]);
  });

  it('keeps the scale', () => {
    const upright = resetMatrixRotation(
      parseTransform('rotate(90) scale(2 3)') ?? { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
      {
        x: 0,
        y: 0,
      },
    );
    expect([upright.a, upright.b, upright.c, upright.d].map((value) => Math.round(value * 1e9) / 1e9)).toStrictEqual([
      2, 0, 0, 3,
    ]);
  });
});
