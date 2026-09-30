import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { renderSvg } from './testing';

describe(getSvgAnchorPoint, () => {
  it.for([
    ['top-left', 10, 20],
    ['top-right', 110, 20],
    ['bottom', 60, 70],
    ['center', 60, 45],
  ] as const)('finds the %s anchor', ([anchor, x, y]) => {
    const byId = renderSvg('<rect id="box" x="10" y="20" width="100" height="50" />');
    expect(getSvgAnchorPoint(byId('box'), anchor)).toMatchObject({ x, y });
  });

  it('takes the center by default', () => {
    const byId = renderSvg('<rect id="box" x="10" y="20" width="100" height="50" />');
    expect(getSvgAnchorPoint(byId('box'))).toMatchObject({ x: 60, y: 45 });
  });
});
