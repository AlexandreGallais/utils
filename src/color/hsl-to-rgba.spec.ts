import { hslToRgba } from './hsl-to-rgba';
import { toHsl } from './to-hsl';

describe(hslToRgba, () => {
  it.for([
    { hsl: { h: 210, s: 0.5, l: 0.4, a: 1 }, expected: { r: 51, g: 102, b: 153, a: 1 } },
    { hsl: { h: -120, s: 1, l: 0.5, a: 0.3 }, expected: { r: 0, g: 0, b: 255, a: 0.3 } },
    { hsl: { h: 480, s: 2, l: 0.5, a: 1 }, expected: { r: 0, g: 255, b: 0, a: 1 } },
    { hsl: { h: 0, s: 0, l: -1, a: 1 }, expected: { r: 0, g: 0, b: 0, a: 1 } },
  ])('converts $hsl', ({ hsl, expected }) => {
    expect(hslToRgba(hsl)).toStrictEqual(expected);
  });

  it('round-trips with toHsl', () => {
    const color = { r: 17, g: 200, b: 99, a: 1 };
    expect(hslToRgba(toHsl(color))).toStrictEqual(color);
  });
});
