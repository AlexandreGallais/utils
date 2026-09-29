import { retrySimple } from './retry-simple.ts';

describe(retrySimple, () => {
  it('returns the first success', async () => {
    await expect(
      retrySimple(async () => {
        await Promise.resolve();
        return 7;
      }),
    ).resolves.toBe(7);
  });
});
