import { createSvgArcTicksPath } from './create-svg-arc-ticks-path';
import { renderSvg } from './testing';

describe(createSvgArcTicksPath, () => {
  it('draws count + 1 ticks towards the center', () => {
    const byId = renderSvg('<circle id="hub" cx="50" cy="50" r="5" /><path id="ticks" />');
    expect(
      createSvgArcTicksPath(
        byId('ticks'),
        { center: byId('hub'), radius: 40, startAngle: -90, sweepAngle: 180 },
        2,
        10,
      ),
    ).toBe('M 10 50 L 20 50 M 50 10 L 50 20 M 90 50 L 80 50');
  });
});
