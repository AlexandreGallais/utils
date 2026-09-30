// Checks the lint presets of lint/ on the example design system (examples/design-system): the example passes
// its presets, compiles, and each block catches the mistake it is made for (files written for the check, then
// removed). The example configs of lint/examples/ load.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ESLint } from 'eslint';
import { defineConfig } from 'eslint/config';
import { compile } from 'sass';
import stylelint from 'stylelint';
import withoutPlugins from '../lint/eslint/setup/without-plugins.mjs';
import { angularAppPreset, typescriptNodePreset } from '../lint/index.mjs';
import { checkSonarWay } from './lint-presets/check-sonar-way.mjs';

// Like `pnpm lint`: the info rules (editor suggestions) are off.
process.env.ESLINT_INFO_RULES = 'off';

const EXAMPLE_DIRECTORY = path.resolve('examples/design-system');
const EXAMPLE_CONFIGS_DIRECTORY = path.resolve('lint/examples');
const LAYER_ORDER = '@layer reset, tokens, base, layout, components, utilities, overrides;';
/** An `any` in a type: free in a library, a warning to justify in an application. */
const ESCAPE_HATCH = 'export type AnyConstructor = new (...parameters: any[]) => object;\n';

/** Mistakes each ESLint block must catch: file written in the example, expected rule. */
const ESLINT_CASES = [
  {
    file: 'src/organisms/user-list/violation-deep-import.ts',
    code: "import { ButtonComponent } from '../../atoms/button/button.component';\n\nexport const BUTTON = ButtonComponent;\n",
    rule: 'local/import-folders',
  },
  {
    file: 'src/atoms/button/violation.html',
    code: '<input type="search" autofocus />\n',
    rule: '@angular-eslint/template/no-autofocus',
  },
  {
    file: 'src/utils/text/violationName.ts',
    code: 'export const VALUE = 1;\n',
    rule: 'local/kebab-case-path',
  },
  {
    file: 'src/utils/text/format-counts.ts',
    code: 'export function formatCount(): string {\n  return "";\n}\n\nexport function formatTotal(): string {\n  return "";\n}\n',
    rule: 'local/export-matches-filename',
  },
  {
    file: 'src/utils/text/violation-error-disable.ts',
    code: '// eslint-disable-next-line no-var -- an error cannot be disabled.\nvar value = 1;\n\nexport const VALUE = value;\n',
    rule: 'local/disable-only-warnings',
  },
  {
    file: 'src/utils/text/violation-no-reason.ts',
    code: '// eslint-disable-next-line @typescript-eslint/no-magic-numbers\nexport const VALUE = 42;\n',
    rule: 'local/disable-reason',
  },
  {
    file: 'src/utils/text/violation-block-disable.ts',
    code: '/* eslint-disable @typescript-eslint/no-magic-numbers -- a block disable. */\nexport const VALUE = 42;\n',
    rule: 'local/disable-next-line-only',
  },
];

/** Mistakes the Stylelint preset must catch, all in one SCSS file of a component. */
const STYLELINT_CASE = {
  file: 'src/atoms/button/violation.scss',
  code: [
    '.violation {',
    '  // stylelint-disable-next-line color-no-invalid-hex -- an error cannot be disabled.',
    '  color: #ggg;',
    '  padding: 1.5rem;',
    '}',
    '',
  ].join('\n'),
  rules: ['local/disable-only-warnings', 'declaration-property-value-disallowed-list'],
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
 * Checks that the example passes its ESLint and Stylelint presets and compiles with the layer order first.
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
 * Checks that the autofix of local/import-folders rewrites a deep import through the folder's index.
 *
 * @returns {Promise<string[]>} The failures.
 */
function checkImportFix() {
  const eslint = new ESLint({ cwd: EXAMPLE_DIRECTORY, fix: true });
  const [deepImport] = ESLINT_CASES;
  return withCaseFile(deepImport.file, deepImport.code, async (absolute) => {
    const [result] = await eslint.lintFiles([absolute]);
    return result?.output?.includes("from '../../atoms'") === true
      ? []
      : [`${deepImport.file}: the autofix did not import '../../atoms'`];
  });
}

/**
 * Builds the application preset for the example.
 *
 * @returns {import('eslint').Linter.Config[]} The configs.
 */
function createAppPreset() {
  const rootConfig = typescriptNodePreset({
    tsconfigRootDirectory: EXAMPLE_DIRECTORY,
    overrides: [],
  });
  return angularAppPreset({
    rootConfig,
    sourceFiles: ['src/**/*.ts'],
    developmentDependencyFiles: ['**/*.spec.ts'],
    prefix: 'ds',
    overrides: [],
  });
}

/**
 * Checks that the example passes the application preset without SonarJS and import-x.
 *
 * @returns {Promise<string[]>} The failures.
 */
async function checkWithoutPlugins() {
  const eslint = new ESLint({
    cwd: EXAMPLE_DIRECTORY,
    overrideConfigFile: true,
    overrideConfig: defineConfig(withoutPlugins(createAppPreset(), ['sonarjs', 'import-x'])),
  });
  const reported = rulesOf(await eslint.lintFiles(['src']));
  return reported.length > 0 ? [`without plugins: ESLint reports ${reported.join(', ')}`] : [];
}

/**
 * Checks that an `any` passes in a library and is a warning in an application.
 *
 * @returns {Promise<string[]>} The failures.
 */
function checkEscapeHatch() {
  const library = new ESLint({ cwd: EXAMPLE_DIRECTORY });
  const app = new ESLint({
    cwd: EXAMPLE_DIRECTORY,
    overrideConfigFile: true,
    overrideConfig: defineConfig(createAppPreset()),
  });
  return withCaseFile('src/utils/text/escape-hatch.ts', ESCAPE_HATCH, async (absolute) => {
    const libraryRules = rulesOf(await library.lintFiles([absolute]));
    const appRules = rulesOf(await app.lintFiles([absolute]));
    const failures = [];
    if (libraryRules.length > 0) {
      failures.push(`escape hatch: the library preset reports ${libraryRules.join(', ')}`);
    }
    if (!appRules.includes('@typescript-eslint/no-explicit-any')) {
      failures.push(`escape hatch: the app preset reports ${appRules.join(', ') || 'nothing'}`);
    }
    return failures;
  });
}

/**
 * Tells whether an ESLint or Stylelint config holds rules.
 *
 * @param {unknown} config - A flat config array (ESLint) or a config object (Stylelint).
 * @returns {boolean} Whether it has at least one rule.
 */
function hasRules(config) {
  if (Array.isArray(config)) {
    return config.some((item) => Object.keys(item.rules ?? {}).length > 0);
  }
  return Object.keys(config?.rules ?? {}).length > 0;
}

/**
 * Checks that the Stylelint preset catches its mistakes.
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

/**
 * Checks that every example config of lint/examples/ loads and holds rules.
 *
 * @returns {Promise<string[]>} The failures.
 */
async function checkExampleConfigs() {
  const files = fs.readdirSync(EXAMPLE_CONFIGS_DIRECTORY).filter((file) => file.endsWith('.config.mjs'));
  const modules = await Promise.all(
    files.map((file) => import(pathToFileURL(path.join(EXAMPLE_CONFIGS_DIRECTORY, file)).href)),
  );
  return files.filter((_file, index) => !hasRules(modules[index]?.default)).map((file) => `${file}: no rules`);
}

const failures = [
  ...(await checkExample()),
  ...(await checkEslintCases()),
  ...(await checkImportFix()),
  ...(await checkStylelintCase()),
  ...(await checkEscapeHatch()),
  ...(await checkSonarWay()),
  ...(await checkWithoutPlugins()),
  ...(await checkExampleConfigs()),
];
if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.info('Lint presets: the example passes, and every block catches its mistake.');
}
