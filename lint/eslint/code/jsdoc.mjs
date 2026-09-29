// Comment prefixes: `Custom` = project choice (non-standard), `Off` = disabled on purpose, `Deprecated` = replaced.
// eslint-plugin-jsdoc: every rule is listed. Preset rules are errors (warnings count as errors anyway); the others are commented.
// A published library documents its whole API: TypeScript mode, no types in tags.

import jsdoc from 'eslint-plugin-jsdoc';

/**
 * JSDoc rules for the public API of a library.
 *
 * @param apiFiles - Globs of the documented sources, such as every TypeScript file of `src`.
 * @param ignoredFiles - Globs excluded from them, such as specs and test helpers.
 * @returns {import('eslint').Linter.Config[]} The configs of the block, to spread in `defineConfig([…])`.
 */
export default function jsdocBlock(apiFiles, ignoredFiles) {
  return [
    {
      name: 'code/jsdoc',
      files: apiFiles,
      ignores: ignoredFiles,
      plugins: {
        jsdoc,
      },
      settings: {
        jsdoc: { mode: 'typescript' },
      },
      rules: {
        'jsdoc/check-access': ['error'],
        'jsdoc/check-alignment': ['error'],
        // Deprecated: replaced by the JSDoc processor.
        'jsdoc/check-examples': ['off'],
        // Custom: no stray indentation inside blocks.
        'jsdoc/check-indentation': ['error'],
        // Custom: tags are not column-aligned.
        'jsdoc/check-line-alignment': ['error'],
        'jsdoc/check-param-names': ['error'],
        'jsdoc/check-property-names': ['error'],
        // Custom.
        'jsdoc/check-syntax': ['error'],
        // Custom: `@rejects` documents how a returned promise rejects (jsdoc/require-rejects);
        // `@cached` marks the `…Cached` variant of a function and describes its cache; `@simple` marks the
        // `…Simple` variant and lists the choices it fixes.
        'jsdoc/check-tag-names': ['error', { typed: true, definedTags: ['cached', 'rejects', 'simple'] }],
        // Custom.
        'jsdoc/check-template-names': ['error'],
        'jsdoc/check-types': ['error'],
        'jsdoc/check-values': ['error'],
        // Off: implementation notes stay plain `//` or `/* */` comments.
        'jsdoc/convert-to-jsdoc-comments': ['off'],
        'jsdoc/empty-tags': ['error'],
        'jsdoc/escape-inline-tags': ['error'],
        'jsdoc/implements-on-classes': ['error'],
        // Custom.
        'jsdoc/imports-as-dependencies': ['error'],
        // Custom: a description says more than the name it documents.
        'jsdoc/informative-docs': ['error'],
        // Custom: a blank line before each block.
        'jsdoc/lines-before-block': ['error'],
        // Custom: descriptions, and the descriptions of tags, start with a capital (or code) and end with a period.
        'jsdoc/match-description': [
          'error',
          {
            matchDescription: String.raw`^\n?[\x60A-Z][\s\S]*[.:]\s*$`,
            tags: {
              param: true,
              returns: true,
              template: true,
              throws: true,
              rejects: true,
              yields: true,
              cached: true,
              simple: true,
            },
          },
        ],
        'jsdoc/match-name': ['off'],
        'jsdoc/multiline-blocks': ['error'],
        // Custom: `/*` blocks that look like JSDoc must be JSDoc (bundler annotations excepted).
        'jsdoc/no-bad-blocks': [
          'error',
          { ignore: ['ts-check', 'ts-expect-error', 'ts-ignore', 'ts-nocheck', '__PURE__'] },
        ],
        // Custom.
        'jsdoc/no-blank-block-descriptions': ['error'],
        // Custom.
        'jsdoc/no-blank-blocks': ['error'],
        'jsdoc/no-defaults': ['error'],
        'jsdoc/no-missing-syntax': ['off'],
        'jsdoc/no-multi-asterisks': ['error'],
        'jsdoc/no-restricted-syntax': ['off'],
        'jsdoc/no-types': ['error'],
        'jsdoc/no-undefined-types': ['off'],
        // Custom.
        'jsdoc/no-unnecessary-type-assertion': ['error'],
        // Custom.
        'jsdoc/normalize-see-links': ['error'],
        // Custom.
        'jsdoc/prefer-import-tag': ['error'],
        'jsdoc/reject-any-type': ['error'],
        'jsdoc/reject-function-type': ['error'],
        // Custom.
        'jsdoc/require-asterisk-prefix': ['error'],
        // Custom: every JSDoc block has a description.
        'jsdoc/require-description': ['error', { contexts: ['any'] }],
        // Custom: descriptions are sentences: capital first, period last, no repeated words.
        'jsdoc/require-description-complete-sentence': ['error'],
        // Custom: every exported function or class shows how to use it (internal helpers are tagged `@internal`).
        'jsdoc/require-example': [
          'error',
          {
            contexts: ['ExportNamedDeclaration > FunctionDeclaration', 'ExportNamedDeclaration > ClassDeclaration'],
            exemptedBy: ['internal'],
          },
        ],
        'jsdoc/require-file-overview': ['off'],
        // Custom: `@param name - Description.`
        'jsdoc/require-hyphen-before-param-description': ['error', 'always'],
        // Custom: everything exported is documented, members included.
        'jsdoc/require-jsdoc': [
          'error',
          {
            publicOnly: true,
            require: { FunctionDeclaration: true, ClassDeclaration: true, MethodDefinition: true },
            contexts: [
              'TSTypeAliasDeclaration',
              'TSInterfaceDeclaration',
              'TSPropertySignature',
              'PropertyDefinition[accessibility="public"]',
              'ExportNamedDeclaration > VariableDeclaration',
            ],
            checkGetters: true,
            checkSetters: true,
            checkConstructors: false,
          },
        ],
        // Custom.
        'jsdoc/require-next-description': ['error'],
        'jsdoc/require-next-type': ['error'],
        'jsdoc/require-param': ['error'],
        'jsdoc/require-param-description': ['error'],
        'jsdoc/require-param-name': ['error'],
        'jsdoc/require-param-type': ['off'],
        'jsdoc/require-property': ['error'],
        'jsdoc/require-property-description': ['error'],
        'jsdoc/require-property-name': ['error'],
        'jsdoc/require-property-type': ['off'],
        // Custom: document how a returned promise rejects.
        'jsdoc/require-rejects': ['error'],
        'jsdoc/require-returns': ['error'],
        'jsdoc/require-returns-check': ['error'],
        'jsdoc/require-returns-description': ['error'],
        'jsdoc/require-returns-type': ['off'],
        'jsdoc/require-tags': ['off'],
        // Custom: document every type parameter.
        'jsdoc/require-template': ['error'],
        // Custom.
        'jsdoc/require-template-description': ['error'],
        // Custom: document every thrown error.
        'jsdoc/require-throws': ['error'],
        // Custom.
        'jsdoc/require-throws-description': ['error'],
        'jsdoc/require-throws-type': ['error'],
        'jsdoc/require-yields': ['error'],
        'jsdoc/require-yields-check': ['error'],
        // Custom.
        'jsdoc/require-yields-description': ['error'],
        'jsdoc/require-yields-type': ['error'],
        // Custom: tags in the canonical order.
        'jsdoc/sort-tags': ['error'],
        // Custom: one blank line between the description and the tags.
        'jsdoc/tag-lines': ['error', 'any', { startLines: 1 }],
        // Off: descriptions are Markdown, escaping would be noise.
        'jsdoc/text-escaping': ['off'],
        // Custom.
        'jsdoc/ts-ban-ts-comment': ['error'],
        // Off: duplicate of @typescript-eslint/method-signature-style.
        'jsdoc/ts-method-signature-style': ['off'],
        'jsdoc/ts-no-empty-object-type': ['error'],
        // Off: duplicate of @typescript-eslint/no-unnecessary-template-expression.
        'jsdoc/ts-no-unnecessary-template-expression': ['off'],
        // Off: duplicate of @typescript-eslint/prefer-function-type.
        'jsdoc/ts-prefer-function-type': ['off'],
        // Custom.
        'jsdoc/type-formatting': ['error'],
        'jsdoc/valid-types': ['error'],
      },
    },
  ];
}
