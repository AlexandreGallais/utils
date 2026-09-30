import { formatDecimal } from './format-decimal';

describe(formatDecimal, () => {
  it.for([
    [2, 2, '2'],
    [1.5, 3, '1.5'],
    [0.0000001, 8, '0.0000001'],
    [1.005, 2, '1.01'],
    [-0.001, 2, '0'],
    [-0, 2, '0'],
    [-1.25, 1, '-1.3'],
    [1_234_567.891, 2, '1234567.89'],
    [1e21, 0, '1000000000000000000000'],
    [Math.PI, 0, '3'],
  ] as const)('formats %s with %s digits as %s', ([value, digits, expected]) => {
    expect(formatDecimal(value, digits)).toBe(expected);
  });

  it.for([
    [NaN, 'NaN'],
    [Infinity, 'Infinity'],
    [-Infinity, '-Infinity'],
  ] as const)('formats %s as %s', ([value, expected]) => {
    expect(formatDecimal(value, 2)).toBe(expected);
  });

  it.for([-1, 1.5, 101, NaN])('throws a RangeError for maxFractionDigits %s', (digits) => {
    expect(() => formatDecimal(1, digits)).toThrow(RangeError);
  });

  it('accepts the maxFractionDigits bounds', () => {
    expect(formatDecimal(1.5, 0)).toBe('2');
    expect(formatDecimal(1.5, 100)).toBe('1.5');
  });
});
