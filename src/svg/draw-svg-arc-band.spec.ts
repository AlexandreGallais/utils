import { drawSvgArcBand } from './draw-svg-arc-band';
import { renderSvg } from './testing';

describe(drawSvgArcBand, () => {
  it.for([
    [0, 90, 'M 50 10 A 40 40 0 0 1 90 50 L 80 50 A 30 30 0 0 0 50 20 Z'],
    [90, -270, 'M 90 50 A 40 40 0 1 0 50 90 L 50 80 A 30 30 0 1 1 80 50 Z'],
    [0, 360, 'M 50 10 A 40 40 0 1 1 50 90 A 40 40 0 1 1 50 10 Z M 50 20 A 30 30 0 1 1 50 80 A 30 30 0 1 1 50 20 Z'],
  ] as const)('draws a band from %s° over %s°', ([startAngle, sweepAngle, expected]) => {
    const byId = renderSvg('<circle id="hub" cx="50" cy="50" r="5" /><path id="zone" />');
    drawSvgArcBand(byId('zone'), { center: byId('hub'), radius: 35, startAngle, sweepAngle }, 10);
    expect(byId('zone').getAttribute('d')).toBe(expected);
  });
});
