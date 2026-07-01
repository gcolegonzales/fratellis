import { test, expect } from '@playwright/test';

test.describe('Gallery lightbox', () => {
  test('opens and closes the lightbox', async ({ page }) => {
    await page.goto('/gallery');
    const box = page.locator('#lightbox');
    await expect(box).toBeHidden();

    await page.locator('.gallery-item').first().click();
    await expect(box).toBeVisible();
    await expect(page.locator('#lightbox-img')).toHaveAttribute('src', /gallery/);

    await page.locator('#lightbox-close').click();
    await expect(box).toBeHidden();
  });

  test('closes on Escape', async ({ page }) => {
    await page.goto('/gallery');
    await page.locator('.gallery-item').first().click();
    await expect(page.locator('#lightbox')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#lightbox')).toBeHidden();
  });
});
