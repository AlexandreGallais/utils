import { composeMatrix } from './compose-matrix';
import { decomposeMatrix } from './decompose-matrix';
import type { DecomposedTransform } from './decomposed-transform';

function round(value: number): number {
  return Math.round(value * 1e9) / 1e9 + 0;
}

function rounded(transform: DecomposedTransform): DecomposedTransform {
  return {
    translateX: round(transform.translateX),
    translateY: round(transform.translateY),
    rotation: round(transform.rotation),
    scaleX: round(transform.scaleX),
    scaleY: round(transform.scaleY),
    skewX: round(transform.skewX),
  };
}

describe(decomposeMatrix, () => {
  it('reads a rotation and a scale', () => {
    expect(rounded(decomposeMatrix({ a: 0, b: 2, c: -2, d: 0, e: 10, f: 0 }))).toStrictEqual({
      translateX: 10,
      translateY: 0,
      rotation: 90,
      scaleX: 2,
      scaleY: 2,
      skewX: 0,
    });
  });

  it.for<DecomposedTransform>([
    { translateX: 5, translateY: -3, rotation: 30, scaleX: 1.5, scaleY: 0.5, skewX: 0 },
    { translateX: 0, translateY: 0, rotation: -120, scaleX: 2, scaleY: -1, skewX: 0 },
    { translateX: 1, translateY: 2, rotation: 45, scaleX: 1, scaleY: 1, skewX: 20 },
  ])('round-trips with composeMatrix: %j', (transform) => {
    expect(rounded(decomposeMatrix(composeMatrix(transform)))).toStrictEqual(transform);
  });

  it('reads a horizontal flip as a half turn with a negative scaleY', () => {
    expect(rounded(decomposeMatrix({ a: -1, b: 0, c: 0, d: 1, e: 0, f: 0 }))).toStrictEqual({
      translateX: 0,
      translateY: 0,
      rotation: 180,
      scaleX: 1,
      scaleY: -1,
      skewX: 0,
    });
  });

  it('handles matrices that flatten the plane', () => {
    expect(decomposeMatrix({ a: 0, b: 0, c: 0, d: 3, e: 0, f: 0 })).toMatchObject({ scaleX: 0, scaleY: 3, skewX: 0 });
    expect(decomposeMatrix({ a: 2, b: 0, c: 4, d: 0, e: 0, f: 0 })).toMatchObject({ scaleX: 2, scaleY: 0, skewX: 0 });
  });
});
