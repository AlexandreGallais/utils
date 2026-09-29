import { centerSvgElement } from './center-svg-element.ts';
import { asSvgElement, createFakeSvgElement } from './testing/fake-svg-element.ts';
import { screenCenter } from './testing/screen-center.ts';

describe(centerSvgElement, () => {
  it('draws the center of the content on the target', () => {
    // A text whose box sits above its baseline.
    const element = createFakeSvgElement('rotate(30)', { x: 0, y: -12, width: 40, height: 14 });
    centerSvgElement(asSvgElement(element), { x: 50, y: 50 });
    expect(screenCenter(element)).toStrictEqual({ x: 50, y: 50 });
  });
});
