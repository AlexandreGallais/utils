import { getEnumValues } from './get-enum-values';

enum Direction {
  Up = 0,
  Down = 1,
}

enum Status {
  Idle = 'idle',
  Running = 'running',
}

enum Sparse {
  Low = 1,
  High = 10,
}

describe(getEnumValues, () => {
  it('lists the values of a numeric enum without the reverse mapping', () => {
    expect(getEnumValues(Direction)).toStrictEqual([0, 1]);
    expect(getEnumValues(Sparse)).toStrictEqual([1, 10]);
  });

  it('lists the values of a string enum', () => {
    expect(getEnumValues(Status)).toStrictEqual(['idle', 'running']);
  });

  it('lists the values of a const object used as an enum', () => {
    expect(getEnumValues({ small: 's', large: 'l' } as const)).toStrictEqual(['s', 'l']);
  });
});
