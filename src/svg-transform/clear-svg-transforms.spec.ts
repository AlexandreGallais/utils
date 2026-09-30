import { clearSvgTransforms } from './clear-svg-transforms';
import { renderSvg } from './testing';

describe(clearSvgTransforms, () => {
  it('empties the transform list', () => {
    const byId = renderSvg('<rect id="symbol" transform="translate(5 5) rotate(30)" width="10" height="10" />');
    clearSvgTransforms(byId('symbol'));
    expect(byId('symbol').transform.baseVal.numberOfItems).toBe(0);
  });
});
