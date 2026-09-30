// Relative imports go through the index of a folder when it re-exports what they import ("path can be
// simplified"), with an autofix that rewrites the import on save:
// `import { ButtonComponent } from '../atoms/button/button.component'` → `import { ButtonComponent } from '../atoms'`.
//
// Option `mode`:
// - `require` (browser sources): a relative import names a neighbour file (`./format-count`) or a folder
//   (`../atoms`), never a file inside another folder; the fix applies when the folder's index re-exports the
//   imported names, otherwise the index must be completed by hand.
// - `simplify` (Node files): a deep import is reported only when a folder's index re-exports its names; the fix
//   keeps the extension Node needs (`./lint/index.mjs`).

import path from 'node:path';
import { findExportedName, findIndex, readReexports, resolveModule } from './read-reexports.mjs';

const UP_SEGMENTS = new Set(['.', '..']);
/** A code file extension at the end of a module path (`.component` in `button.component` is a word, not one). */
const CODE_EXTENSION = /\.[cm]?[jt]sx?$/v;

/**
 * Lists the folders a relative path goes through, shortest first: `../atoms/button/button.component` →
 * `../atoms`, `../atoms/button`.
 *
 * @param {string} source - The relative module path.
 * @returns {string[]} The folder paths, relative like the source.
 */
function listFolders(source) {
  const segments = source.split('/');
  const ups = segments.filter((segment) => UP_SEGMENTS.has(segment));
  // `./atoms/index` is the folder itself (import-x/no-useless-path-segments shortens it).
  const names = segments.filter((segment) => !UP_SEGMENTS.has(segment) && !/^index(?:\.[cm]?[jt]sx?)?$/v.test(segment));
  return names.slice(0, -1).map((_name, index) => [...ups, ...names.slice(0, index + 1)].join('/'));
}

/**
 * Writes an import specifier: `name`, or `exported as local`.
 *
 * @param {string} exported - The name the index exports.
 * @param {string} local - The local name.
 * @param {boolean} isType - Whether the specifier is `type`-only inside a value import.
 * @returns {string} The specifier.
 */
function writeSpecifier(exported, local, isType) {
  const name = exported === local ? exported : `${exported} as ${local}`;
  return isType ? `type ${name}` : name;
}

/**
 * Rewrites the specifiers of an import for an index, or gives up.
 *
 * @param {any} node - The import declaration.
 * @param {Map<string, Map<string, string>>} exports - The re-exports of the index.
 * @param {string} module - The module file the import reaches today.
 * @returns {string[] | undefined} The new specifiers, or `undefined` when the index lacks a name.
 */
function rewriteSpecifiers(node, exports, module) {
  const specifiers = [];
  for (const specifier of node.specifiers) {
    if (specifier.type === 'ImportNamespaceSpecifier') {
      return undefined;
    }
    const imported = specifier.type === 'ImportDefaultSpecifier' ? 'default' : specifier.imported.name;
    const exported = findExportedName(exports, module, imported);
    if (exported === undefined) {
      return undefined;
    }
    specifiers.push(writeSpecifier(exported, specifier.local.name, specifier.importKind === 'type'));
  }
  return specifiers;
}

export default {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    docs: { description: 'Require imports through the index of a folder, and simplify the paths an index allows.' },
    schema: [
      {
        type: 'object',
        properties: { mode: { enum: ['require', 'simplify'] } },
        additionalProperties: false,
      },
    ],
    messages: {
      deep: "Import the folder '{{folder}}': its index re-exports what it shares.",
      simplify: "Path can be simplified: '{{path}}' re-exports it.",
    },
  },
  create(context) {
    const isRequired = context.options[0]?.mode !== 'simplify';
    const directory = path.dirname(context.physicalFilename);

    /**
     * Finds the shortest folder whose index re-exports every name of an import, with the new import text.
     *
     * @param {any} node - The import declaration.
     * @param {string} source - Its relative module path.
     * @returns {{ path: string, text: string } | undefined} The new path and import, or `undefined`.
     */
    function findSimplification(node, source) {
      const module = resolveModule(directory, source);
      if (module === undefined || node.specifiers.length === 0) {
        return undefined;
      }
      const folders = listFolders(source);
      for (const folder of isRequired ? folders.slice(0, 1) : folders) {
        const absolute = path.resolve(directory, folder);
        const index = findIndex(absolute);
        // The file's own folder: importing its index would import the file itself.
        const isInside = !path.relative(absolute, context.physicalFilename).startsWith('..');
        const specifiers =
          index === undefined || isInside ? undefined : rewriteSpecifiers(node, readReexports(index), module);
        if (index !== undefined && specifiers !== undefined) {
          const hasExtension = CODE_EXTENSION.test(source);
          const newPath = hasExtension ? `${folder}/${path.basename(index)}` : folder;
          const typeKeyword = node.importKind === 'type' ? 'type ' : '';
          const [quote] = node.source.raw;
          const text = `import ${typeKeyword}{ ${specifiers.join(', ')} } from ${quote}${newPath}${quote};`;
          return { path: newPath, text };
        }
      }
      return undefined;
    }

    /**
     * Reports a re-export of a file inside another folder (`require` mode; an index re-exports its own files).
     *
     * @param {any} node - The export declaration.
     */
    function checkReexport(node) {
      const source = node.source?.value;
      if (isRequired && typeof source === 'string' && source.startsWith('.') && listFolders(source).length > 0) {
        context.report({ node: node.source, messageId: 'deep', data: { folder: listFolders(source)[0] } });
      }
    }

    return {
      ExportAllDeclaration: checkReexport,
      ExportNamedDeclaration: checkReexport,
      ImportDeclaration(node) {
        const source = node.source.value;
        if (typeof source !== 'string' || !source.startsWith('.') || listFolders(source).length === 0) {
          return;
        }
        const simplification = findSimplification(node, source);
        if (simplification === undefined && isRequired) {
          context.report({ node: node.source, messageId: 'deep', data: { folder: listFolders(source)[0] } });
        } else if (simplification !== undefined) {
          context.report({
            node: node.source,
            messageId: isRequired ? 'deep' : 'simplify',
            data: { folder: simplification.path, path: simplification.path },
            fix: (fixer) => fixer.replaceText(node, simplification.text),
          });
        }
      },
    };
  },
};
