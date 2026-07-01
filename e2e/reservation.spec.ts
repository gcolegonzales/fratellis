import { test, expect } from '@playwright/test';

test.describe('Reservation form', () => {
  test('empty submit shows validation errors', async ({ page }) => {
    await page.goto('/reservations');
    await page.locator('#r-submit').click();
    await expect(page.locator('#r-name-error')).toBeVisible();
    await expect(page.locator('#r-email-error')).toBeVisible();
    // form is still shown (not confirmed)
    await expect(page.locator('#reservation-form')).toBeVisible();
  });

  test('invalid email is rejected', async ({ page }) => {
    await page.goto('/reservations');
    await page.fill('#r-name', 'Gio');
    await page.fill('#r-phone', '225-555-0100');
    await page.fill('#r-email', 'not-an-email');
    await page.fill('#r-date', '2027-01-01');
    await page.fill('#r-time', '19:00');
    await page.fill('#r-party', '4');
    await page.locator('#r-submit').click();
    await expect(page.locator('#r-email-error')).toBeVisible();
    await expect(page.locator('#reservation-form')).toBeVisible();
  });

  test('valid submission reaches the confirmation state', async ({ page }) => {
    await page.goto('/reservations');
    await page.fill('#r-name', 'Gio');
    await page.fill('#r-phone', '225-555-0100');
    await page.fill('#r-email', 'gio@example.com');
    await page.fill('#r-date', '2027-01-01');
    await page.fill('#r-time', '19:00');
    await page.fill('#r-party', '4');
    await page.locator('#r-submit').click();
    // mailto fallback (no PUBLIC_FORMSPREE_ID in test) → confirmation panel shows
    await expect(page.locator('#reservation-confirm')).toBeVisible();
    await expect(page.locator('#reservation-form')).toBeHidden();
  });
});
