import { getMatrixRotation } from './get-matrix-rotation';
import { isMatrixFlipped } from './is-matrix-flipped';
import { parseTransform } from './parse-transform';
import { resetMatrixFlip } from './reset-matrix-flip';
import { transformPoint } from './transform-point';

const IDENTITY = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

describe(resetMatrixFlip, () => {
  it('unmirrors a horizontal flip without moving the pivot', () => {
    expect(resetMatrixFlip(parseTransform('scale(-1 1)') ?? IDENTITY, { x: 10, y: 5 })).toStrictEqual({
      a: 1,
      b: -0,
      c: 0,
      d: 1,
      e: -20,
      f: 0,
    });
  });

  it.for(['rotate(30) scale(-1 1)', 'translate(40 20) rotate(250) scale(-2 1.5)', 'scale(1 -1)'])(
    'keeps the rotation and the pivot of %s',
    (transform) => {
      const matrix = parseTransform(transform) ?? IDENTITY;
      const pivot = { x: 7, y: -3 };
      const unflipped = resetMatrixFlip(matrix, pivot);
      const before = transformPoint(pivot, matrix);
      const after = transformPoint(pivot, unflipped);
      expect(isMatrixFlipped(unflipped)).toBe(false);
      expect(getMatrixRotation(unflipped)).toBeCloseTo(getMatrixRotation(matrix), 9);
      expect(Math.hypot(after.x - before.x, after.y - before.y)).toBeLessThan(1e-9);
    },
  );

  it('returns an unmirrored transform as is', () => {
    const matrix = parseTransform('rotate(30)') ?? IDENTITY;
    expect(resetMatrixFlip(matrix, { x: 1, y: 1 })).toBe(matrix);
  });

  it('takes the defaults for null or undefined', () => {
    expect(resetMatrixFlip({ a: 0, b: 1, c: -1, d: 0, e: 10, f: 20 })).toStrictEqual(
      resetMatrixFlip({ a: 0, b: 1, c: -1, d: 0, e: 10, f: 20 }, { x: 0, y: 0 }),
    );
    expect(resetMatrixFlip({ a: 0, b: 1, c: -1, d: 0, e: 10, f: 20 }, null)).toStrictEqual(
      resetMatrixFlip({ a: 0, b: 1, c: -1, d: 0, e: 10, f: 20 }, { x: 0, y: 0 }),
    );
  });
});
