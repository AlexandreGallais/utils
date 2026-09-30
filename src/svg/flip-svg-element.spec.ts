import { flipSvgElement } from './flip-svg-element';
import { describeOnScreen, renderSvg } from './testing';

describe(flipSvgElement, () => {
  it.for(['horizontal', 'vertical'] as const)('mirrors %s in place', (axis) => {
    const byId = renderSvg(
      '<g transform="rotate(30 50 50)"><rect id="valve" x="40" y="45" width="20" height="10" /></g>',
    );
    const before = describeOnScreen(byId('valve'));
    flipSvgElement(byId('valve'), axis);
    expect(describeOnScreen(byId('valve'))).toMatchObject({ x: before.x, y: before.y, isFlipped: true });
  });

  it('keeps an anchor in place', () => {
    const byId = renderSvg('<rect id="valve" x="10" y="10" width="20" height="10" />');
    flipSvgElement(byId('valve'), 'horizontal', 'left');
    expect(describeOnScreen(byId('valve'))).toMatchObject({ x: -10, y: 10, width: 20, isFlipped: true });
  });

  it('mirrors horizontally around the center by default', () => {
    const byId = renderSvg('<rect id="valve" x="10" y="10" width="20" height="10" />');
    flipSvgElement(byId('valve'));
    expect(describeOnScreen(byId('valve'))).toMatchObject({ x: 10, y: 10, isFlipped: true });
  });
});
