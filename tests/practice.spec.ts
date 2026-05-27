import { test, expect } from '@playwright/test';

test('google has correct title', async ({ page }) => {
  await page.goto('https://google.com');
  await expect(page).toHaveTitle(/Google/);
  await expect(page.getByRole('combobox')).toBeVisible();
});