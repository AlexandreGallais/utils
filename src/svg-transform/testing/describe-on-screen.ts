/**
 * Describes how an element looks on screen, rounded to hide float noise.
 *
 * @param element - A rendered SVG element.
 * @returns Its screen box, its screen rotation in degrees and whether it is mirrored.
 */
export function describeOnScreen(element: SVGGraphicsElement): {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  isFlipped: boolean;
} {
  const box = element.getBoundingClientRect();
  const matrix = element.getScreenCTM() ?? new DOMMatrix();
  const isFlipped = matrix.a * matrix.d < matrix.b * matrix.c;
  const sign = isFlipped ? -1 : 1;
  const rotation = (Math.atan2(sign * matrix.b, sign * matrix.a) * 180) / Math.PI;
  return {
    x: round(box.x),
    y: round(box.y),
    width: round(box.width),
    height: round(box.height),
    rotation: (round(rotation) + 360) % 360,
    isFlipped,
  };
}

function round(value: number): number {
  return Math.round(value * 100) / 100 + 0;
}
