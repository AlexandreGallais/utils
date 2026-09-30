import { drawSvgBarTicks } from './draw-svg-bar-ticks';
import { renderSvg } from './testing';

describe(drawSvgBarTicks, () => {
  it.for([
    ['start', 'M 0 100 L 5 100 M 0 50 L 5 50 M 0 0 L 5 0'],
    ['end', 'M 20 100 L 15 100 M 20 50 L 15 50 M 20 0 L 15 0'],
  ] as const)('draws ticks from the %s side', ([side, expected]) => {
    const byId = renderSvg('<rect id="track" width="20" height="100" /><path id="ticks" />');
    drawSvgBarTicks(byId('ticks'), { element: byId('track'), direction: 'up' }, 2, 5, side);
    expect(byId('ticks').getAttribute('d')).toBe(expected);
  });

  it('starts from the start side by default', () => {
    const byId = renderSvg('<rect id="track" width="100" height="20" /><path id="ticks" />');
    drawSvgBarTicks(byId('ticks'), { element: byId('track'), direction: 'right' }, 1, 5);
    expect(byId('ticks').getAttribute('d')).toBe('M 0 0 L 0 5 M 100 0 L 100 5');
  });
});
