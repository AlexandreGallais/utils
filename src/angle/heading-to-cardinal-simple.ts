import { headingToCardinal } from './heading-to-cardinal';

/** Points of the compass rose: N, NE, E, SE, S, SW, W, NW. */
const COMPASS_POINTS = 8;

/**
 * Names the compass direction of a heading like `headingToCardinal`, on the 8-point rose.
 *
 * @param heading - The heading, in degrees.
 * @returns The direction, such as `'NE'`.
 * @simple Eight points: N, NE, E, SE, S, SW, W, NW.
 * @example
 * headingToCardinalSimple(47); // 'NE'
 */
export function headingToCardinalSimple(heading: number): ReturnType<typeof headingToCardinal> {
  return headingToCardinal(heading, COMPASS_POINTS);
}
