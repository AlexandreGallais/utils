import { createSvgArcPath } from './create-svg-arc-path';
import { renderSvg } from './testing';

describe(createSvgArcPath, () => {
  it.for([
    [-90, 180, 'M 10 50 A 40 40 0 0 1 90 50'],
    [0, -270, 'M 50 10 A 40 40 0 1 0 90 50'],
    [0, 360, 'M 50 10 A 40 40 0 1 1 50 90 A 40 40 0 1 1 50 10'],
  ] as const)('draws from %s° over %s°', ([startAngle, sweepAngle, expected]) => {
    const byId = renderSvg('<circle id="hub" cx="50" cy="50" r="5" /><path id="track" />');
    expect(createSvgArcPath(byId('track'), { center: byId('hub'), radius: 40, startAngle, sweepAngle })).toBe(expected);
  });

  it('centers on an element of another group', () => {
    const byId = renderSvg(
      '<g transform="translate(100 100)"><circle id="hub" r="5" /></g><g transform="scale(2)"><path id="track" /></g>',
    );
    expect(createSvgArcPath(byId('track'), { center: byId('hub'), radius: 10, startAngle: -90, sweepAngle: 180 })).toBe(
      'M 40 50 A 10 10 0 0 1 60 50',
    );
  });

  it('only reads the target, without writing it', () => {
    const byId = renderSvg('<circle id="hub" cx="50" cy="50" r="5" /><path id="track" />');
    createSvgArcPath(byId('track'), { center: byId('hub'), radius: 40, startAngle: 0, sweepAngle: 90 });
    expect(byId('track').hasAttribute('d')).toBe(false);
  });
});
