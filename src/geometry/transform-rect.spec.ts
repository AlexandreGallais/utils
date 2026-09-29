import { composeMatrix } from './compose-matrix.ts';
import type { Rect } from './rect.ts';
import { rotationMatrix } from './rotation-matrix.ts';
import { transformRect } from './transform-rect.ts';

function rounded(rect: Rect): Rect {
  return {
    x: Math.round(rect.x * 1e9) / 1e9 + 0,
    y: Math.round(rect.y * 1e9) / 1e9 + 0,
    width: Math.round(rect.width * 1e9) / 1e9 + 0,
    height: Math.round(rect.height * 1e9) / 1e9 + 0,
  };
}

const SYMBOL = { x: 0, y: 0, width: 40, height: 20 };

describe(transformRect, () => {
  it('turns a rotated rectangle into its screen box', () => {
    expect(rounded(transformRect(SYMBOL, rotationMatrix(90, { x: 0, y: 0 })))).toStrictEqual({
      x: -20,
      y: 0,
      width: 20,
      height: 40,
    });
  });

  it('gives the same box for a flipped symbol', () => {
    const flipped = composeMatrix({ translateX: 140, translateY: 50, rotation: 0, scaleX: -1, scaleY: 1, skewX: 0 });
    expect(rounded(transformRect(SYMBOL, flipped))).toStrictEqual({ x: 100, y: 50, width: 40, height: 20 });
  });

  it('encloses a rotation by 45°', () => {
    const box = transformRect({ x: -10, y: -10, width: 20, height: 20 }, rotationMatrix(45, { x: 0, y: 0 }));
    expect(box.width).toBeCloseTo(20 * Math.SQRT2, 9);
    expect(box.x).toBeCloseTo(-10 * Math.SQRT2, 9);
  });
});
