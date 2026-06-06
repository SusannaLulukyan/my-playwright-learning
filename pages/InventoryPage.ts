import { type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator(".shopping_cart_badge");
  }

  async addProductToCart(productName: string) {
    await this.page
      .getByText(productName)
      .locator("xpath=ancestor::div[@class='inventory_item']")
      .getByRole("button", { name: /add to cart/i })
      .click();
  }

  async openCart() {
    await this.page.locator(".shopping_cart_link").click();
  }
}