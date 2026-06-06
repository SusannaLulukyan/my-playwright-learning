import { type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.sortDropdown = page.locator(".product_sort_container");
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

  async sortByPriceLowToHigh() {
    await this.sortDropdown.selectOption("lohi");
  }

  async getPrices(): Promise<number[]> {
    const priceElements = await this.page
      .locator(".inventory_item_price")
      .allTextContents();
    return priceElements.map((p) => parseFloat(p.replace("$", "")));
  }
}

