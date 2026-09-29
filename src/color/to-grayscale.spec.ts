import { getRelativeLuminance } from './get-relative-luminance.ts';
import { toGrayscale } from './to-grayscale.ts';

describe(toGrayscale, () => {
  it.for([
    { color: { r: 255, g: 255, b: 255 }, expected: 255 },
    { color: { r: 0, g: 0, b: 0 }, expected: 0 },
    { color: { r: 1, g: 1, b: 1 }, expected: 1 },
    { color: { r: 120, g: 120, b: 120 }, expected: 120 },
  ])('keeps the gray $expected unchanged', ({ color, expected }) => {
    expect(toGrayscale(color)).toStrictEqual({ r: expected, g: expected, b: expected, a: 1 });
  });

  it('keeps the luminance of a color and its opacity', () => {
    const gray = toGrayscale({ r: 255, g: 0, b: 0, a: 0.5 });
    expect(gray.a).toBe(0.5);
    expect(getRelativeLuminance(gray)).toBeCloseTo(getRelativeLuminance({ r: 255, g: 0, b: 0 }), 2);
  });
});
