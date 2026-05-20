import { test, expect } from '@playwright/test';
test('products page renders fast', async ({ page }) => {
  const start = Date.now();
  await page.goto(process.env.WEB_URL || 'http://localhost:3000/products', { waitUntil: 'domcontentloaded' });
  const grid = page.locator('text=المنتجات');
  await expect(grid).toBeVisible();
  const tt = Date.now() - start;
  console.log('TTI-ish(ms):', tt);
  expect(tt).toBeLessThan(1500);
});