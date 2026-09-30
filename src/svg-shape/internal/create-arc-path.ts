import { formatCoordinate } from './format-coordinate';
import { formatPoint } from './format-point';
import { polarToCartesian } from './polar-to-cartesian';

const FULL_TURN = 360;
const HALF_TURN = 180;

export function createArcPath(center: DOMPointReadOnly, radius: number, startAngle: number, endAngle: number): string {
  const sweep = endAngle - startAngle;
  const r = formatCoordinate(radius);
  const direction = sweep > 0 ? 1 : 0;
  const start = formatPoint(polarToCartesian(center, radius, startAngle));
  if (Math.abs(sweep) >= FULL_TURN) {
    const opposite = formatPoint(polarToCartesian(center, radius, startAngle + HALF_TURN));
    return `M ${start} A ${r} ${r} 0 1 ${direction} ${opposite} A ${r} ${r} 0 1 ${direction} ${start}`;
  }
  const largeArc = Math.abs(sweep) > HALF_TURN ? 1 : 0;
  return `M ${start} A ${r} ${r} 0 ${largeArc} ${direction} ${formatPoint(polarToCartesian(center, radius, endAngle))}`;
}
