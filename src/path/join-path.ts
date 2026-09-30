const REPEATED_SLASHES_PATTERN = /(?<!:)\/{2,}/gv;

/**
 * Joins URL path segments with `/`, ignoring empty segments and collapsing repeated slashes, except the
 * `//` of a protocol.
 *
 * @param segments - The segments to join, with or without their own slashes.
 * @returns The joined path.
 * @example
 * joinPath('https://api.example.com/', '/v1/', 'users'); // 'https://api.example.com/v1/users'
 * joinPath('/assets', '', 'img/'); // '/assets/img/'
 */
export function joinPath(...segments: readonly string[]): string {
  return segments
    .filter((segment) => segment !== '')
    .join('/')
    .replaceAll(REPEATED_SLASHES_PATTERN, '/');
}
