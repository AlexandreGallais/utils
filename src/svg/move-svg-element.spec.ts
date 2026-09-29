import { moveSvgElement } from './move-svg-element.ts';
import { asSvgElement, createFakeSvgElement } from './testing/fake-svg-element.ts';
import { screenCenter } from './testing/screen-center.ts';

describe(moveSvgElement, () => {
  it('moves on screen whatever the rotation', () => {
    const element = createFakeSvgElement('rotate(90)', { x: 0, y: 0, width: 10, height: 10 });
    const before = screenCenter(element);
    moveSvgElement(asSvgElement(element), 10, 0);
    expect(screenCenter(element)).toStrictEqual({ x: before.x + 10, y: before.y });
  });
});
