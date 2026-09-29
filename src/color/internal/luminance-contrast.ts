/** Relative luminance offset of the WCAG contrast formula, accounting for ambient flare. */
const LUMINANCE_FLARE = 0.05;

/**
 * Computes the WCAG contrast ratio between two relative luminances, whatever their order.
 *
 * @internal
 * @param first - A relative luminance, in [0, 1].
 * @param second - Another relative luminance, in [0, 1].
 * @returns The contrast ratio, in [1, 21].
 */
export function luminanceContrast(first: number, second: number): number {
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);
  return (lighter + LUMINANCE_FLARE) / (darker + LUMINANCE_FLARE);
}
