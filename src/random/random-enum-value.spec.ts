import { randomEnumValue } from './random-enum-value.ts';

enum Status {
  Stopped = 0,
  Running = 1,
  Failed = 2,
}

enum Empty {}

describe(randomEnumValue, () => {
  it('draws among the values, not the reverse mapping', () => {
    expect(randomEnumValue(Status, () => 0)).toBe(Status.Stopped);
    expect(randomEnumValue(Status, () => 0.99)).toBe(Status.Failed);
    expect(Object.values(Status)).toContain(randomEnumValue(Status));
  });

  it('throws a RangeError for an empty enum', () => {
    expect(() => randomEnumValue(Empty)).toThrow(RangeError);
  });
});
