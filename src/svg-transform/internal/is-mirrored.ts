export function isMirrored(matrix: DOMMatrix): boolean {
  return matrix.a * matrix.d < matrix.b * matrix.c;
}
