import { scaleSvgElement } from './scale-svg-element';
import { describeOnScreen, renderSvg } from './testing';

describe(scaleSvgElement, () => {
  it('grows from an anchor', () => {
    const byId = renderSvg('<rect id="tank" x="10" y="50" width="20" height="40" />');
    scaleSvgElement(byId('tank'), 1, 1.5, 'bottom');
    expect(describeOnScreen(byId('tank'))).toMatchObject({ x: 10, y: 30, width: 20, height: 60 });
  });

  it('scales both axes around the center by default', () => {
    const byId = renderSvg('<rect id="tank" x="10" y="10" width="20" height="20" />');
    scaleSvgElement(byId('tank'), 2);
    expect(describeOnScreen(byId('tank'))).toMatchObject({ x: 0, y: 0, width: 40, height: 40 });
  });
});
