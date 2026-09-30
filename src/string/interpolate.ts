/** A `{key}` placeholder: letters, digits, `_`, `$` and `.`. */
const PLACEHOLDER_PATTERN = /\{(?<key>[\w$.]+)\}/gv;

/**
 * Replaces the `{key}` placeholders of a template with values. Placeholders without a value are kept, so a
 * missing value is visible rather than silently empty.
 *
 * @param template - A text with `{key}` placeholders. Defaults to `''`.
 * @param values - Values by key; numbers and booleans are converted with `String()`. Defaults to `{}`.
 * @returns The text with every known placeholder replaced.
 * @example
 * interpolate('Heading {heading}°, speed {speed} kn', { heading: 270, speed: 12.5 });
 * // 'Heading 270°, speed 12.5 kn'
 * interpolate('Hello {name}', {}); // 'Hello {name}'
 */
export function interpolate(
  template?: string | null,
  values?: Readonly<Record<string, string | number | boolean | undefined>> | null,
): string {
  const resolvedTemplate = template ?? '';
  const resolvedValues = values ?? {};
  return resolvedTemplate.replaceAll(PLACEHOLDER_PATTERN, (placeholder: string, key: string) => {
    const value = Object.hasOwn(resolvedValues, key) ? resolvedValues[key] : undefined;
    return value === undefined ? placeholder : String(value);
  });
}
