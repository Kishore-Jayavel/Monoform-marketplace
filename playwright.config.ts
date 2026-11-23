import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for MONOFORM test suite
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Run sequentially for clear deterministic reporting
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL: 'http://127.0.0.1:5173',
    trace: 'retain-on-failure',
    screenshot: 'on',
    video: 'off',
  },
  projects: [
    {
      name: 'Desktop Chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 }
      },
    },
    {
      name: 'Mobile Chromium',
      use: {
        ...devices['Pixel 7'],
        viewport: { width: 393, height: 851 }
      },
    }
  ],
  webServer: {
    command: 'npx vite --host 127.0.0.1 --port 5173',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 15000,
  },
});
