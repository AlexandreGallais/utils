import { applySvgTransforms } from './apply-svg-transforms';
import { svgFlip } from './svg-flip';
import { svgPlace } from './svg-place';
import { svgRotate } from './svg-rotate';
import { svgRotateTo } from './svg-rotate-to';
import type { SvgTransformOrder } from './svg-transform-order';
import { svgTranslate } from './svg-translate';
import { describeOnScreen, renderSvg } from './testing';

const SCENE = `
  <g transform="translate(60 60) rotate(30)"><rect id="symbol" transform="scale(-1 1)" width="20" height="10" /></g>
  <g transform="scale(2)"><circle id="target" cx="100" cy="100" r="5" /></g>
`;

describe(applySvgTransforms, () => {
  it('applies each order on what the previous ones give', () => {
    const byId = renderSvg(SCENE);
    applySvgTransforms(byId('symbol'), [
      svgFlip(false),
      svgRotateTo(0),
      svgPlace(byId('target')),
      svgTranslate(0, -10),
    ]);
    expect(describeOnScreen(byId('symbol'))).toMatchObject({
      x: 190,
      y: 185,
      width: 20,
      height: 10,
      rotation: 0,
      isFlipped: false,
    });
  });

  it('keeps the transforms already in the list', () => {
    const byId = renderSvg(SCENE);
    applySvgTransforms(byId('symbol'), [svgRotateTo(0)]);
    expect(byId('symbol').transform.baseVal.numberOfItems).toBe(2);
  });

  it('updates only the changed order', () => {
    const byId = renderSvg(SCENE);
    const rotation = svgRotate(0);
    applySvgTransforms(byId('symbol'), [svgFlip(false), svgRotateTo(0), svgPlace(byId('target')), rotation]);
    rotation.set(90);
    expect(describeOnScreen(byId('symbol'))).toMatchObject({ x: 195, y: 190, width: 10, height: 20, rotation: 90 });
  });

  it('updates an order followed by others, in the axes the element shows', () => {
    const byId = renderSvg('<rect id="train" x="100" y="100" width="10" height="10" />');
    const position = svgTranslate(0, 0);
    applySvgTransforms(byId('train'), [position, svgRotate(90)]);
    position.set(10, 0);
    expect(describeOnScreen(byId('train'))).toMatchObject({ x: 100, y: 110, rotation: 90 });
  });

  it('keeps the values of an order changed before it is applied', () => {
    const byId = renderSvg(SCENE);
    const rotation = svgRotateTo(0);
    rotation.set(90);
    applySvgTransforms(byId('symbol'), [rotation]);
    expect(describeOnScreen(byId('symbol'))).toMatchObject({ rotation: 90 });
  });

  it('throws a TypeError for an object that is not an order', () => {
    const byId = renderSvg(SCENE);
    const fake: SvgTransformOrder<[]> = { set: (): void => undefined };
    expect(() => {
      applySvgTransforms(byId('symbol'), [fake]);
    }).toThrow(TypeError);
  });

  it('throws a TypeError for an element outside an svg', () => {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    expect(() => {
      applySvgTransforms(rect, [svgTranslate(1, 1)]);
    }).toThrow(TypeError);
  });
});
