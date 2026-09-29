import { formatHeading } from './format-heading.ts';

describe(formatHeading, () => {
  it.for([
    [5, 0, '005°'],
    [270, 0, '270°'],
    [359.7, 0, '000°'],
    [-12.34, 1, '347.7°'],
    [725, 0, '005°'],
    [45.25, 2, '045.25°'],
    [NaN, 0, 'NaN'],
  ] as const)('formats %s with %s decimals as %s', ([degrees, digits, expected]) => {
    expect(formatHeading(degrees, digits)).toBe(expected);
  });

  it('rounds to whole degrees', () => {
    expect(formatHeading(12.6, 0)).toBe('013°');
  });

  it('throws a RangeError for invalid digits', () => {
    expect(() => formatHeading(1, -1)).toThrow(RangeError);
  });
});
