import { createSeededRandom } from './create-seeded-random.ts';

describe(createSeededRandom, () => {
  it('replays the same sequence for the same seed', () => {
    const first = createSeededRandom(42);
    const second = createSeededRandom(42);
    const sequence = [first(), first(), first()];
    expect([second(), second(), second()]).toStrictEqual(sequence);
  });

  it('gives different sequences for different seeds', () => {
    expect(createSeededRandom(1)()).not.toBe(createSeededRandom(2)());
  });

  it('matches the reference mulberry32 output', () => {
    const random = createSeededRandom(0);
    expect([random(), random(), random()]).toStrictEqual([
      0.26642920868471265, 0.0003297457005828619, 0.2232720274478197,
    ]);
  });

  it('stays in [0, 1[ and spreads evenly', () => {
    const random = createSeededRandom(7);
    const values = Array.from({ length: 10_000 }, () => random());
    expect(Math.min(...values)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...values)).toBeLessThan(1);
    expect(values.filter((value) => value < 0.5).length / values.length).toBeCloseTo(0.5, 1);
  });
});
