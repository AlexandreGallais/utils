import { isEnumValue } from './is-enum-value.ts';

enum Direction {
  Up = 0,
  Down = 1,
}

enum Color {
  Red = 'red',
  Green = 'green',
}

enum Sparse {
  Low = 1,
  High = 10,
}

describe(isEnumValue, () => {
  it('accepts the values of a numeric enum, not its names', () => {
    expect(isEnumValue(Direction, 0)).toBe(true);
    expect(isEnumValue(Direction, Direction.Down)).toBe(true);
    expect(isEnumValue(Direction, 'Up')).toBe(false);
    expect(isEnumValue(Direction, '0')).toBe(false);
    expect(isEnumValue(Direction, 2)).toBe(false);
  });

  it('accepts the values of a string enum, not its keys', () => {
    expect(isEnumValue(Color, 'red')).toBe(true);
    expect(isEnumValue(Color, 'Red')).toBe(false);
    expect(isEnumValue(Color, undefined)).toBe(false);
  });

  it('handles numeric enums with explicit values', () => {
    expect(isEnumValue(Sparse, 10)).toBe(true);
    expect(isEnumValue(Sparse, 'High')).toBe(false);
    expect(isEnumValue(Sparse, 5)).toBe(false);
  });

  it('handles const objects used as enums', () => {
    const status = { idle: 'idle', running: 'running' } as const;
    expect(isEnumValue(status, 'running')).toBe(true);
    expect(isEnumValue(status, 'stopped')).toBe(false);
  });
});
