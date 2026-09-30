const PLACEHOLDER_PATTERN = /\{(?<key>[\w$.]+)\}/gv;

/**
 * Replaces the `{key}` placeholders of a template with values. A placeholder without value is kept, so that
 * it shows.
 *
 * @param template - A text with `{key}` placeholders.
 * @param values - The values by key.
 * @returns The text with every known placeholder replaced.
 * @example
 * interpolate('Heading {heading}°, speed {speed} kn', { heading: 270, speed: 12.5 });
 * // 'Heading 270°, speed 12.5 kn'
 * interpolate('Hello {name}', {}); // 'Hello {name}'
 */
export function interpolate(
  template: string,
  values: Readonly<Record<string, boolean | number | string | undefined>>,
): string {
  return template.replaceAll(PLACEHOLDER_PATTERN, (placeholder: string, key: string) => {
    const value = Object.hasOwn(values, key) ? values[key] : undefined;
    return value === undefined ? placeholder : String(value);
  });
}
