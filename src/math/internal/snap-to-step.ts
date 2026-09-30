import { roundToFractionDigits } from '../round-to-fraction-digits';

const TOLERANCE = 1e-9;
const DECIMAL_BASE = 10;

export function snapToStep(value: number, step: number, snap: (quotient: number) => number): number {
  let quotient = value / step;
  const nearest = Math.round(quotient);
  // 0.3 / 0.1 is 2.9999999999999996: snap it to 3 before flooring.
  if (Math.abs(quotient - nearest) <= TOLERANCE * Math.max(1, Math.abs(quotient))) {
    quotient = nearest;
  }
  return roundToFractionDigits(snap(quotient) * step, countDecimals(step));
}

function countDecimals(step: number): number {
  let decimals = 0;
  let scaled = step;
  while (Math.abs(scaled - Math.round(scaled)) > TOLERANCE * scaled) {
    scaled *= DECIMAL_BASE;
    decimals += 1;
  }
  return decimals;
}
