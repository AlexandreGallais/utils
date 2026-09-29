import { toEnumValue } from './to-enum-value.ts';

enum Mode {
  Day = 'day',
  Night = 'night',
}

enum Level {
  Low = 0,
  High = 1,
}

describe(toEnumValue, () => {
  it('keeps a member of the enum', () => {
    expect(toEnumValue(Mode, 'night', Mode.Day)).toBe(Mode.Night);
    expect(toEnumValue(Level, 1, Level.Low)).toBe(Level.High);
  });

  it.for(['dusk', undefined, null, 'Night', 0])('falls back for %j', (value) => {
    expect(toEnumValue(Mode, value, Mode.Day)).toBe(Mode.Day);
  });

  it('does not accept the names of a numeric enum', () => {
    expect(toEnumValue(Level, 'High', Level.Low)).toBe(Level.Low);
  });
});
