import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './specs',
  timeout: 60_000,
  reporter: [['list'], ['html', { open: 'never' }]],
  projects: [{ name: 'Chromium', use: { ...devices['Desktop Chrome'] } }]
});