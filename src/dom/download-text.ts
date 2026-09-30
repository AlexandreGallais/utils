import { downloadBlob } from './download-blob';

/**
 * Makes the browser save text generated in the page as a file: a CSV export, a JSON configuration, a log.
 *
 * @param text - The content of the file. Defaults to `''`.
 * @param fileName - The name proposed to the user, such as `'history.csv'`.
 * @param mimeType - The type of the content, such as `'text/csv'` or `'application/json'`. Defaults to `'text/plain'`.
 * @example
 * const BYTE_ORDER_MARK = String.fromCodePoint(0xfe_ff); // so that Excel reads UTF-8
 * downloadText(BYTE_ORDER_MARK + toCsv(rows, ';', false), 'history.csv', 'text/csv');
 */
export function downloadText(text: string | null | undefined, fileName: string, mimeType?: string | null): void {
  const resolvedText = text ?? '';
  const resolvedMimeType = mimeType ?? 'text/plain';
  downloadBlob(new Blob([resolvedText], { type: `${resolvedMimeType};charset=utf-8` }), fileName);
}
