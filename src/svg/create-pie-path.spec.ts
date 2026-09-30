import { createPiePath } from './create-pie-path';

describe(createPiePath, () => {
  it('draws a slice joined to the center', () => {
    expect(createPiePath({ x: 50, y: 50 }, 40, 0, 90)).toBe('M 50 50 L 50 10 A 40 40 0 0 1 90 50 Z');
  });

  it('draws the large arc beyond a half turn', () => {
    expect(createPiePath({ x: 0, y: 0 }, 10, 0, 270)).toBe('M 0 0 L 0 -10 A 10 10 0 1 1 -10 0 Z');
  });

  it('draws the full disk for a full turn', () => {
    expect(createPiePath({ x: 10, y: 10 }, 5, 90, 450)).toBe('M 10 5 A 5 5 0 1 1 10 15 A 5 5 0 1 1 10 5 Z');
  });

  it('returns an empty path for an empty slice', () => {
    expect(createPiePath({ x: 0, y: 0 }, 10, 45, 45)).toBe('');
  });

  it('takes the defaults for null or undefined', () => {
    expect(createPiePath()).toStrictEqual(createPiePath({ x: 0, y: 0 }, 0, 0, 360));
    expect(createPiePath(null, null, null, null)).toStrictEqual(createPiePath({ x: 0, y: 0 }, 0, 0, 360));
  });
});
