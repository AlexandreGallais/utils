import { formatNumberSimple } from './format-number-simple';

describe(formatNumberSimple, () => {
  it.for([
    [1234.5, '1.2-2', '1234.50'],
    [1_234_567.891, '1.0-2', '1234567.89'],
    [-9876.5, '1.0-0', '-9877'],
    [5, '3.0-2', '005'],
    [NaN, '1.0-2', 'NaN'],
  ] as const)('formats %s with %s as %s', ([value, digitsInfo, expected]) => {
    expect(formatNumberSimple(value, digitsInfo)).toBe(expected);
  });
});
