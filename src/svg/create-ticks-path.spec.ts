import { createTicksPath } from './create-ticks-path';

describe(createTicksPath, () => {
  it('joins every tick into one path', () => {
    expect(
      createTicksPath([
        { start: { x: 0, y: 0 }, end: { x: 0, y: 10 } },
        { start: { x: 5.12345, y: 0 }, end: { x: 5, y: -0.0001 } },
      ]),
    ).toBe('M 0 0 L 0 10 M 5.123 0 L 5 0');
  });

  it('returns an empty path without tick', () => {
    expect(createTicksPath([])).toBe('');
  });
});
