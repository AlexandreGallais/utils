import { normalizeAngle } from './normalize-angle.ts';

const FULL_TURN = 360;

/** Supported sizes of the compass rose. */
type CompassPointCount = 4 | 8 | 16;

/** The 16 points of the compass rose, clockwise from north; 8 and 4 points take every 2nd or 4th one. */
const COMPASS_POINTS = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
] as const;

/**
 * Names the compass point closest to a heading: `N`, `NE`, `E`… The boundaries fall halfway between two
 * points (with 8 points, `NE` covers 22.5° to 67.5°).
 *
 * @param heading - Heading in degrees, any value (normalized to [0, 360[).
 * @param points - Number of compass points: 4 (`N E S W`), 8 (with `NE`…) or 16 (with `NNE`…).
 * @returns The compass point, in English abbreviations.
 * @example
 * headingToCardinal(47, 8); // 'NE'
 * headingToCardinal(47, 4); // 'E'
 * headingToCardinal(-10, 16); // 'N'
 */
export function headingToCardinal(heading: number, points: CompassPointCount): (typeof COMPASS_POINTS)[number] {
  const sector = FULL_TURN / points;
  const index = Math.round(normalizeAngle(heading) / sector) % points;
  const stride = COMPASS_POINTS.length / points;
  const [name = 'N'] = COMPASS_POINTS.slice(index * stride, index * stride + 1);
  return name;
}
