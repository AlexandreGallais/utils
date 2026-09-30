import { measureDurationSimple } from './measure-duration-simple';

describe(measureDurationSimple, () => {
  it('returns the result and a duration', () => {
    const { result, durationMs } = measureDurationSimple(() => 42);
    expect(result).toBe(42);
    expect(durationMs).toBeGreaterThanOrEqual(0);
  });
});
