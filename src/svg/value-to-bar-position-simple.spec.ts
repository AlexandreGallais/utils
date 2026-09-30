import { valueToBarPositionSimple } from './value-to-bar-position-simple';
import { valueToBarPosition } from './value-to-bar-position';

describe(valueToBarPositionSimple, () => {
  it('clamps to the bar', () => {
    const scale = { min: 0, max: 10, rect: { x: 0, y: 0, width: 20, height: 100 }, direction: 'up' } as const;
    expect(valueToBarPositionSimple(20, scale)).toBe(valueToBarPosition(20, scale, true));
  });
});
