import type { Point } from '../geometry';
import { formatCoordinate } from './internal';

/** The origin: the point when none is given. */
const ORIGIN = { x: 0, y: 0 };

/**
 * Builds the `d` attribute of an arrow from one point to another, with a triangular head: a velocity or
 * wind vector, a flow direction on a pipe, a pointer to a target. The shaft stops at the base of the head,
 * so the path can be both stroked and filled.
 *
 * @param from - Tail of the arrow. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param to - Tip of the arrow. Defaults to the origin `{ x: 0, y: 0 }`.
 * @param headLength - Length of the head along the arrow; shortened to the arrow length if longer.
 * @param headWidth - Width of the base of the head, such as `headLength`. Defaults to `headLength` (a head as wide as
 * long).
 * @returns The path data: the shaft, then the closed head; `''` for an arrow of zero length.
 * @example
 * createArrowPath({ x: 0, y: 0 }, { x: 10, y: 0 }, 4, 4); // 'M 0 0 L 6 0 M 6 -2 L 10 0 L 6 2 Z'
 */
export function createArrowPath(
  from: Point | null | undefined,
  to: Point | null | undefined,
  headLength: number,
  headWidth?: number | null,
): string {
  const resolvedFrom = from ?? ORIGIN;
  const resolvedTo = to ?? ORIGIN;
  const resolvedHeadWidth = headWidth ?? headLength;
  const dx = resolvedTo.x - resolvedFrom.x;
  const dy = resolvedTo.y - resolvedFrom.y;
  const length = Math.hypot(dx, dy);
  if (length === 0) {
    return '';
  }
  // Unit vector along the arrow, and the base of the head on the shaft.
  const ux = dx / length;
  const uy = dy / length;
  const head = Math.min(headLength, length);
  const baseX = resolvedTo.x - ux * head;
  const baseY = resolvedTo.y - uy * head;
  const halfWidth = resolvedHeadWidth / 2;
  const base = `${formatCoordinate(baseX)} ${formatCoordinate(baseY)}`;
  const left = `${formatCoordinate(baseX + uy * halfWidth)} ${formatCoordinate(baseY - ux * halfWidth)}`;
  const right = `${formatCoordinate(baseX - uy * halfWidth)} ${formatCoordinate(baseY + ux * halfWidth)}`;
  const tip = `${formatCoordinate(resolvedTo.x)} ${formatCoordinate(resolvedTo.y)}`;
  return `M ${formatCoordinate(resolvedFrom.x)} ${formatCoordinate(resolvedFrom.y)} L ${base} M ${left} L ${tip} L ${right} Z`;
}
