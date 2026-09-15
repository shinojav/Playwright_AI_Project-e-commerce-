import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { VALID_USERS, PRODUCTS } from '../test-data/users';

test.describe('Shopping Cart - Functional Tests', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);

    await loginPage.navigate();
    await loginPage.login(VALID_USERS.standard.username, VALID_USERS.standard.password);
    await expect(productsPage.pageTitle).toHaveText('Products');
  });

  test('should display added product details in cart', async ({ page }) => {
    await productsPage.addProductToCart(PRODUCTS.backpack.name);
    await productsPage.goToCart();

    await expect(page).toHaveURL(/.*cart.html/);
    await expect(cartPage.pageTitle).toHaveText('Your Cart');

    const cartItem = cartPage.getCartItem(PRODUCTS.backpack.name);
    await expect(cartItem).toBeVisible();
    await expect(cartItem.locator('.inventory_item_price')).toHaveText(PRODUCTS.backpack.price);
    await expect(cartItem.locator('.cart_quantity')).toHaveText('1');
  });

  test('should allow removing an item directly from the cart', async () => {
    await productsPage.addProductToCart(PRODUCTS.backpack.name);
    await productsPage.addProductToCart(PRODUCTS.bikeLight.name);
    await productsPage.goToCart();

    await expect(cartPage.cartItems).toHaveCount(2);

    await cartPage.removeItem(PRODUCTS.backpack.name);

    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.getCartItem(PRODUCTS.backpack.name)).not.toBeVisible();
    await expect(cartPage.getCartItem(PRODUCTS.bikeLight.name)).toBeVisible();
  });

  test('should navigate back to products when clicking Continue Shopping', async ({ page }) => {
    await productsPage.addProductToCart(PRODUCTS.backpack.name);
    await productsPage.goToCart();

    await cartPage.continueShopping();

    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(productsPage.pageTitle).toHaveText('Products');
    // Verify item remains added
    await expect(productsPage.cartBadge).toHaveText('1');
  });
});
