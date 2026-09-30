import { getTimeTicksSimple } from './get-time-ticks-simple';

describe(getTimeTicksSimple, () => {
  it('gives a round step', () => {
    const noon = new Date(2026, 0, 15, 12);
    const now = noon.getTime();
    expect(getTimeTicksSimple(now, now + 600_000).stepMs).toBe(120_000);
  });
});
