import { test, expect } from '@playwright/test';

test('home page responds', async ({ page }) => {
  const res = await page.goto('/');
  expect(res?.status() ?? 500).toBeLessThan(400);
  await expect(page.locator('body')).toBeVisible();
});
