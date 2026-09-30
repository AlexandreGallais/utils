import { rotateSvgElement } from './rotate-svg-element';
import { describeOnScreen, renderSvg } from './testing';

describe(rotateSvgElement, () => {
  it('turns clockwise around the center by default', () => {
    const byId = renderSvg(
      '<g transform="rotate(10 50 50)"><rect id="flag" x="40" y="45" width="20" height="10" /></g>',
    );
    rotateSvgElement(byId('flag'), 80);
    expect(describeOnScreen(byId('flag'))).toMatchObject({ x: 45, y: 40, width: 10, height: 20, rotation: 90 });
  });

  it('turns around an anchor', () => {
    const byId = renderSvg('<rect id="flag" x="40" y="40" width="20" height="10" />');
    rotateSvgElement(byId('flag'), 90, 'top-left');
    expect(describeOnScreen(byId('flag'))).toMatchObject({ x: 30, y: 40, width: 10, height: 20 });
  });
});
