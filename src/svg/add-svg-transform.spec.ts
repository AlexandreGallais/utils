import { addSvgTransform } from './add-svg-transform';
import { renderSvg } from './testing';

describe(addSvgTransform, () => {
  it('appends transforms that change one at a time', () => {
    const byId = renderSvg('<rect id="needle" width="10" height="10" />');
    const needle = byId('needle');
    const position = addSvgTransform(needle);
    const rotation = addSvgTransform(needle);
    position.setTranslate(100, 0);
    rotation.setRotate(90, 5, 5);
    rotation.setRotate(180, 5, 5);
    expect(needle.transform.baseVal.numberOfItems).toBe(2);
    expect(needle.getAttribute('transform')).toBe('translate(100 0) rotate(180 5 5)');
  });
});
