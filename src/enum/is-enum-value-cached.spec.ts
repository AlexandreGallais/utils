import { isEnumValueCached } from './is-enum-value-cached';

enum Direction {
  Up = 0,
  Down = 1,
}

enum Color {
  Red = 'red',
}

describe(isEnumValueCached, () => {
  it('accepts the values of a numeric enum, not its names', () => {
    expect(isEnumValueCached(Direction, 1)).toBe(true);
    expect(isEnumValueCached(Direction, 'Up')).toBe(false);
    expect(isEnumValueCached(Direction, 2)).toBe(false);
  });

  it('gives the same answers on later calls', () => {
    expect(isEnumValueCached(Color, 'red')).toBe(true);
    expect(isEnumValueCached(Color, 'red')).toBe(true);
    expect(isEnumValueCached(Color, 'Red')).toBe(false);
  });
});
