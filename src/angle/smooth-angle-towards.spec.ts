import { smoothAngleTowards } from './smooth-angle-towards.ts';

describe(smoothAngleTowards, () => {
  it('turns the short way through north', () => {
    const angle = smoothAngleTowards(350, 10, 100, 100);
    // 20° gap, 1 - e^-1 of it covered.
    expect(angle).toBeCloseTo(350 + 20 * (1 - Math.exp(-1)) - 360, 10);
  });

  it('jumps without smoothing and stays in [0, 360[', () => {
    expect(smoothAngleTowards(350, 10, 100, 0)).toBe(10);
    expect(smoothAngleTowards(10, 350, 100, 0)).toBe(350);
    expect(smoothAngleTowards(-90, 720, 16, 0)).toBe(0);
  });

  it('does not move without elapsed time', () => {
    expect(smoothAngleTowards(90, 180, 0, 100)).toBe(90);
  });
});
