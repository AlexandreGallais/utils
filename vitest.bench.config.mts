// Benchmarks in a real browser (Chromium, through Playwright): the functions run where they run in the
// applications, DOM and SVG included. `pnpm bench`. Learn more at https://vitest.dev/guide/browser/
import { fileURLToPath } from 'node:url';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    // The benchmarks import the library by its name, like the projects that copy it.
    alias: { utils: fileURLToPath(new URL('src/index.ts', import.meta.url)) },
  },
  server: {
    // Cross-origin isolation: the browser then gives precise timers (5 µs instead of 100 µs).
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
  test: {
    globals: true,
    benchmark: {
      include: ['benchmarks/**/*.bench.ts'],
    },
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
});
