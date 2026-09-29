import { moveSvgElement } from './move-svg-element.ts';
import { asSvgElement } from './testing/fake-svg-element.ts';
import { createTwistedElement, describeOnScreen, isSamePoint } from './testing/scene.ts';

describe(moveSvgElement, () => {
  it('moves by screen pixels whatever the parent transforms', () => {
    const element = createTwistedElement('rotate(40)');
    const before = describeOnScreen(element);
    moveSvgElement(asSvgElement(element), -5, 5);
    const after = describeOnScreen(element);
    expect(isSamePoint(after.center, { x: before.center.x - 5, y: before.center.y + 5 })).toBe(true);
    expect([after.width, after.height, after.rotation]).toStrictEqual([before.width, before.height, before.rotation]);
  });

  it('throws a TypeError for a flattened element', () => {
    expect(() => {
      moveSvgElement(asSvgElement(createTwistedElement('scale(0)')), 1, 1);
    }).toThrow(TypeError);
  });
});
