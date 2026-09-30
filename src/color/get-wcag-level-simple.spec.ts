import { getWcagLevelSimple } from './get-wcag-level-simple';

describe(getWcagLevelSimple, () => {
  it('rates normal text', () => {
    expect(getWcagLevelSimple({ r: 118, g: 118, b: 118 }, { r: 255, g: 255, b: 255 })).toBe('AA');
  });
});
