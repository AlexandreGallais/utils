import { centerSvgElementOn } from './center-svg-element-on';
import { asSvgElement, createTwistedElement, describeOnScreen } from './testing';

describe(centerSvgElementOn, () => {
  it('puts the visible center on the screen point', () => {
    const element = createTwistedElement('rotate(40)');
    centerSvgElementOn(asSvgElement(element), { x: 300, y: 200 });
    expect(describeOnScreen(element).center).toStrictEqual({ x: 300, y: 200 });
  });

  it('takes the defaults for null or undefined', () => {
    const omitted = createTwistedElement('rotate(10)');
    const nulled = createTwistedElement('rotate(10)');
    const explicit = createTwistedElement('rotate(10)');
    centerSvgElementOn(asSvgElement(omitted));
    centerSvgElementOn(asSvgElement(nulled), null);
    centerSvgElementOn(asSvgElement(explicit), { x: 0, y: 0 });
    expect(describeOnScreen(omitted)).toStrictEqual(describeOnScreen(explicit));
    expect(describeOnScreen(nulled)).toStrictEqual(describeOnScreen(explicit));
  });
});
