import { formatSigned } from './format-signed';

describe(formatSigned, () => {
  it.for([
    [3.21, 1, '+3.2'],
    [-1.5, 1, '-1.5'],
    [0.04, 1, '0'],
    [-0.04, 1, '0'],
    [0, 2, '0'],
    [Infinity, 0, '+Infinity'],
    [NaN, 0, 'NaN'],
  ] as const)('formats %s with %s decimals as %s', ([value, digits, expected]) => {
    expect(formatSigned(value, digits)).toBe(expected);
  });

  it('throws a RangeError for invalid digits', () => {
    expect(() => formatSigned(1, -1)).toThrow(RangeError);
  });
});
