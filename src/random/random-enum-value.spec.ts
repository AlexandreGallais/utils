import { randomEnumValue } from './random-enum-value';

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
    expect(Object.values(Status)).toContain(randomEnumValue(Status, Math.random));
  });

  it('throws a RangeError for an empty enum', () => {
    expect(() => randomEnumValue(Empty, Math.random)).toThrow(RangeError);
  });

  it('takes Math.random for null or undefined', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.3);
    expect(randomEnumValue(Status)).toBe(randomEnumValue(Status, Math.random));
    expect(randomEnumValue(Status, null)).toBe(randomEnumValue(Status, Math.random));
    vi.restoreAllMocks();
  });
});
