import { formatGeoCoordinateSimple } from './format-geo-coordinate-simple.ts';

describe(formatGeoCoordinateSimple, () => {
  it('formats degrees and decimal minutes', () => {
    expect(formatGeoCoordinateSimple(48.856667, 'lat')).toBe('48°51.400′ N');
    expect(formatGeoCoordinateSimple(-2.35, 'lon')).toBe('002°21.000′ W');
  });
});
