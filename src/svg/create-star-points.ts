import { polarToCartesian } from '../geometry';
import type { Point } from '../geometry';

/** A full turn, in degrees. */
const FULL_TURN = 360;
/** Fewest branches of a star. */
const MIN_BRANCHES = 2;

/**
 * Computes the vertices of a star, alternating outer tips and inner notches, the first tip pointing up:
 * a favorite marker, a highlight, an event symbol. Pass them to `formatPoints` for a `<polygon>`.
 *
 * @param center - The middle point, in user units.
 * @param outerRadius - Distance of the tips from the center.
 * @param innerRadius - Distance of the notches from the center (about `0.4 × outerRadius` for a classic star).
 * @param branches - Number of tips, an integer of at least 2.
 * @returns The `2 × branches` vertices, clockwise.
 * @throws {RangeError} When `branches` is not an integer of at least 2.
 * @example
 * star.setAttribute('points', formatPoints(createStarPoints({ x: 12, y: 12 }, 10, 4, 5)));
 */
export function createStarPoints(center: Point, outerRadius: number, innerRadius: number, branches: number): Point[] {
  if (!Number.isSafeInteger(branches) || branches < MIN_BRANCHES) {
    throw new RangeError(`branches must be an integer of at least ${MIN_BRANCHES}, got ${branches}`);
  }
  const step = FULL_TURN / (branches * 2);
  return Array.from({ length: branches * 2 }, (_, index) =>
    polarToCartesian(center, index % 2 === 0 ? outerRadius : innerRadius, index * step),
  );
}
