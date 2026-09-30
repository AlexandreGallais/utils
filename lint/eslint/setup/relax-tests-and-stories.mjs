// Specs, test helpers, benchmarks and stories are tests and documentation: one must be able to hack in them to
// get a test or a story done. There, every warning becomes an info (shown in blue, never blocking), and so do the
// rules that forbid the usual hacks (`any`, `!`, unsafe assertions). The errors stay: a bug or a style the
// autofix applies.

import fs from 'node:fs';
import path from 'node:path';
import { CODE_FILES, TEST_CODE_FILES, TYPESCRIPT_FILES } from './files.mjs';

const STORY_FILES = ['**/*.stories.ts'];

/** The globs of the configs that apply to every file: only their rules are relaxed (none is switched on). */
const GENERAL_FILES = new Set([JSON.stringify(CODE_FILES), JSON.stringify(TYPESCRIPT_FILES)]);

/** Errors that forbid the hacks a test or a story may need: they become infos there. */
const HACK_RULES = new Set([
  '@typescript-eslint/no-empty-function',
  '@typescript-eslint/no-explicit-any',
  '@typescript-eslint/no-invalid-void-type',
  '@typescript-eslint/no-non-null-assertion',
  '@typescript-eslint/no-unsafe-argument',
  '@typescript-eslint/no-unsafe-assignment',
  '@typescript-eslint/no-unsafe-call',
  '@typescript-eslint/no-unsafe-function-type',
  '@typescript-eslint/no-unsafe-member-access',
  '@typescript-eslint/no-unsafe-return',
  '@typescript-eslint/no-unsafe-type-assertion',
  'no-empty-function',
]);

/**
 * Rules left as they are: the templates' rules (their plugin is registered for HTML files only), and SonarJS,
 * whose rules SonarQube applies to the specs as well.
 */
const KEPT_PREFIXES = ['@angular-eslint/template/', 'sonarjs/'];

/** A SonarJS rule turned off as a duplicate: `// Off: duplicate of no-labels.` above `'sonarjs/…'`. */
const DUPLICATE_COMMENT = '// Off: duplicate of ';
const RULE_NAME = /[@\w\-]+(?:\/[\w\-]+)*/gv;

/**
 * Lists the rules that stand for a SonarJS rule (`Off: duplicate of …` above it): SonarQube counts on them in
 * the specs too, so they keep their level.
 *
 * @returns {Set<string>} The rule names.
 */
function readSonarStandIns() {
  const directory = path.join(import.meta.dirname, '../rules');
  const standIns = new Set();
  for (const file of fs.readdirSync(directory).filter((name) => name.endsWith('.mjs'))) {
    const lines = fs.readFileSync(path.join(directory, file), 'utf8').split('\n');
    lines.forEach((line, index) => {
      const text = line.trim();
      if (text.startsWith(DUPLICATE_COMMENT) && lines[index + 1]?.trim().startsWith("'sonarjs/")) {
        for (const name of text.slice(DUPLICATE_COMMENT.length).match(RULE_NAME) ?? []) {
          standIns.add(name);
        }
      }
    });
  }
  return standIns;
}

/**
 * Tells whether a rule setting is on.
 *
 * @param {unknown} severity - The severity of the setting.
 * @returns {boolean} Whether it is `warn`, `error` or `info`.
 */
function isOn(severity) {
  return ![0, 'off'].includes(/** @type {string | number} */ (severity));
}

/**
 * Builds the relaxed rules of specs and stories from the other configs.
 *
 * @param {import('eslint').Linter.Config[]} configs - The configs, flattened.
 * @returns {import('eslint').Linter.Config[]} The relaxations, to spread after them.
 */
export default function relaxTestsAndStories(configs) {
  const standIns = readSonarStandIns();
  // The last setting of each rule, among the configs that apply to every file, its options kept: a rule set for
  // some files only (the sources' one export per file) is not switched on in the specs.
  const general = configs.filter(
    (config) =>
      config.ignores === undefined && (config.files === undefined || GENERAL_FILES.has(JSON.stringify(config.files))),
  );
  const settings = new Map(general.flatMap((config) => Object.entries(config.rules ?? {})));
  // A rule the test or story blocks already set (such as no-magic-numbers, off) keeps their setting.
  const testGlobs = new Set([...TEST_CODE_FILES, ...STORY_FILES]);
  for (const config of configs) {
    if ((config.files ?? []).some((glob) => testGlobs.has(glob))) {
      for (const rule of Object.keys(config.rules ?? {})) {
        settings.delete(rule);
      }
    }
  }

  /**
   * Lists the relaxed rules.
   *
   * @param {boolean} isStory - Whether the Storybook rules apply (stories only).
   * @returns {Record<string, unknown[]>} The rules, as infos.
   */
  function relaxedRules(isStory) {
    const entries = [...settings]
      .map(([rule, value]) => [rule, [value].flat()])
      .filter(([rule]) => !KEPT_PREFIXES.some((prefix) => rule.startsWith(prefix)) && !standIns.has(rule))
      .filter(([rule]) => isStory || !rule.startsWith('storybook/'))
      .filter(([rule, [severity]]) => [1, 'warn'].includes(severity) || (HACK_RULES.has(rule) && isOn(severity)))
      .map(([rule, [, ...options]]) => [rule, ['info', ...options]]);
    return Object.fromEntries(entries);
  }

  return [
    { name: 'setup/relaxed-tests', files: TEST_CODE_FILES, rules: relaxedRules(false) },
    { name: 'setup/relaxed-stories', files: STORY_FILES, rules: relaxedRules(true) },
  ];
}
