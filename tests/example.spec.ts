import { test, expect } from '@playwright/test'; //load test tools from playwright

test('has title', async ({ page }) => { //test case to check if the title of the page contains playwright
 await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring. // 
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => { //test case to check if the "get started" link is working correctly
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
