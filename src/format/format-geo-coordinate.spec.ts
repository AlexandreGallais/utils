import { formatGeoCoordinate } from './format-geo-coordinate';

describe(formatGeoCoordinate, () => {
  it.for([
    [48.856667, 'lat', '48°51.400′ N'],
    [-33.5, 'lat', '33°30.000′ S'],
    [-2.35, 'lon', '002°21.000′ W'],
    [151.2, 'lon', '151°12.000′ E'],
    [0, 'lat', '00°00.000′ N'],
    [5.083333, 'lat', '05°05.000′ N'],
  ] as const)('formats %s as a %s in degrees and minutes', ([value, axis, expected]) => {
    expect(formatGeoCoordinate(value, axis, 'dm', 3)).toBe(expected);
  });

  it('formats degrees, minutes and seconds', () => {
    expect(formatGeoCoordinate(48.856667, 'lat', 'dms', 1)).toBe('48°51′24.0″ N');
    expect(formatGeoCoordinate(-2.351389, 'lon', 'dms', 0)).toBe('002°21′05″ W');
  });

  it('carries a rounded 60 minutes over to the next degree', () => {
    expect(formatGeoCoordinate(10.9999999, 'lat', 'dm', 3)).toBe('11°00.000′ N');
    expect(formatGeoCoordinate(10.9999999, 'lat', 'dms', 1)).toBe('11°00′00.0″ N');
  });

  it('applies the requested decimals', () => {
    expect(formatGeoCoordinate(48.856667, 'lat', 'dm', 1)).toBe('48°51.4′ N');
  });

  it.for([
    [91, 'lat'],
    [-181, 'lon'],
    [NaN, 'lat'],
  ] as const)('returns an empty string for %s as a %s', ([value, axis]) => {
    expect(formatGeoCoordinate(value, axis, 'dm', 3)).toBe('');
  });
});
