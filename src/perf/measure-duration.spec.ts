import { measureDuration } from './measure-duration';

describe(measureDuration, () => {
  it('returns the result and the elapsed time', () => {
    const now = vi.fn<() => number>().mockReturnValueOnce(100).mockReturnValueOnce(112.5);
    expect(measureDuration(() => 'done', now)).toStrictEqual({ result: 'done', durationMs: 12.5 });
  });

  it('reads performance.now', () => {
    const { result, durationMs } = measureDuration(
      () => 42,
      () => performance.now(),
    );
    expect(result).toBe(42);
    expect(durationMs).toBeGreaterThanOrEqual(0);
  });

  it('reads performance.now for null or undefined', () => {
    for (const { result, durationMs } of [measureDuration(() => 1), measureDuration(() => 1, null)]) {
      expect(result).toBe(1);
      expect(durationMs).toBeGreaterThanOrEqual(0);
    }
  });
});
