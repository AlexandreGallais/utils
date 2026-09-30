import { resetSvgTransform } from './reset-svg-transform';
import { renderSvg } from './testing';

describe(resetSvgTransform, () => {
  it('empties the transform list', () => {
    const byId = renderSvg('<rect id="symbol" transform="translate(5 5) rotate(30)" width="10" height="10" />');
    resetSvgTransform(byId('symbol'));
    expect(byId('symbol').transform.baseVal.numberOfItems).toBe(0);
  });
});
