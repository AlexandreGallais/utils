import { truncate } from './truncate';

describe(truncate, () => {
  it.for([
    ['Engine room temperature', 12, 'Engine room…'],
    ['Short', 12, 'Short'],
    ['Exactly12chr', 12, 'Exactly12chr'],
    ['🚢🚢🚢🚢', 3, '🚢🚢…'],
    ['🇫🇷🇫🇷🇫🇷', 2, '🇫🇷…'],
    ['abc', 0, ''],
  ] as const)('truncates %j to %s characters', ([input, maxLength, expected]) => {
    expect(truncate(input, maxLength, '…')).toBe(expected);
  });

  it('uses a custom ellipsis', () => {
    expect(truncate('Engine room temperature', 12, '...')).toBe('Engine ro...');
    expect(truncate('Engine room temperature', 2, '...')).toBe('..');
  });

  it.for([-1, 1.5, NaN])('throws a RangeError for maxLength %s', (maxLength) => {
    expect(() => truncate('abc', maxLength, '…')).toThrow(RangeError);
  });
});
