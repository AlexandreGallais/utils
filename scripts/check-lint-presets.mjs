// Checks the lint presets of lint/ on the example design system (examples/design-system): the example passes
// its profiles, compiles, and each block catches the mistake it is made for (files written for the check,
// then removed).

import fs from 'node:fs';
import path from 'node:path';
import { ESLint } from 'eslint';
import { defineConfig } from 'eslint/config';
import { compile } from 'sass';
import stylelint from 'stylelint';
import angularAppProfile from '../lint/profiles/eslint-angular-app.mjs';

const EXAMPLE_DIRECTORY = path.resolve('examples/design-system');
const LAYER_ORDER = '@layer reset, tokens, base, layout, components, utilities, overrides;';
const ESCAPE_HATCH = [
  '// eslint-disable-next-line @typescript-eslint/no-explicit-any -- a constructor type needs `any[]` (contravariance).',
  'export type AnyConstructor = new (...parameters: any[]) => object;',
  '',
].join('\n');

/** Mistakes each ESLint block must catch: file written in the example, expected rule. */
const ESLINT_CASES = [
  {
    file: 'src/atoms/button/violation-layer.ts',
    code: "import { SearchFieldComponent } from '../../molecules/search-field/search-field.component';\n\nexport const FIELD = SearchFieldComponent;\n",
    rule: 'boundaries/dependencies',
  },
  {
    file: 'src/atoms/button/violation-http.ts',
    code: "import { HttpClient } from '@angular/common/http';\n\nexport const CLIENT = HttpClient;\n",
    rule: 'boundaries/dependencies',
  },
  {
    file: 'src/utils/text/violation-html.ts',
    code: '/**\n * Shows HTML.\n *\n * @param element - Target.\n * @param html - Markup.\n */\nexport function show(element: HTMLElement, html: string): void {\n  element.innerHTML = html;\n}\n',
    rule: 'no-unsanitized/property',
  },
  {
    file: 'src/atoms/button/violation.html',
    code: '<img ngSrc="logo.png" width="10" height="10" />\n',
    rule: '@angular-eslint/template/alt-text',
  },
];

/** Mistakes the Stylelint blocks must catch, all in one file of a component. */
const STYLELINT_CASE = {
  file: 'src/atoms/button/violation.scss',
  code: [
    '@layer widgets {',
    '  .violation {',
    '    margin: 12px;',
    '    color: #fff;',
    '    transition: width 1s;',
    '',
    '    &:focus {',
    '      outline: none;',
    '    }',
    '  }',
    '}',
    '',
  ].join('\n'),
  rules: [
    'design-system/layer-name-allowed-list',
    'scale-unlimited/declaration-strict-value',
    'color-no-hex',
    'a11y/no-outline-none',
    'plugin/no-low-performance-animation-properties',
  ],
};

/**
 * Writes a file in the example for the time of a check, and always removes it.
 *
 * @param file - Path relative to the example.
 * @param code - Content of the file.
 * @param check - Receives the absolute path and returns the failures.
 * @returns {Promise<string[]>} The failures of the check.
 */
async function withCaseFile(file, code, check) {
  const absolute = path.join(EXAMPLE_DIRECTORY, file);
  fs.writeFileSync(absolute, code);
  try {
    return await check(absolute);
  } finally {
    fs.rmSync(absolute);
  }
}

/**
 * Lists the rules reported by ESLint results.
 *
 * @param results - ESLint results.
 * @returns The rule ids, `parse` for a parsing error.
 */
function rulesOf(results) {
  return results.flatMap(({ messages }) => messages.map(({ ruleId }) => ruleId ?? 'parse'));
}

/**
 * Checks that the example passes its ESLint and Stylelint profiles and compiles with the layer order first.
 *
 * @returns {Promise<string[]>} The failures.
 */
async function checkExample() {
  const failures = [];
  const eslint = new ESLint({ cwd: EXAMPLE_DIRECTORY });
  const eslintRules = rulesOf(await eslint.lintFiles(['.']));
  if (eslintRules.length > 0) {
    failures.push(`example: ESLint reports ${eslintRules.join(', ')}`);
  }
  const { results } = await stylelint.lint({ files: path.join(EXAMPLE_DIRECTORY, 'src/**/*.scss') });
  const stylelintRules = results.flatMap(({ warnings }) => warnings.map(({ rule }) => rule));
  if (stylelintRules.length > 0) {
    failures.push(`example: Stylelint reports ${stylelintRules.join(', ')}`);
  }
  const { css } = compile(path.join(EXAMPLE_DIRECTORY, 'src/styles/styles.scss'));
  if (!css.startsWith(LAYER_ORDER)) {
    failures.push('example: the compiled stylesheet does not start with the layer order');
  }
  return failures;
}

/**
 * Checks that each ESLint block catches its mistake.
 *
 * @returns {Promise<string[]>} The failures.
 */
async function checkEslintCases() {
  const eslint = new ESLint({ cwd: EXAMPLE_DIRECTORY });
  const failures = [];
  for (const { file, code, rule } of ESLINT_CASES) {
    // eslint-disable-next-line no-await-in-loop -- each case writes, lints and removes its own file.
    const caseFailures = await withCaseFile(file, code, async (absolute) => {
      const reported = rulesOf(await eslint.lintFiles([absolute]));
      return reported.includes(rule) ? [] : [`${file}: expected ${rule}, got ${reported.join(', ') || 'nothing'}`];
    });
    failures.push(...caseFailures);
  }
  return failures;
}

/**
 * Checks that a justified escape hatch passes in a library and is refused in an application.
 *
 * @returns {Promise<string[]>} The failures.
 */
function checkEscapeHatch() {
  const library = new ESLint({ cwd: EXAMPLE_DIRECTORY });
  const app = new ESLint({
    cwd: EXAMPLE_DIRECTORY,
    overrideConfigFile: true,
    overrideConfig: defineConfig(
      angularAppProfile({
        tsconfigRootDirectory: EXAMPLE_DIRECTORY,
        developmentDependencyFiles: ['**/*.spec.ts'],
        prefix: 'ds',
        isAccessible: true,
        isTranslated: false,
        usesRxjs: true,
        storybookPackageDirectory: undefined,
        browsers: ['last 2 Chrome versions', 'last 2 Firefox versions'],
        polyfills: [],
      }),
    ),
  });
  return withCaseFile('src/utils/text/escape-hatch.ts', ESCAPE_HATCH, async (absolute) => {
    const libraryRules = rulesOf(await library.lintFiles([absolute]));
    const appRules = rulesOf(await app.lintFiles([absolute]));
    const failures = [];
    if (libraryRules.length > 0) {
      failures.push(`escape hatch: the library profile reports ${libraryRules.join(', ')}`);
    }
    if (!appRules.includes('@eslint-community/eslint-comments/no-restricted-disable')) {
      failures.push(`escape hatch: the app profile reports ${appRules.join(', ') || 'nothing'}`);
    }
    return failures;
  });
}

/**
 * Checks that the Stylelint blocks catch their mistakes.
 *
 * @returns {Promise<string[]>} The failures.
 */
function checkStylelintCase() {
  return withCaseFile(STYLELINT_CASE.file, STYLELINT_CASE.code, async (absolute) => {
    const { results } = await stylelint.lint({ files: absolute });
    const reported = new Set(results.flatMap(({ warnings }) => warnings.map(({ rule }) => rule)));
    return STYLELINT_CASE.rules
      .filter((rule) => !reported.has(rule))
      .map((rule) => `${STYLELINT_CASE.file}: expected ${rule}`);
  });
}

const failures = [
  ...(await checkExample()),
  ...(await checkEslintCases()),
  ...(await checkEscapeHatch()),
  ...(await checkStylelintCase()),
];
if (failures.length > 0) {
  // eslint-disable-next-line no-console -- a command-line script reports its result.
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  // eslint-disable-next-line no-console -- a command-line script reports its result.
  console.info('Lint presets: the example passes, and every block catches its mistake.');
}
