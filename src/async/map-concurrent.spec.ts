import { mapConcurrent } from './map-concurrent';

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

describe(mapConcurrent, () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('keeps the order of the items', async () => {
    const promise = mapConcurrent(
      [30, 10, 20],
      async (ms, index) => {
        await delay(ms);
        return `${index}:${ms}`;
      },
      2,
      undefined,
    );
    await vi.advanceTimersByTimeAsync(100);
    await expect(promise).resolves.toStrictEqual(['0:30', '1:10', '2:20']);
  });

  it('never runs more calls than the concurrency', async () => {
    let running = 0;
    let maxRunning = 0;
    const promise = mapConcurrent(
      Array.from({ length: 10 }, (_, index) => index),
      async (value) => {
        running += 1;
        maxRunning = Math.max(maxRunning, running);
        await delay(10);
        running -= 1;
        return value;
      },
      3,
      undefined,
    );
    await vi.advanceTimersByTimeAsync(100);
    await promise;
    expect(maxRunning).toBe(3);
  });

  it('rejects with the first error and starts no new call', async () => {
    const mapper = vi.fn<(value: number) => Promise<number>>(async (value) => {
      await delay(10);
      if (value === 1) {
        throw new Error('failed 1');
      }
      return value;
    });
    await Promise.all([
      expect(mapConcurrent([0, 1, 2, 3, 4], mapper, 2, undefined)).rejects.toThrow('failed 1'),
      vi.advanceTimersByTimeAsync(100),
    ]);
    expect(mapper).toHaveBeenCalledTimes(3);
  });

  it('stops starting calls once the signal is aborted', async () => {
    const controller = new AbortController();
    const mapper = vi.fn<(value: number, index: number, signal: AbortSignal | undefined) => Promise<number>>(
      async (value) => {
        await delay(10);
        controller.abort(new Error('cancelled'));
        return value;
      },
    );
    await Promise.all([
      expect(mapConcurrent([0, 1, 2, 3], mapper, 1, controller.signal)).rejects.toThrow('cancelled'),
      vi.advanceTimersByTimeAsync(100),
    ]);
    expect(mapper).toHaveBeenCalledExactlyOnceWith(0, 0, controller.signal);
  });

  it('returns an empty list for no item', async () => {
    await expect(mapConcurrent([], vi.fn<() => Promise<number>>(), 2, undefined)).resolves.toStrictEqual([]);
  });

  it.for([0, -1, 1.5])('throws a RangeError for concurrency %s', async (concurrency) => {
    await expect(mapConcurrent([1], vi.fn<() => Promise<number>>(), concurrency, undefined)).rejects.toThrow(
      RangeError,
    );
  });
});
