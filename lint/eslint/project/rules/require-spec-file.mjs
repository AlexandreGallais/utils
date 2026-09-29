// Every source file exporting runtime code has its spec next to it (`clamp.ts` → `clamp.spec.ts`).
// Type-only and enum files are exempt: there is no behaviour to test.

import fs from 'node:fs';

export default {
  meta: {
    type: 'problem',
    docs: { description: 'Require a `.spec.ts` file next to each source file that exports runtime code.' },
    schema: [],
    messages: {
      missing: "Missing spec file '{{spec}}'.",
    },
  },
  create(context) {
    let runtimeExport;
    return {
      ExportNamedDeclaration(node) {
        const kind = node.declaration?.type;
        if (
          kind !== undefined &&
          kind !== 'TSTypeAliasDeclaration' &&
          kind !== 'TSInterfaceDeclaration' &&
          kind !== 'TSEnumDeclaration'
        ) {
          runtimeExport ??= node;
        }
      },
      'Program:exit'() {
        const spec = context.filename.replace(/\.ts$/v, '.spec.ts');
        if (runtimeExport && !fs.existsSync(spec)) {
          context.report({ node: runtimeExport, messageId: 'missing', data: { spec: spec.split('/').at(-1) } });
        }
      },
    };
  },
};
