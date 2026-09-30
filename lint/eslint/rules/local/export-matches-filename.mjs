// A file exports one function or class, named after the file: `round-to-step.ts` exports `roundToStep`,
// `ring-buffer.ts` exports `RingBuffer`, `button.component.ts` exports `ButtonComponent` (the dots of the file
// name count as word breaks). Private helpers of the file are free.
//
// Option `exports`:
// - `functions-and-classes` (default): only the exported functions (declarations and `const f = () => …`) and
//   classes count; types, interfaces and constants may sit next to them.
// - `all`: every export counts (types, enums, constants), a file exports a single name, an enum lives in a
//   `.enum.ts` file (`AlarmLevel` → `alarm-level.enum.ts`), and only an entry point re-exports.

import path from 'node:path';

const FUNCTION_TYPES = new Set(['ArrowFunctionExpression', 'FunctionExpression']);
const CODE_EXTENSION = /\.[cm]?[jt]s$/v;

/**
 * Converts an identifier to its kebab-case file name.
 *
 * @param {string} name - A camelCase or PascalCase identifier.
 * @returns {string} The kebab-case name (`roundToStep` → `round-to-step`, `Matrix2D` → `matrix-2d`).
 */
function toKebabCase(name) {
  return name
    .replaceAll(/(?<lower>[a-z])(?<upper>[A-Z])/gv, '$<lower>-$<upper>')
    .replaceAll(/(?<letter>[A-Za-z])(?<digit>\d)/gv, '$<letter>-$<digit>')
    .toLowerCase();
}

/**
 * Lists the names an export declares, with whether each one is a function or a class.
 *
 * @param {any} declaration - The declaration of an `export` (`export function a`, `export const b = …`).
 * @returns {{ name: string, isCallable: boolean }[]} The exported names.
 */
function declaredNames(declaration) {
  if (declaration.type === 'VariableDeclaration') {
    return declaration.declarations
      .filter((declarator) => declarator.id.type === 'Identifier')
      .map((declarator) => ({ name: declarator.id.name, isCallable: FUNCTION_TYPES.has(declarator.init?.type) }));
  }
  if (declaration.id?.type !== 'Identifier') {
    return [];
  }
  const isCallable = ['FunctionDeclaration', 'ClassDeclaration', 'TSDeclareFunction'].includes(declaration.type);
  return [{ name: declaration.id.name, isCallable }];
}

export default {
  meta: {
    type: 'suggestion',
    docs: { description: 'Require one exported function or class per file, named after the file.' },
    schema: [
      {
        type: 'object',
        properties: { exports: { enum: ['functions-and-classes', 'all'] } },
        additionalProperties: false,
      },
    ],
    messages: {
      single: 'One exported {{kind}} per file: found {{count}} ({{names}}). Give each its own file, named after it.',
      mismatch: "The file exporting '{{name}}' is named after it: '{{expected}}'.",
      reExport: 'Only the entry point re-exports other modules.',
    },
  },
  create(context) {
    const isAll = context.options[0]?.exports === 'all';
    const names = new Set();
    let firstNode;
    let isEnum = false;

    /**
     * Records the names of an export.
     *
     * @param {any} node - The export node.
     * @param {{ name: string, isCallable: boolean }[]} declared - Its names.
     */
    function record(node, declared) {
      const counted = isAll ? declared : declared.filter(({ isCallable }) => isCallable);
      if (counted.length > 0) {
        firstNode ??= node;
        // A TypeScript overload repeats the name of its function.
        for (const { name } of counted) {
          names.add(name);
        }
      }
    }

    return {
      ExportNamedDeclaration(node) {
        if (node.source !== null && node.source !== undefined) {
          if (isAll) {
            context.report({ node, messageId: 'reExport' });
          }
          return;
        }
        if (node.declaration) {
          isEnum ||= node.declaration.type === 'TSEnumDeclaration';
          record(node, declaredNames(node.declaration));
        } else if (isAll) {
          record(
            node,
            node.specifiers.map((specifier) => ({ name: specifier.exported.name, isCallable: false })),
          );
        }
      },
      ExportDefaultDeclaration(node) {
        record(node, declaredNames(node.declaration));
      },
      ExportAllDeclaration(node) {
        if (isAll) {
          context.report({ node, messageId: 'reExport' });
        }
      },
      'Program:exit'() {
        if (firstNode === undefined) {
          return;
        }
        if (names.size > 1) {
          context.report({
            node: firstNode,
            messageId: 'single',
            data: { kind: isAll ? 'name' : 'function or class', count: names.size, names: [...names].join(', ') },
          });
          return;
        }
        const [name] = names;
        const extension = CODE_EXTENSION.exec(context.filename)?.[0] ?? '';
        const basename = path.basename(context.filename, extension);
        const expected = `${toKebabCase(name)}${isAll && isEnum ? '.enum' : ''}`;
        const actual = isAll ? basename : basename.replaceAll('.', '-');
        if (actual !== expected) {
          context.report({
            node: firstNode,
            messageId: 'mismatch',
            data: { name, expected: `${expected}${extension}` },
          });
        }
      },
    };
  },
};
