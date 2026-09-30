import { drawSvgArcTicks } from './draw-svg-arc-ticks';
import { renderSvg } from './testing';

describe(drawSvgArcTicks, () => {
  it('draws count + 1 ticks towards the center', () => {
    const byId = renderSvg('<circle id="hub" cx="50" cy="50" r="5" /><path id="ticks" />');
    drawSvgArcTicks(byId('ticks'), { center: byId('hub'), radius: 40, startAngle: -90, sweepAngle: 180 }, 2, 10);
    expect(byId('ticks').getAttribute('d')).toBe('M 10 50 L 20 50 M 50 10 L 50 20 M 90 50 L 80 50');
  });
});
