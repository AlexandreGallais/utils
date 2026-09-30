import { roundToFractionDigits } from '../../math';

const FRACTION_DIGITS = 3;

export function formatCoordinate(value: number): string {
  return String(roundToFractionDigits(value, FRACTION_DIGITS));
}
