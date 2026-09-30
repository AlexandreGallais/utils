import { getSvgAnchorPoint } from './get-svg-anchor-point';
import { moveSvgElement } from './move-svg-element';
import { renderSvg } from './testing';

describe(moveSvgElement, () => {
  it('moves in a direction of the screen, by units of the parent', () => {
    const byId = renderSvg(`
      <g transform="translate(200 200) rotate(90) scale(2)"><rect id="label" transform="rotate(45)" width="10" height="10" /></g>
    `);
    const before = getSvgAnchorPoint(byId('label'));
    moveSvgElement(byId('label'), 0, -5);
    const after = getSvgAnchorPoint(byId('label'));
    expect(after.x - before.x).toBeCloseTo(0, 3);
    expect(after.y - before.y).toBeCloseTo(-10, 3);
  });

  it('does not move for a zero move', () => {
    const byId = renderSvg('<rect id="label" transform="translate(5 5)" width="10" height="10" />');
    moveSvgElement(byId('label'), 0, 0);
    expect(getSvgAnchorPoint(byId('label'))).toMatchObject({ x: 10, y: 10 });
  });
});
