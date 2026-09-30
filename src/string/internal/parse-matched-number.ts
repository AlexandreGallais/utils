export function parseMatchedNumber(text: string): number {
  return Number(text.replace(',', '.'));
}
