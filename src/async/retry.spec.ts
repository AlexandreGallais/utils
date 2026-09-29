import { retry } from './retry.ts';

describe(retry, () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the first success', async () => {
    const operation = vi.fn<(attempt: number) => Promise<string>>().mockResolvedValue('ok');
    await expect(retry(operation, {})).resolves.toBe('ok');
    expect(operation).toHaveBeenCalledExactlyOnceWith(1);
  });

  it('retries with growing delays until it succeeds', async () => {
    const operation = vi
      .fn<(attempt: number) => Promise<string>>()
      .mockRejectedValueOnce(new Error('down'))
      .mockRejectedValueOnce(new Error('down'))
      .mockResolvedValue('up');
    const promise = retry(operation, { delayMs: 100 });
    await vi.advanceTimersByTimeAsync(99);
    expect(operation).toHaveBeenCalledOnce();
    await vi.advanceTimersByTimeAsync(1 + 199);
    expect(operation).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(1);
    await expect(promise).resolves.toBe('up');
  });

  it('rejects with the last error once the retries are exhausted', async () => {
    const operation = vi.fn<() => Promise<never>>().mockRejectedValue(new Error('down'));
    await Promise.all([
      expect(retry(operation, { retries: 2, delayMs: 10, maxDelayMs: 15 })).rejects.toThrow('down'),
      vi.advanceTimersByTimeAsync(100),
    ]);
    expect(operation).toHaveBeenCalledTimes(3);
  });

  it('does not retry the errors refused by shouldRetry', async () => {
    const operation = vi.fn<() => Promise<never>>().mockRejectedValue(new Error('404'));
    await expect(retry(operation, { shouldRetry: (error) => !String(error).includes('404') })).rejects.toThrow('404');
    expect(operation).toHaveBeenCalledOnce();
  });

  it('stops when the signal is aborted', async () => {
    const controller = new AbortController();
    const operation = vi.fn<() => Promise<never>>().mockRejectedValue(new Error('down'));
    const promise = retry(operation, { signal: controller.signal });
    controller.abort(new Error('Cancelled'));
    await expect(promise).rejects.toThrow('Cancelled');
    await expect(retry(operation, { signal: controller.signal })).rejects.toThrow('Cancelled');
  });
});
