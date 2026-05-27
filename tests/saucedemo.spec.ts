import { test, expect } from '@playwright/test';

test.describe('SauceDemo - logged in', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
  });

  test('login should redirect to inventory', async ({ page }) => {
    await expect(page).toHaveURL(/inventory/);
  });

  test('add product to cart shows badge 1', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await expect(
      page.locator('.shopping_cart_badge'),
      'Cart badge should show 1 after adding a product'
    ).toHaveText('1');
  });

  test('remove product from cart', async ({ page }) => {
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(
      page.locator('.shopping_cart_badge'),
      'Cart badge should not be visible after removing product'
    ).not.toBeVisible();
  });

});

test.describe('SauceDemo - login page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('wrong password shows error message', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(
      page.locator('.error-message-container'),
      'Error should appear for wrong password'
    ).toBeVisible();
  });

  test('empty form shows validation error', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(
      page.locator('.error-message-container'),
      'Error should appear when form is empty'
    ).toBeVisible();
  });

  test('problem user can remove item from PLP', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('problem_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await expect(
      page.getByRole('button', { name: 'Remove' }).first(),
      'Remove button should be visible and clickable on PLP'
    ).toBeEnabled();
    await page.getByRole('button', { name: 'Remove' }).first().click();
    await expect(
      page.locator('.shopping_cart_badge'),
      'Known bug: cart badge still visible for problem_user after removing'
    ).toBeVisible();
  });

});