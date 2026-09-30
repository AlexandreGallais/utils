import { addSvgTransform } from '../add-svg-transform';
import { getSvgAnchorPointIn } from '../get-svg-anchor-point-in';
import { placeSvgElement } from '../place-svg-element';
import { resetSvgRotationAndFlip } from '../reset-svg-rotation-and-flip';
import { describeOnScreen, renderSvg } from '../testing';

describe('changes on screen', () => {
  it('adds a cancelling transform and keeps the others', () => {
    const byId = renderSvg('<rect id="symbol" transform="translate(50 50) rotate(30)" width="20" height="10" />');
    resetSvgRotationAndFlip(byId('symbol'));
    const rotation = addSvgTransform(byId('symbol'));
    rotation.setRotate(90, 10, 5);
    expect(byId('symbol').transform.baseVal.numberOfItems).toBe(4);
    expect(describeOnScreen(byId('symbol'))).toMatchObject({ width: 10, height: 20, rotation: 90 });
  });

  it('sets the given transform again instead of piling transforms up', () => {
    const byId = renderSvg(
      '<rect id="label" width="10" height="10" /><rect id="zone" x="100" y="0" width="50" height="50" />',
    );
    const placement = addSvgTransform(byId('label'));
    placeSvgElement(byId('label'), 'center', byId('zone'), 'center', placement);
    placeSvgElement(byId('label'), 'top-left', byId('zone'), 'top-left', placement);
    expect(byId('label').transform.baseVal.numberOfItems).toBe(1);
    expect(describeOnScreen(byId('label'))).toMatchObject({ x: 100, y: 0 });
  });

  it('works with a transform in the middle of the list', () => {
    const byId = renderSvg(
      '<rect id="label" width="10" height="10" /><rect id="zone" x="100" y="100" width="50" height="50" />',
    );
    const placement = addSvgTransform(byId('label'));
    addSvgTransform(byId('label')).setRotate(45, 5, 5);
    addSvgTransform(byId('label')).setScale(2, 2);
    placeSvgElement(byId('label'), 'center', byId('zone'), 'center', placement);
    const { x, y, width, height } = describeOnScreen(byId('label'));
    expect([x + width / 2, y + height / 2]).toStrictEqual([125, 125]);
  });

  it('throws a TypeError for an element outside an svg', () => {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    expect(() => addSvgTransform(rect)).toThrow(TypeError);
  });

  it('straightens, places, then turns around the target like the guide', () => {
    const byId = renderSvg(`
      <g transform="translate(60 60) rotate(30)"><rect id="symbol" transform="scale(-1 1)" width="20" height="10" /></g>
      <g transform="scale(2)"><circle id="target" cx="100" cy="100" r="5" /></g>
    `);
    resetSvgRotationAndFlip(byId('symbol'));
    placeSvgElement(byId('symbol'), 'center', byId('target'), 'center');
    const rotation = addSvgTransform(byId('symbol'));
    const axis = getSvgAnchorPointIn(byId('target'), 'center', byId('symbol'));
    rotation.setRotate(90, axis.x, axis.y);
    expect(byId('symbol').transform.baseVal.numberOfItems).toBe(4);
    expect(describeOnScreen(byId('symbol'))).toMatchObject({ x: 195, y: 190, width: 10, height: 20, rotation: 90 });
  });
});
