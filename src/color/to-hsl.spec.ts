import { toHsl } from './to-hsl';

describe(toHsl, () => {
  it.for([
    { color: { r: 255, g: 0, b: 0 }, expected: { h: 0, s: 1, l: 0.5, a: 1 } },
    { color: { r: 0, g: 255, b: 0 }, expected: { h: 120, s: 1, l: 0.5, a: 1 } },
    { color: { r: 0, g: 0, b: 255 }, expected: { h: 240, s: 1, l: 0.5, a: 1 } },
    { color: { r: 255, g: 0, b: 255 }, expected: { h: 300, s: 1, l: 0.5, a: 1 } },
    { color: { r: 255, g: 255, b: 255 }, expected: { h: 0, s: 0, l: 1, a: 1 } },
    { color: { r: 0, g: 0, b: 0, a: 0.5 }, expected: { h: 0, s: 0, l: 0, a: 0.5 } },
  ])('converts $color', ({ color, expected }) => {
    expect(toHsl(color)).toStrictEqual(expected);
  });

  it('converts an intermediate color', () => {
    const { h, s, l } = toHsl({ r: 51, g: 102, b: 153 });
    expect([Math.round(h), Math.round(s * 100), Math.round(l * 100)]).toStrictEqual([210, 50, 40]);
  });
});
