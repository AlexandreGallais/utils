import { measureDuration } from './measure-duration.ts';

describe(measureDuration, () => {
  it('returns the result and the elapsed time', () => {
    const now = vi.fn<() => number>().mockReturnValueOnce(100).mockReturnValueOnce(112.5);
    expect(measureDuration(() => 'done', now)).toStrictEqual({ result: 'done', durationMs: 12.5 });
  });

  it('uses performance.now by default', () => {
    const { result, durationMs } = measureDuration(() => 42);
    expect(result).toBe(42);
    expect(durationMs).toBeGreaterThanOrEqual(0);
  });
});
