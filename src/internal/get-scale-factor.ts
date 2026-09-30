const DECIMAL_BASE = 10;
const TABLE_SIZE = 101;
const POWERS_OF_TEN: readonly number[] = /* @__PURE__ */ Array.from(
  { length: TABLE_SIZE },
  (_, exponent) => DECIMAL_BASE ** exponent,
);

export function getScaleFactor(maxFractionDigits: number): number {
  return POWERS_OF_TEN[maxFractionDigits] ?? DECIMAL_BASE ** maxFractionDigits;
}
