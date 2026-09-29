import { setSvgRotationAround } from './set-svg-rotation-around.ts';
import { asSvgElement, createFakeSvgElementIn } from './testing/fake-svg-element.ts';
import { describeOnScreen } from './testing/scene.ts';
import { screenPoint } from './testing/screen-point.ts';

const IDENTITY = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

describe(setSvgRotationAround, () => {
  it('points the needle at an absolute angle around a hub of another group', () => {
    const hub = createFakeSvgElementIn({ ...IDENTITY, e: 50, f: 50 }, undefined, { x: -3, y: -3, width: 6, height: 6 });
    // The needle is drawn from (50, 50) up to (50, 10), in a group scaled by 2.
    const needle = createFakeSvgElementIn({ ...IDENTITY, a: 2, d: 2 }, 'translate(25 25)', {
      x: -1,
      y: -20,
      width: 2,
      height: 20,
    });
    setSvgRotationAround(asSvgElement(needle), 90, asSvgElement(hub), 'center');
    setSvgRotationAround(asSvgElement(needle), 90, asSvgElement(hub), 'center');
    expect(describeOnScreen(needle).rotation).toBeCloseTo(90, 2);
    expect(screenPoint(needle, { x: 0, y: -20 })).toStrictEqual({ x: 90, y: 50 });
  });
});
