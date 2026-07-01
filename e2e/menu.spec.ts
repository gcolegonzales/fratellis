import { test, expect } from '@playwright/test';

test.describe('Menu filtering', () => {
  test('search narrows to a known dish and clear resets', async ({ page }) => {
    await page.goto('/menu');

    const cards = page.locator('.dish-card');
    const totalBefore = await cards.count();
    expect(totalBefore).toBeGreaterThan(20);

    await page.locator('#menu-search').fill('scampi');
    await expect(page.locator('.dish-card:visible')).toHaveCount(1);
    await expect(page.locator('.dish-card:visible')).toContainText(/scampi/i);

    await page.locator('#menu-clear').click();
    await expect(page.locator('.dish-card:visible')).toHaveCount(totalBefore);
  });

  test('tag filter shows only matching dishes', async ({ page }) => {
    await page.goto('/menu');
    await page.locator('.tag-chip[data-tag="seafood"]').click();

    const visible = page.locator('.dish-card:visible');
    const n = await visible.count();
    expect(n).toBeGreaterThan(0);
    // every visible card carries the seafood tag
    for (let i = 0; i < n; i++) {
      await expect(visible.nth(i)).toHaveAttribute('data-tags', /seafood/);
    }
    await expect(page.locator('#menu-result-count')).toContainText(/Showing \d+ of \d+/);
  });

  test('no-results state appears for a nonsense query', async ({ page }) => {
    await page.goto('/menu');
    await page.locator('#menu-search').fill('zzznotathing');
    await expect(page.locator('#menu-no-results')).toBeVisible();
  });
});
