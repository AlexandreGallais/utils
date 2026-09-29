import { createRoundedRectPath } from './create-rounded-rect-path.ts';

describe(createRoundedRectPath, () => {
  it('rounds the four corners', () => {
    expect(createRoundedRectPath({ x: 0, y: 0, width: 40, height: 20 }, 4)).toBe(
      'M 4 0 H 36 A 4 4 0 0 1 40 4 V 16 A 4 4 0 0 1 36 20 H 4 A 4 4 0 0 1 0 16 V 4 A 4 4 0 0 1 4 0 Z',
    );
  });

  it('caps the radius to half the smaller side', () => {
    expect(createRoundedRectPath({ x: 10, y: 10, width: 20, height: 20 }, 50)).toBe(
      'M 20 10 H 20 A 10 10 0 0 1 30 20 V 20 A 10 10 0 0 1 20 30 H 20 A 10 10 0 0 1 10 20 V 20 A 10 10 0 0 1 20 10 Z',
    );
  });

  it('draws sharp corners for a zero or negative radius', () => {
    expect(createRoundedRectPath({ x: 0, y: 0, width: 10, height: 5 }, -1)).toBe(
      'M 0 0 H 10 A 0 0 0 0 1 10 0 V 5 A 0 0 0 0 1 10 5 H 0 A 0 0 0 0 1 0 5 V 0 A 0 0 0 0 1 0 0 Z',
    );
  });
});
