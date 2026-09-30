// Vitest: the specs, with a 100 % coverage threshold. Learn more at https://vitest.dev/config/

import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    // The SVG specs run in Chromium (Playwright): they need a rendered SVG (`getBBox`, `getScreenCTM`).
    projects: [
      { extends: true, test: { name: 'node', include: ['src/**/*.spec.ts'], exclude: ['src/svg-*/**'] } },
      {
        extends: true,
        test: {
          name: 'browser',
          include: ['src/svg-*/**/*.spec.ts'],
          browser: { enabled: true, headless: true, provider: playwright(), instances: [{ browser: 'chromium' }] },
        },
      },
    ],
    // `pnpm bench` builds first and runs with `--experimental.viteModuleRunner=false`: benchmarks import the
    // built package natively. Vite's module runner wraps every import in a getter, an overhead that would
    // penalise the library functions and not the inline baselines.
    benchmark: {
      include: ['benchmarks/**/*.bench.ts'],
    },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.spec.ts', 'src/**/testing/**', 'src/index.ts'],
      // `json-summary` feeds the coverage shown on the wiki pages.
      reporter: ['text', 'html', 'lcovonly', 'json-summary'],
      reportsDirectory: './coverage',
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
});
