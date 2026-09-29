/**
 * Makes the browser save a file generated in the page, such as an exported history, a screenshot or a
 * configuration, through a temporary link.
 *
 * @param blob - The content of the file.
 * @param fileName - The name proposed to the user, such as `'history.csv'`.
 * @example
 * downloadBlob(new Blob([svgText], { type: 'image/svg+xml' }), 'gauge.svg');
 */
export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  // The click starts the download synchronously: the URL can be released right after.
  URL.revokeObjectURL(url);
}
