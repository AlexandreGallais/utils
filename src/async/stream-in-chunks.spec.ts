import { streamInChunks } from './stream-in-chunks';

describe(streamInChunks, () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('delivers the first chunk at once, then one per interval', async () => {
    const received: number[][] = [];
    async function consume(): Promise<void> {
      for await (const part of streamInChunks([1, 2, 3, 4, 5], 2, 100, undefined)) {
        received.push(part);
      }
    }
    const done = consume();
    await vi.advanceTimersByTimeAsync(0);
    expect(received).toStrictEqual([[1, 2]]);
    await vi.advanceTimersByTimeAsync(100);
    expect(received).toStrictEqual([
      [1, 2],
      [3, 4],
    ]);
    await vi.advanceTimersByTimeAsync(100);
    await done;
    expect(received).toStrictEqual([[1, 2], [3, 4], [5]]);
  });

  it('delivers nothing for an empty list', async () => {
    const received: number[][] = [];
    for await (const part of streamInChunks<number>([], 2, 100, undefined)) {
      received.push(part);
    }
    expect(received).toStrictEqual([]);
  });

  it('stops when the signal is aborted', async () => {
    const controller = new AbortController();
    const received: number[][] = [];
    async function consume(): Promise<void> {
      for await (const part of streamInChunks([1, 2, 3], 1, 100, controller.signal)) {
        received.push(part);
        controller.abort(new Error('Closed'));
      }
    }
    await expect(consume()).rejects.toThrow('Closed');
    expect(received).toStrictEqual([[1]]);
  });

  it('rejects an invalid chunk size', async () => {
    await expect(streamInChunks([1], 0, 100, undefined).next()).rejects.toThrow(RangeError);
  });
});
