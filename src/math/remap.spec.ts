import { remap } from './remap.ts';

describe(remap, () => {
  it('maps between ranges', () => {
    expect(remap(5, 0, 10, 0, 100, false)).toBe(50);
    expect(remap(5, 0, 10, 100, 0, false)).toBe(50);
    expect(remap(2, 0, 10, 100, 200, false)).toBe(120);
  });

  it('extrapolates unless the output is clamped', () => {
    expect(remap(15, 0, 10, 0, 100, false)).toBe(150);
    expect(remap(15, 0, 10, 0, 100, true)).toBe(100);
    expect(remap(-5, 0, 10, 0, 100, true)).toBe(0);
  });

  it('returns outMin for an empty input range', () => {
    expect(remap(3, 1, 1, 0, 100, false)).toBe(0);
  });
});
