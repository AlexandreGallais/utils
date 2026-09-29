import { createLinearScale } from './create-linear-scale.ts';

describe(createLinearScale, () => {
  it('maps values to coordinates and back', () => {
    const y = createLinearScale([0, 100], [200, 0]);
    expect(y(25)).toBe(150);
    expect(y(150)).toBe(-100);
    expect(y.invert(50)).toBe(75);
  });

  it('exposes its domain and range', () => {
    const x = createLinearScale([10, 20], [0, 500]);
    expect(x.domain).toStrictEqual([10, 20]);
    expect(x.range).toStrictEqual([0, 500]);
    expect(x(12)).toBe(100);
  });

  it('maps an empty domain to the start of the range', () => {
    expect(createLinearScale([5, 5], [0, 100])(7)).toBe(0);
  });
});
