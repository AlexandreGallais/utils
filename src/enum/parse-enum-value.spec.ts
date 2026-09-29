import { parseEnumValue } from './parse-enum-value.ts';

enum Level {
  Low = 0,
  High = 1,
}

enum Mode {
  Day = 'day',
  Night = 'night',
}

describe(parseEnumValue, () => {
  it.for([
    ['1', Level.High],
    [1, Level.High],
    ['0', Level.Low],
    ['7', undefined],
    ['High', undefined],
    [undefined, undefined],
    [true, undefined],
  ] as const)('reads %j from a numeric enum as %s', ([input, expected]) => {
    expect(parseEnumValue(Level, input, false)).toBe(expected);
  });

  it('reads string enums', () => {
    expect(parseEnumValue(Mode, 'night', false)).toBe(Mode.Night);
    expect(parseEnumValue(Mode, 'Night', false)).toBeUndefined();
  });

  it('accepts member names on request', () => {
    expect(parseEnumValue(Level, 'High', true)).toBe(Level.High);
    expect(parseEnumValue(Mode, 'Night', true)).toBe(Mode.Night);
  });
});
