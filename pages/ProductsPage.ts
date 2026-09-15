import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  getProductItem(productName: string): Locator {
    return this.inventoryItems.filter({ hasText: productName });
  }

  async addProductToCart(productName: string): Promise<void> {
    const item = this.getProductItem(productName);
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    const item = this.getProductItem(productName);
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async sortBy(optionValueOrLabel: string): Promise<void> {
    await this.sortDropdown.selectOption(optionValueOrLabel);
  }

  async getItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async getAllProductNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allInnerTexts();
  }

  async getAllProductPrices(): Promise<number[]> {
    const rawPrices = await this.page.locator('.inventory_item_price').allInnerTexts();
    return rawPrices.map(p => parseFloat(p.replace('$', '')));
  }
}
