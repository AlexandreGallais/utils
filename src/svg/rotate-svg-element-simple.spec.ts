import { rotateSvgElementSimple } from './rotate-svg-element-simple.ts';
import { asSvgElement } from './testing/fake-svg-element.ts';
import { createTwistedElement, describeOnScreen } from './testing/scene.ts';

describe(rotateSvgElementSimple, () => {
  it('turns around its center', () => {
    const element = createTwistedElement('');
    const before = describeOnScreen(element);
    rotateSvgElementSimple(asSvgElement(element), 90);
    expect(describeOnScreen(element).center).toStrictEqual(before.center);
    expect(describeOnScreen(element).rotation).toBeCloseTo((before.rotation + 90) % 360, 2);
  });
});
