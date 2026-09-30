import { formatMatrix } from './format-matrix';
import { createRotationMatrix } from './create-rotation-matrix';

describe(formatMatrix, () => {
  it('formats the six values', () => {
    expect(formatMatrix({ a: 2, b: 0, c: 0, d: 2, e: 100, f: 50.5 }, 6)).toBe('matrix(2 0 0 2 100 50.5)');
  });

  it('removes float noise', () => {
    expect(formatMatrix(createRotationMatrix(90, { x: 0, y: 0 }), 6)).toBe('matrix(0 1 -1 0 0 0)');
  });

  it('keeps the requested decimals', () => {
    expect(formatMatrix({ a: 1 / 3, b: 0, c: 0, d: 1, e: 0, f: 0 }, 2)).toBe('matrix(0.33 0 0 1 0 0)');
  });

  it('throws a RangeError for invalid decimals', () => {
    expect(() => formatMatrix({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }, -1)).toThrow(RangeError);
  });
});
