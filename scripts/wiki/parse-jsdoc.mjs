// Parses the JSDoc comment of an export into its description and its tags.

const TAG_PATTERN = /^@(?<tag>\w+)(?:\s(?<text>.*))?$/v;

/**
 * Splits a JSDoc comment into its description and its tags.
 *
 * @param jsdoc - The content between the opening and the closing of the comment.
 * @returns The description and the tags in order; an `@example` keeps its lines, other tags are flattened.
 */
export function parseJsdoc(jsdoc) {
  const lines = jsdoc.split('\n').map((line) => line.replace(/^\s*\* ?/v, ''));
  const description = [];
  const tags = [];
  for (const line of lines) {
    const match = TAG_PATTERN.exec(line.trim());
    if (match?.groups) {
      tags.push({ tag: match.groups.tag, lines: [(match.groups.text ?? '').trim()] });
    } else if (tags.length > 0) {
      tags.at(-1).lines.push(line);
    } else {
      description.push(line);
    }
  }
  return {
    description: description.join('\n').trim(),
    tags: tags.map(({ tag, lines: tagLines }) => ({
      tag,
      text: tag === 'example' ? tagLines.join('\n').trim() : tagLines.join(' ').replaceAll(/\s+/gv, ' ').trim(),
    })),
  };
}
