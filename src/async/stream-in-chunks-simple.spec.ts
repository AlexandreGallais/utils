import { streamInChunksSimple } from './stream-in-chunks-simple';

describe(streamInChunksSimple, () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('delivers every chunk', async () => {
    const chunks: number[][] = [];
    const done = (async (): Promise<void> => {
      for await (const part of streamInChunksSimple([1, 2, 3], 2, 10)) {
        chunks.push(part);
      }
    })();
    await vi.advanceTimersByTimeAsync(10);
    await done;
    expect(chunks).toStrictEqual([[1, 2], [3]]);
  });
});
