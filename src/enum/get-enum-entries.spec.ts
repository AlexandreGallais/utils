import { getEnumEntries } from './get-enum-entries.ts';

enum Direction {
  Up = 0,
  Down = 1,
}

enum Status {
  Idle = 'idle',
  Running = 'running',
}

describe(getEnumEntries, () => {
  it('lists name and value pairs without the reverse mapping', () => {
    expect(getEnumEntries(Direction)).toStrictEqual([
      ['Up', 0],
      ['Down', 1],
    ]);
    expect(getEnumEntries(Status)).toStrictEqual([
      ['Idle', 'idle'],
      ['Running', 'running'],
    ]);
  });
});
