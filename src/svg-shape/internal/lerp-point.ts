export function lerpPoint(from: DOMPointReadOnly, to: DOMPointReadOnly, t: number): DOMPoint {
  return new DOMPoint(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t);
}
