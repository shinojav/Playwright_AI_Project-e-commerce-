import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  getCartItem(productName: string): Locator {
    return this.cartItems.filter({ hasText: productName });
  }

  async removeItem(productName: string): Promise<void> {
    const item = this.getCartItem(productName);
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getItemQuantity(productName: string): Promise<string> {
    const item = this.getCartItem(productName);
    return (await item.locator('.cart_quantity').textContent()) ?? '';
  }

  async getItemPrice(productName: string): Promise<string> {
    const item = this.getCartItem(productName);
    return (await item.locator('.inventory_item_price').textContent()) ?? '';
  }
}
