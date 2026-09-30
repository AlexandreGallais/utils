import { createArcPath } from './create-arc-path';

const CENTER = { x: 50, y: 50 };

describe(createArcPath, () => {
  it.for([
    [0, 90, 'M 50 10 A 40 40 0 0 1 90 50'],
    [90, 0, 'M 90 50 A 40 40 0 0 0 50 10'],
    [-135, 135, 'M 21.716 78.284 A 40 40 0 1 1 78.284 78.284'],
    [0, 180, 'M 50 10 A 40 40 0 0 1 50 90'],
    [0, 0, 'M 50 10 A 40 40 0 0 0 50 10'],
  ] as const)('draws the arc from %s° to %s°', ([start, end, expected]) => {
    expect(createArcPath(CENTER, 40, start, end)).toBe(expected);
  });

  it('draws a full circle as two half arcs', () => {
    expect(createArcPath(CENTER, 40, 0, 360)).toBe('M 50 10 A 40 40 0 1 1 50 90 A 40 40 0 1 1 50 10');
    expect(createArcPath(CENTER, 40, 0, -400)).toBe('M 50 10 A 40 40 0 1 0 50 90 A 40 40 0 1 0 50 10');
  });
});
