/**
 * Copies text to the clipboard, such as a value, a coordinate or an error report, and tells whether it
 * worked instead of throwing: the Clipboard API needs a secure context (HTTPS or localhost), a user gesture
 * in some browsers, and may be denied by a permission.
 *
 * @param text - The text to copy.
 * @returns A promise of `true` when copied, `false` when the clipboard is unavailable or refused.
 * @example
 * const isCopied = await copyText(formatGeoCoordinate(position.lat, 'lat', 'dm', 3));
 * toast(isCopied ? 'Copied' : 'Copy not allowed');
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Also reached where `navigator.clipboard` is undefined (insecure context, old browser).
    return false;
  }
  return true;
}
