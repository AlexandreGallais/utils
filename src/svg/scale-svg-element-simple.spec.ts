import { scaleSvgElementSimple } from './scale-svg-element-simple.ts';
import { asSvgElement } from './testing/fake-svg-element.ts';
import { createTwistedElement, describeOnScreen } from './testing/scene.ts';

describe(scaleSvgElementSimple, () => {
  it('shrinks around the center', () => {
    const element = createTwistedElement('');
    const before = describeOnScreen(element);
    scaleSvgElementSimple(asSvgElement(element), 0.5);
    expect(describeOnScreen(element).center).toStrictEqual(before.center);
    expect(describeOnScreen(element).width).toBeCloseTo(before.width / 2, 3);
  });
});
