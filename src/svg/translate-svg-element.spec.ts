import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { renderSvg } from './testing';
import { translateSvgElement } from './translate-svg-element';

describe(translateSvgElement, () => {
  it('moves along the axes of the element', () => {
    const byId = renderSvg('<rect id="train" transform="translate(100 100) rotate(90)" width="10" height="10" />');
    const before = getSvgAnchorPoint(byId('train'));
    translateSvgElement(byId('train'), 10, 0);
    const after = getSvgAnchorPoint(byId('train'));
    expect(after.x - before.x).toBeCloseTo(0, 3);
    expect(after.y - before.y).toBeCloseTo(10, 3);
  });
});
