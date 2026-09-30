import { createSvgPiePath } from './create-svg-pie-path';
import { renderSvg } from './testing';

describe(createSvgPiePath, () => {
  it.for([
    [0, 90, 'M 50 50 L 50 10 A 40 40 0 0 1 90 50 Z'],
    [0, 360, 'M 50 10 A 40 40 0 1 1 50 90 A 40 40 0 1 1 50 10 Z'],
  ] as const)('draws a slice from %s° over %s°', ([startAngle, sweepAngle, expected]) => {
    const byId = renderSvg('<circle id="face" cx="50" cy="50" r="5" /><path id="pie" />');
    expect(createSvgPiePath(byId('pie'), { center: byId('face'), radius: 40, startAngle, sweepAngle })).toBe(expected);
  });
});
