import { createSmoothPath } from './create-smooth-path';

describe(createSmoothPath, () => {
  it('passes through every point with cubic curves', () => {
    expect(
      createSmoothPath(
        [
          { x: 0, y: 0 },
          { x: 6, y: 6 },
          { x: 12, y: 0 },
        ],
        1,
      ),
    ).toBe('M 0 0 C 1 1 4 6 6 6 C 8 6 11 1 12 0');
  });

  it('draws straight lines with a zero tension', () => {
    expect(
      createSmoothPath(
        [
          { x: 0, y: 0 },
          { x: 10, y: 5 },
        ],
        0,
      ),
    ).toBe('M 0 0 C 0 0 10 5 10 5');
  });

  it('handles a single point and no point', () => {
    expect(createSmoothPath([{ x: 3, y: 4 }], 1)).toBe('M 3 4');
    expect(createSmoothPath([], 1)).toBe('');
  });

  it('takes the defaults for null or undefined', () => {
    expect(createSmoothPath()).toStrictEqual(createSmoothPath([], 1));
    expect(createSmoothPath(null, null)).toStrictEqual(createSmoothPath([], 1));
  });
});
