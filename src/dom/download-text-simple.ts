import { downloadText } from './download-text.ts';

/**
 * Makes the browser save text as a file like `downloadText`.
 *
 * @param text - The content of the file.
 * @param fileName - The name proposed to the user, such as `'log.txt'`.
 * @simple Plain text type (`text/plain`).
 * @example
 * downloadTextSimple(logLines.join('\n'), 'session.log');
 */
export function downloadTextSimple(text: string, fileName: string): void {
  downloadText(text, fileName, 'text/plain');
}
