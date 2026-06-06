import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

test.describe("Cart", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("add product to cart shows badge", async ({ page }) => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await expect(inventoryPage.cartBadge).toHaveText("1");
  });

  test("remove product clears cart badge", async ({ page }) => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await expect(inventoryPage.cartBadge).toHaveText("1");
    await page.getByRole("button", { name: /remove/i }).click();
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });

  test("cart page shows the name of the selected product", async ({ page }) => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.openCart();
    await expect(page.getByText("Sauce Labs Backpack")).toBeVisible();
  });

  test("adding multiple products shows correct badge count", async ({ page }) => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.addProductToCart("Sauce Labs Bike Light");
    await expect(inventoryPage.cartBadge).toHaveText("2");
  });
});
