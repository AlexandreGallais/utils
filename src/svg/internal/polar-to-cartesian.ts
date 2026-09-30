const HALF_TURN = 180;
const RADIANS_PER_DEGREE = Math.PI / HALF_TURN;

export function polarToCartesian(center: DOMPointReadOnly, radius: number, angleDegrees: number): DOMPoint {
  const radians = angleDegrees * RADIANS_PER_DEGREE;
  return new DOMPoint(center.x + radius * Math.sin(radians), center.y - radius * Math.cos(radians));
}
