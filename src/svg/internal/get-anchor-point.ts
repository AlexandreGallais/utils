import type { Anchor } from '../anchor';

const MIDDLE = 0.5;

const FACTORS: Readonly<Record<Anchor, readonly [x: number, y: number]>> = {
  'top-left': [0, 0],
  top: [MIDDLE, 0],
  'top-right': [1, 0],
  left: [0, MIDDLE],
  center: [MIDDLE, MIDDLE],
  right: [1, MIDDLE],
  'bottom-left': [0, 1],
  bottom: [MIDDLE, 1],
  'bottom-right': [1, 1],
};

export function getAnchorPoint(box: DOMRectReadOnly, anchor: Anchor): DOMPoint {
  const [factorX, factorY] = FACTORS[anchor];
  return new DOMPoint(box.x + box.width * factorX, box.y + box.height * factorY);
}
