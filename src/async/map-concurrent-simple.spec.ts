import { mapConcurrentSimple } from './map-concurrent-simple';

describe(mapConcurrentSimple, () => {
  it('keeps the order', async () => {
    await expect(
      mapConcurrentSimple(
        [1, 2, 3],
        async (value) => {
          await Promise.resolve();
          return value * 2;
        },
        2,
      ),
    ).resolves.toStrictEqual([2, 4, 6]);
  });
});
