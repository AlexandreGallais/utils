// Reads the outputs of `pnpm wiki:data`: the Vitest JSON report and the coverage summary.

import fs from 'node:fs';
import path from 'node:path';

const TEST_RESULTS_FILE = 'coverage/test-results.json';
const COVERAGE_SUMMARY_FILE = 'coverage/coverage-summary.json';

/**
 * Reads a JSON file produced by a previous step, if it exists.
 *
 * @param file - Path of the file.
 * @returns The parsed content, or `undefined` when the file is missing.
 */
function readOptionalJson(file) {
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : undefined;
}

/**
 * Indexes the test results of the Vitest JSON report by spec file.
 *
 * @returns The title and status of each test, by absolute spec path; empty without report.
 */
export function readTestResults() {
  const report = readOptionalJson(TEST_RESULTS_FILE);
  const results = new Map();
  if (report === undefined) {
    return results;
  }
  for (const suite of report.testResults) {
    results.set(
      path.resolve(suite.name),
      suite.assertionResults.map(({ title, status }) => ({ title, status })),
    );
  }
  return results;
}

/**
 * Indexes the line coverage of the coverage summary by source file.
 *
 * @returns The percentage of covered lines, by absolute file path; empty without summary.
 */
export function readCoverage() {
  const summary = readOptionalJson(COVERAGE_SUMMARY_FILE);
  return summary === undefined
    ? new Map()
    : new Map(
        Object.entries(summary)
          .filter(([file]) => file !== 'total')
          .map(([file, { lines }]) => [path.resolve(file), lines.pct]),
      );
}
