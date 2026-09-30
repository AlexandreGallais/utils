import { composeMatrix } from './compose-matrix';
import { screenDeltaToLocal } from './screen-delta-to-local';
import { transformDelta } from './transform-delta';

describe(screenDeltaToLocal, () => {
  it('mirrors the movement of a flipped element', () => {
    expect(screenDeltaToLocal({ x: 10, y: 0 }, { a: -1, b: 0, c: 0, d: 1, e: 200, f: 0 })).toStrictEqual({
      x: -10,
      y: 0,
    });
  });

  it('undoes rotation and scale', () => {
    const matrix = composeMatrix({ translateX: 50, translateY: 50, rotation: 90, scaleX: 2, scaleY: 2, skewX: 0 });
    const local = screenDeltaToLocal({ x: 0, y: 20 }, matrix);
    expect(local?.x).toBeCloseTo(10, 9);
    expect(local?.y).toBeCloseTo(0, 9);
  });

  it('is the inverse of transformDelta', () => {
    const matrix = composeMatrix({ translateX: 1, translateY: 2, rotation: -33, scaleX: 1.5, scaleY: -2, skewX: 10 });
    const local = screenDeltaToLocal(transformDelta({ x: 3, y: -4 }, matrix), matrix);
    expect(local?.x).toBeCloseTo(3, 9);
    expect(local?.y).toBeCloseTo(-4, 9);
  });

  it('returns undefined for a transform that is not invertible', () => {
    expect(screenDeltaToLocal({ x: 1, y: 1 }, { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 })).toBeUndefined();
  });
});
