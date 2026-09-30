import { applySvgTransforms } from './apply-svg-transforms';
import { svgScale } from './svg-scale';
import { describeOnScreen, renderSvg } from './testing';

describe(svgScale, () => {
  it.for([
    ['bottom', 1, 1.5, { x: 10, y: 30, width: 20, height: 60 }],
    ['left', 2, 1, { x: 10, y: 50, width: 40, height: 40 }],
    ['right', 2, 1, { x: -10, y: 50, width: 40, height: 40 }],
  ] as const)('grows from the %s anchor', ([anchor, scaleX, scaleY, expected]) => {
    const byId = renderSvg('<rect id="tank" x="10" y="50" width="20" height="40" />');
    applySvgTransforms(byId('tank'), [svgScale(scaleX, scaleY, anchor)]);
    expect(describeOnScreen(byId('tank'))).toMatchObject(expected);
  });

  it('scales both axes around the center by default', () => {
    const byId = renderSvg('<rect id="tank" x="10" y="10" width="20" height="20" />');
    applySvgTransforms(byId('tank'), [svgScale(2)]);
    expect(describeOnScreen(byId('tank'))).toMatchObject({ x: 0, y: 0, width: 40, height: 40 });
  });
});
