import { createRingSectorPath } from './create-ring-sector-path';

const CENTER = { x: 50, y: 50 };

describe(createRingSectorPath, () => {
  it('draws a quarter band clockwise', () => {
    expect(createRingSectorPath(CENTER, 30, 40, 0, 90)).toBe(
      'M 50 10 A 40 40 0 0 1 90 50 L 80 50 A 30 30 0 0 0 50 20 Z',
    );
  });

  it('draws a large band counterclockwise', () => {
    expect(createRingSectorPath(CENTER, 30, 40, 90, -180)).toBe(
      'M 90 50 A 40 40 0 1 0 50 90 L 50 80 A 30 30 0 1 1 80 50 Z',
    );
  });

  it('draws a full ring as two circles', () => {
    expect(createRingSectorPath(CENTER, 30, 40, 0, 360)).toBe(
      'M 50 10 A 40 40 0 1 1 50 90 A 40 40 0 1 1 50 10 Z M 50 20 A 30 30 0 1 1 50 80 A 30 30 0 1 1 50 20 Z',
    );
  });
});
