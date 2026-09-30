import { createSvgBarTicksPath } from './create-svg-bar-ticks-path';
import { renderSvg } from './testing';

describe(createSvgBarTicksPath, () => {
  it.for([
    ['start', 'M 0 100 L 5 100 M 0 50 L 5 50 M 0 0 L 5 0'],
    ['end', 'M 20 100 L 15 100 M 20 50 L 15 50 M 20 0 L 15 0'],
  ] as const)('draws ticks from the %s side', ([side, expected]) => {
    const byId = renderSvg('<rect id="track" width="20" height="100" /><path id="ticks" />');
    expect(createSvgBarTicksPath(byId('ticks'), { element: byId('track'), direction: 'up' }, 2, 5, side)).toBe(
      expected,
    );
  });

  it('starts from the start side by default', () => {
    const byId = renderSvg('<rect id="track" width="100" height="20" /><path id="ticks" />');
    expect(createSvgBarTicksPath(byId('ticks'), { element: byId('track'), direction: 'right' }, 1, 5)).toBe(
      'M 0 0 L 0 5 M 100 0 L 100 5',
    );
  });
});
