import { test, expect } from '@playwright/test';

test.describe('Catering inquiry form', () => {
  test('empty submit shows validation errors', async ({ page }) => {
    await page.goto('/catering');
    await page.locator('#c-submit').click();
    await expect(page.locator('#c-name-error')).toBeVisible();
    await expect(page.locator('#c-email-error')).toBeVisible();
    await expect(page.locator('#catering-form')).toBeVisible();
  });

  test('valid inquiry reaches the confirmation state', async ({ page }) => {
    await page.goto('/catering');
    await page.fill('#c-name', 'Lola');
    await page.fill('#c-phone', '225-555-0100');
    await page.fill('#c-email', 'lola@example.com');
    await page.fill('#c-date', '2027-03-01');
    await page.fill('#c-headcount', '40');
    await page.locator('#c-submit').click();
    await expect(page.locator('#catering-confirm')).toBeVisible();
    await expect(page.locator('#catering-form')).toBeHidden();
  });
});
