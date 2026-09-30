import { applySvgTransforms } from './apply-svg-transforms';
import { svgScaleBy } from './svg-scale-by';
import { describeOnScreen, renderSvg } from './testing';

describe(svgScaleBy, () => {
  it.for([
    ['bottom', 1, 1.5, { x: 10, y: 30, width: 20, height: 60 }],
    ['left', 2, 1, { x: 10, y: 50, width: 40, height: 40 }],
    ['right', 2, 1, { x: -10, y: 50, width: 40, height: 40 }],
  ] as const)('grows from the %s anchor', ([anchor, scaleX, scaleY, expected]) => {
    const byId = renderSvg('<rect id="tank" x="10" y="50" width="20" height="40" />');
    applySvgTransforms(byId('tank'), [svgScaleBy(scaleX, scaleY, anchor)]);
    expect(describeOnScreen(byId('tank'))).toMatchObject(expected);
  });

  it('scales both axes around the center by default', () => {
    const byId = renderSvg('<rect id="tank" x="10" y="10" width="20" height="20" />');
    applySvgTransforms(byId('tank'), [svgScaleBy(2)]);
    expect(describeOnScreen(byId('tank'))).toMatchObject({ x: 0, y: 0, width: 40, height: 40 });
  });
});
