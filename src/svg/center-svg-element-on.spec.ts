import { centerSvgElementOn } from './center-svg-element-on.ts';
import { asSvgElement } from './testing/fake-svg-element.ts';
import { createTwistedElement, describeOnScreen } from './testing/scene.ts';

describe(centerSvgElementOn, () => {
  it('puts the visible center on the screen point', () => {
    const element = createTwistedElement('rotate(40)');
    centerSvgElementOn(asSvgElement(element), { x: 300, y: 200 });
    expect(describeOnScreen(element).center).toStrictEqual({ x: 300, y: 200 });
  });
});
