import { applySvgTransforms } from './apply-svg-transforms';
import { svgTranslate } from './svg-translate';
import { describeOnScreen, renderSvg } from './testing';

describe(svgTranslate, () => {
  it('moves along the axes of the element', () => {
    const byId = renderSvg('<rect id="train" transform="translate(100 100) rotate(90)" width="10" height="10" />');
    applySvgTransforms(byId('train'), [svgTranslate(10, 0)]);
    expect(describeOnScreen(byId('train'))).toMatchObject({ x: 90, y: 110 });
  });
});
