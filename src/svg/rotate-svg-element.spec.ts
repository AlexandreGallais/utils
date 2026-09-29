import { invertMatrix } from '../geometry/invert-matrix.ts';
import { transformPoint } from '../geometry/transform-point.ts';
import { getSvgAnchorPoint } from './get-svg-anchor-point.ts';
import { rotateSvgElement } from './rotate-svg-element.ts';
import { asSvgElement } from './testing/fake-svg-element.ts';
import { createTwistedElement, describeOnScreen } from './testing/scene.ts';

describe(rotateSvgElement, () => {
  it('turns clockwise on screen around its center, even in a mirrored group', () => {
    const element = createTwistedElement('rotate(10)');
    const before = describeOnScreen(element);
    rotateSvgElement(asSvgElement(element), 25, 'center');
    const after = describeOnScreen(element);
    expect(after.center).toStrictEqual(before.center);
    expect(after.rotation).toBeCloseTo((before.rotation + 25) % 360, 2);
  });

  it('keeps the anchor in place', () => {
    const element = createTwistedElement('rotate(10)');
    const pivot = getSvgAnchorPoint(asSvgElement(element), 'bottom');
    const local = transformPoint(pivot, invertMatrix(element.getScreenCTM()) ?? element.getScreenCTM());
    rotateSvgElement(asSvgElement(element), 60, 'bottom');
    const moved = transformPoint(local, element.getScreenCTM());
    expect(Math.hypot(moved.x - pivot.x, moved.y - pivot.y)).toBeLessThan(1e-4);
  });
});
