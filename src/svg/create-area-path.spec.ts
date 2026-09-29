import { createAreaPath } from './create-area-path.ts';

describe(createAreaPath, () => {
  it('closes the area down to the baseline', () => {
    expect(
      createAreaPath(
        [
          { x: 0, y: 5 },
          { x: 10, y: 2 },
        ],
        20,
      ),
    ).toBe('M 0 20 L 0 5 L 10 2 L 10 20 Z');
  });

  it('draws a single point as a vertical segment', () => {
    expect(createAreaPath([{ x: 3, y: 1 }], 0)).toBe('M 3 0 L 3 1 L 3 0 Z');
  });

  it('returns an empty path without point', () => {
    expect(createAreaPath([], 10)).toBe('');
  });
});
