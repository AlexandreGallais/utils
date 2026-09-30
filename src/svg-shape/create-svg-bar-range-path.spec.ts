import { createSvgBarRangePath } from './create-svg-bar-range-path';
import { renderSvg } from './testing';

describe(createSvgBarRangePath, () => {
  it.for([
    ['up', 0, 0.25, 'M 0 100 L 20 100 L 20 75 L 0 75 Z'],
    ['down', 0.8, 1.5, 'M 0 80 L 20 80 L 20 100 L 0 100 Z'],
    ['right', -1, 0.5, 'M 0 0 L 0 100 L 10 100 L 10 0 Z'],
    ['left', 0, 0.5, 'M 20 0 L 20 100 L 10 100 L 10 0 Z'],
  ] as const)('draws a range of a %s bar', ([direction, from, to, expected]) => {
    const byId = renderSvg('<rect id="track" width="20" height="100" /><path id="level" />');
    expect(createSvgBarRangePath(byId('level'), { element: byId('track'), direction }, from, to)).toBe(expected);
  });

  it('throws a TypeError for a path that is not rendered', () => {
    const byId = renderSvg('<rect id="track" width="20" height="100" />');
    const notRendered = { getScreenCTM: (): null => null } as unknown as SVGGraphicsElement;
    expect(() => {
      createSvgBarRangePath(notRendered, { element: byId('track'), direction: 'up' }, 0, 1);
    }).toThrow(TypeError);
  });
});
