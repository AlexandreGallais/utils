import { getEnumKeys } from './get-enum-keys.ts';

enum Direction {
  Up = 0,
  Down = 1,
}

enum Status {
  Idle = 'idle',
}

describe(getEnumKeys, () => {
  it('lists the member names without the reverse mapping', () => {
    expect(getEnumKeys(Direction)).toStrictEqual(['Up', 'Down']);
    expect(getEnumKeys(Status)).toStrictEqual(['Idle']);
  });
});
