import { getGradientColor } from './get-gradient-color';

const HEAT = [
  { offset: 0, color: { r: 0, g: 128, b: 255 } },
  { offset: 50, color: { r: 0, g: 200, b: 0 } },
  { offset: 100, color: { r: 255, g: 0, b: 0, a: 0.5 } },
];

describe(getGradientColor, () => {
  it.for([
    { value: -10, expected: { r: 0, g: 128, b: 255, a: 1 } },
    { value: 0, expected: { r: 0, g: 128, b: 255, a: 1 } },
    { value: 25, expected: { r: 0, g: 164, b: 127.5, a: 1 } },
    { value: 50, expected: { r: 0, g: 200, b: 0, a: 1 } },
    { value: 75, expected: { r: 127.5, g: 100, b: 0, a: 0.75 } },
    { value: 150, expected: { r: 255, g: 0, b: 0, a: 0.5 } },
  ])('colors $value', ({ value, expected }) => {
    expect(getGradientColor(HEAT, value)).toStrictEqual(expected);
  });

  it('returns undefined without stop', () => {
    expect(getGradientColor([], 1)).toBeUndefined();
  });
});
