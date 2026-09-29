import { createArrowPathSimple } from './create-arrow-path-simple.ts';

describe(createArrowPathSimple, () => {
  it('draws a square head', () => {
    expect(createArrowPathSimple({ x: 0, y: 0 }, { x: 10, y: 0 }, 4)).toBe('M 0 0 L 6 0 M 6 -2 L 10 0 L 6 2 Z');
  });
});
