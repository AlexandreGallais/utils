import { processInChunks } from './process-in-chunks';

describe(processInChunks, () => {
  let time: number;

  function now(): number {
    return time;
  }

  beforeEach(() => {
    time = 0;
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('processes every item in order with its index', async () => {
    const seen: string[] = [];
    await processInChunks(
      ['a', 'b', 'c'],
      (item, index) => {
        seen.push(`${index}:${item}`);
      },
      {},
    );
    expect(seen).toStrictEqual(['0:a', '1:b', '2:c']);
  });

  it('gives the main thread back once the budget is spent', async () => {
    const processed: number[] = [];
    const promise = processInChunks(
      [1, 2, 3, 4],
      (item) => {
        processed.push(item);
        time += 5;
      },
      { budgetMs: 10, now },
    );
    await Promise.resolve();
    expect(processed).toStrictEqual([1, 2]);
    await vi.advanceTimersByTimeAsync(0);
    await promise;
    expect(processed).toStrictEqual([1, 2, 3, 4]);
  });

  it('stops when the signal is aborted between slices', async () => {
    const controller = new AbortController();
    const callback = vi.fn<(item: number) => void>(() => {
      time += 10;
    });
    const promise = processInChunks([1, 2, 3], callback, { budgetMs: 10, now, signal: controller.signal });
    controller.abort(new Error('Cancelled'));
    await Promise.all([expect(promise).rejects.toThrow('Cancelled'), vi.advanceTimersByTimeAsync(0)]);
    expect(callback).toHaveBeenCalledOnce();
  });

  it('does not start with an aborted signal', async () => {
    const callback = vi.fn<(item: number) => void>();
    await expect(processInChunks([1], callback, { signal: AbortSignal.abort() })).rejects.toThrow(
      expect.objectContaining({ name: 'AbortError' }),
    );
    expect(callback).not.toHaveBeenCalled();
  });

  it('accepts any iterable and reads performance.now() by default', async () => {
    const seen: number[] = [];
    await processInChunks(
      new Set([1, 2]),
      (item) => {
        seen.push(item);
      },
      {},
    );
    expect(seen).toStrictEqual([1, 2]);
  });

  it('takes an empty list and empty options for null or undefined', async () => {
    const seen: string[] = [];
    const push = (item: string): void => {
      seen.push(item);
    };
    await processInChunks(undefined, push);
    await processInChunks(null, push, null);
    await processInChunks(['a'], push);
    expect(seen).toStrictEqual(['a']);
  });
});
