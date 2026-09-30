const NEEDS_QUOTES = /[\n\r"]|^\s|\s$/v;
const FORMULA_START = /^[\t\r+\-=@]/v;

/**
 * Builds CSV text (RFC 4180): fields are quoted when needed, lines end with CRLF. Prepend `'\uFEFF'` so that
 * Excel reads UTF-8.
 *
 * @param rows - The rows, header first; `null` and `undefined` give empty fields, dates their ISO text,
 * objects their JSON.
 * @param separator - The field separator, such as `';'` for a locale with a decimal comma. Defaults to `','`.
 * @param shouldEscapeFormulas - Whether to prefix a text starting with `=`, `+`, `-` or `@` with `'`, so that a
 * spreadsheet does not run it. Defaults to `true`.
 * @returns The CSV text, without a final line break.
 * @example
 * toCsv([['time', 'speed'], [new Date(0), 12.5]]); // 'time,speed\r\n1970-01-01T00:00:00.000Z,12.5'
 */
export function toCsv(rows: Iterable<readonly unknown[]>, separator = ',', shouldEscapeFormulas = true): string {
  const lines: string[] = Array.from(rows, (row) =>
    row.map((value) => formatField(value, separator, shouldEscapeFormulas)).join(separator),
  );
  return lines.join('\r\n');
}

function formatField(value: unknown, separator: string, shouldEscapeFormulas: boolean): string {
  let text = toText(value);
  if (shouldEscapeFormulas && typeof value === 'string' && FORMULA_START.test(text)) {
    text = `'${text}`;
  }
  return text.includes(separator) || NEEDS_QUOTES.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toText(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
    return String(value);
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  return typeof value === 'object' && value !== null ? JSON.stringify(value) : '';
}
