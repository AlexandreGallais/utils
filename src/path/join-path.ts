/** URL scheme followed by `//`: `https://`, `file://`, `ws://`. */
const PROTOCOL_PATTERN = /^[a-z][\d+\-.a-z]*:\/\//iv;

const REPEATED_SLASHES_PATTERN = /\/{2,}/gv;

/**
 * Joins URL path segments with `/`. Empty segments are ignored and repeated slashes collapsed; the leading
 * `/`, the trailing `/` and the protocol (`https://`) are kept.
 *
 * @param segments - The segments to join, with or without their own slashes.
 * @returns The joined path, `''` when every segment is empty.
 * @example
 * joinPath('https://api.example.com/', '/v1/', 'users'); // 'https://api.example.com/v1/users'
 * joinPath('/assets', '', 'img/'); // '/assets/img/'
 */
export function joinPath(...segments: readonly string[]): string {
  const joined = segments.filter((segment) => segment !== '').join('/');
  const protocol = PROTOCOL_PATTERN.exec(joined)?.[0] ?? '';
  return protocol + joined.slice(protocol.length).replaceAll(REPEATED_SLASHES_PATTERN, '/');
}
