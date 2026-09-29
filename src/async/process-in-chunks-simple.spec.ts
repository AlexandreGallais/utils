import { processInChunksSimple } from './process-in-chunks-simple.ts';

describe(processInChunksSimple, () => {
  it('processes every item', async () => {
    const seen: number[] = [];
    await processInChunksSimple([1, 2, 3], (value) => {
      seen.push(value);
    });
    expect(seen).toStrictEqual([1, 2, 3]);
  });
});
