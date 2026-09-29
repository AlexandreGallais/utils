// One function per file: a source file exports exactly one name, and the file is named after it
// (`roundToStep` → `round-to-step.ts`, `RingBuffer` → `ring-buffer.ts`). An enum lives in a `.enum.ts` file
// (`AlarmLevel` → `alarm-level.enum.ts`), and only an enum does.

import path from 'node:path';

/**
 * Converts an identifier to its kebab-case file name.
 *
 * @param name - A camelCase or PascalCase identifier.
 * @returns The kebab-case name (`roundToStep` → `round-to-step`, `Matrix2D` → `matrix-2d`).
 */
function toKebabCase(name) {
  return name
    .replaceAll(/(?<lower>[a-z])(?<upper>[A-Z])/gv, '$<lower>-$<upper>')
    .replaceAll(/(?<letter>[A-Za-z])(?<digit>\d)/gv, '$<letter>-$<digit>')
    .toLowerCase();
}

/**
 * Names declared by an `export` declaration (`export function a`, `export const b`, `export type C`).
 *
 * @param node - An `ExportNamedDeclaration` node.
 * @returns The exported names.
 */
function exportedNames(node) {
  if (node.declaration) {
    if (node.declaration.type === 'VariableDeclaration') {
      return node.declaration.declarations.map((declarator) => declarator.id.name);
    }
    return node.declaration.id ? [node.declaration.id.name] : [];
  }
  return node.specifiers.map((specifier) => specifier.exported.name);
}

export default {
  meta: {
    type: 'suggestion',
    docs: { description: 'Require a single named export per file, named like the file.' },
    schema: [],
    messages: {
      single: 'A file exports a single name, found {{count}}: {{names}}. Split it into one file per export.',
      mismatch: "The file exporting '{{name}}' must be named '{{expected}}.ts'.",
      reExport: 'Only the entry point re-exports other modules.',
    },
  },
  create(context) {
    const names = new Set();
    let firstNode;
    let isEnum = false;
    return {
      ExportNamedDeclaration(node) {
        if (node.source) {
          context.report({ node, messageId: 'reExport' });
          return;
        }
        for (const name of exportedNames(node)) {
          names.add(name);
        }
        isEnum ||= node.declaration?.type === 'TSEnumDeclaration';
        firstNode ??= node;
      },
      ExportAllDeclaration(node) {
        context.report({ node, messageId: 'reExport' });
      },
      'Program:exit'() {
        if (!firstNode) {
          return;
        }
        if (names.size > 1) {
          context.report({
            node: firstNode,
            messageId: 'single',
            data: { count: names.size, names: [...names].join(', ') },
          });
          return;
        }
        const [name] = names;
        const expected = `${toKebabCase(name)}${isEnum ? '.enum' : ''}`;
        const basename = path.basename(context.filename, '.ts');
        if (basename !== expected) {
          context.report({ node: firstNode, messageId: 'mismatch', data: { name, expected } });
        }
      },
    };
  },
};
