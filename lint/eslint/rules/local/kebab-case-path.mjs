// File and folder names are kebab-case: `round-to-step.ts`, `user-list/user-list.component.ts`. The dots of a
// file name separate kebab-case words (`button.component.ts`, `vite.config.mts`). Names starting with a dot
// (`.storybook/`, `.vitepress/`) are imposed by tools and skipped; so are the names listed in `ignoredNames`.

import path from 'node:path';

const KEBAB_CASE = /^[a-z\d]+(?:-[a-z\d]+)*$/v;

/**
 * Finds the first path segment that is not kebab-case.
 *
 * @param {string[]} segments - The folders and the file name, relative to the working directory.
 * @param {Set<string>} ignoredNames - Names to skip.
 * @returns {string | undefined} The segment, or `undefined` when every one is kebab-case.
 */
function findInvalidSegment(segments, ignoredNames) {
  return segments.find(
    (segment) =>
      !segment.startsWith('.') &&
      !ignoredNames.has(segment) &&
      !segment.split('.').every((word) => KEBAB_CASE.test(word)),
  );
}

export default {
  meta: {
    type: 'suggestion',
    docs: { description: 'Require kebab-case file and folder names.' },
    schema: [
      {
        type: 'object',
        properties: { ignoredNames: { type: 'array', items: { type: 'string' }, uniqueItems: true } },
        additionalProperties: false,
      },
    ],
    messages: {
      notKebabCase: "'{{segment}}' must be kebab-case (lowercase words joined by '-', such as 'user-list').",
    },
  },
  create(context) {
    const ignoredNames = new Set(context.options[0]?.ignoredNames ?? []);
    const relative = path.relative(context.cwd, context.physicalFilename);
    const segments = relative.startsWith('..') ? [path.basename(relative)] : relative.split(path.sep);
    return {
      Program() {
        const segment = findInvalidSegment(segments, ignoredNames);
        if (segment !== undefined) {
          context.report({ loc: { line: 1, column: 0 }, messageId: 'notKebabCase', data: { segment } });
        }
      },
    };
  },
};
