import { formatRotation } from './format-rotation.ts';

describe(formatRotation, () => {
  it('writes a rotation around the center', () => {
    expect(formatRotation(45, { x: 50, y: 50 })).toBe('rotate(45 50 50)');
    expect(formatRotation(-12.345678, { x: 0, y: 1.5 })).toBe('rotate(-12.346 0 1.5)');
  });
});
