import { flipSvgElementSimple } from './flip-svg-element-simple';
import { asSvgElement, createTwistedElement, describeOnScreen } from './testing';

describe(flipSvgElementSimple, () => {
  it('mirrors around the center', () => {
    const element = createTwistedElement('');
    const before = describeOnScreen(element);
    flipSvgElementSimple(asSvgElement(element), 'horizontal');
    expect(describeOnScreen(element)).toStrictEqual({
      ...before,
      isFlipped: !before.isFlipped,
      rotation: describeOnScreen(element).rotation,
    });
  });
});
