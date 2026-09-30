import { formatNumber } from './format-number';

describe(formatNumber, () => {
  it.for([
    [Math.PI, '1.0-2', '3.14'],
    [5, '3.0-2', '005'],
    [1234.5, '1.2-2', '1234.50'],
    [1_234_567.891, '1.0-2', '1234567.89'],
    [0.5, '1.0-0', '1'],
    [-0.001, '1.0-2', '0'],
    [1.23456, '.1-1', '1.2'],
    [1.23456, '2.', '01.235'],
    [1.2, '1.5', '1.20000'],
  ] as const)('formats %s with %s as %s', ([value, digitsInfo, expected]) => {
    expect(formatNumber(value, digitsInfo, 'en-US')).toBe(expected);
  });

  it('uses the separators and grouping of the locale when grouping', () => {
    expect(formatNumber(1_234_567.891, '1.0-2', 'en-US', true)).toBe('1,234,567.89');
    expect(formatNumber(1234.5, '1.2-2', 'fr-FR', true)).toBe('1\u{202F}234,50');
    expect(formatNumber(1234.5, '1.2-2', 'de-DE', true)).toBe('1.234,50');
    expect(formatNumber(1234.5, '1.2-2', 'de-DE', false)).toBe('1234,50');
  });

  it('takes 1.0-3, en-US and no grouping for null or undefined', () => {
    expect(formatNumber(1234.5678)).toBe('1234.568');
    expect(formatNumber(1234.5678, null, null, null)).toBe('1234.568');
  });

  it('formats NaN and infinities like String()', () => {
    expect(formatNumber(NaN, '1.0-2', 'en-US')).toBe('NaN');
    expect(formatNumber(-Infinity, '1.0-2', 'en-US')).toBe('-Infinity');
  });

  it('returns the same output from the cached formatter', () => {
    expect(formatNumber(1.5, '1.1-1', 'en-US')).toBe('1.5');
    expect(formatNumber(2.25, '1.1-1', 'en-US')).toBe('2.3');
  });

  it.for(['', '1', '1-2', 'a.0-2', '1.0-', '1.2-2-3', '0.0-2', '22.0-2', '1.0-101', '1.3-2'])(
    'throws a RangeError for digitsInfo %j',
    (digitsInfo) => {
      expect(() => formatNumber(1, digitsInfo, 'en-US')).toThrow(RangeError);
    },
  );
});
