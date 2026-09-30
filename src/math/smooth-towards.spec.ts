import { smoothTowards } from './smooth-towards';

describe(smoothTowards, () => {
  it('covers about 63 % of the distance per time constant', () => {
    expect(smoothTowards(0, 100, 100, 100)).toBeCloseTo(63.212, 3);
  });

  it('gives the same result whatever the frame rate', () => {
    let fast = 0;
    for (let frame = 0; frame < 10; frame++) {
      fast = smoothTowards(fast, 100, 10, 100);
    }
    expect(fast).toBeCloseTo(smoothTowards(0, 100, 100, 100), 10);
  });

  it('jumps to the target without a time constant', () => {
    expect(smoothTowards(0, 100, 16, 0)).toBe(100);
  });
});
