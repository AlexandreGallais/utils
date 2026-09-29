import { flipSvgElementSimple } from './flip-svg-element-simple.ts';
import { asSvgElement } from './testing/fake-svg-element.ts';
import { createTwistedElement, describeOnScreen } from './testing/scene.ts';

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
