import { placeSvgElementSimple } from './place-svg-element-simple.ts';
import { asSvgElement } from './testing/fake-svg-element.ts';
import { createTwistedElement, describeOnScreen } from './testing/scene.ts';

describe(placeSvgElementSimple, () => {
  it('centers the element on the reference', () => {
    const reference = createTwistedElement('translate(40 0)');
    const element = createTwistedElement('rotate(90)');
    placeSvgElementSimple(asSvgElement(element), asSvgElement(reference));
    expect(describeOnScreen(element).center).toStrictEqual(describeOnScreen(reference).center);
  });
});
