import { getEnumKey } from './get-enum-key';

enum Status {
  Idle = 'idle',
  Running = 'running',
}

enum Level {
  Low = 0,
  High = 1,
}

describe(getEnumKey, () => {
  it('names the value of a string or numeric enum', () => {
    expect(getEnumKey(Status, 'running')).toBe('Running');
    expect(getEnumKey(Level, 1)).toBe('High');
  });

  it('returns undefined for a value outside the enum', () => {
    expect(getEnumKey(Status, 'stopped')).toBeUndefined();
    expect(getEnumKey(Level, '1')).toBeUndefined();
  });
});
