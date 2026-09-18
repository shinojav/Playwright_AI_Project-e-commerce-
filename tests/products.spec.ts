import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { VALID_USERS, PRODUCTS } from '../test-data/users';

test.describe('Products Catalog - Functional Tests', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    await loginPage.navigate();
    await loginPage.login(VALID_USERS.standard.username, VALID_USERS.standard.password);
    await expect(productsPage.pageTitle).toHaveText('Products');
  });

  test('should display all available products in catalog', async () => {
    await expect(productsPage.inventoryItems).toHaveCount(6);

    const productNames = await productsPage.getAllProductNames();
    expect(productNames).toContain(PRODUCTS.backpack.name);
    expect(productNames).toContain(PRODUCTS.bikeLight.name);
    expect(productNames).toContain(PRODUCTS.fleeceJacket.name);
  });

  test('should add a single product to cart and update button and badge', async () => {
    const product = PRODUCTS.backpack.name;
    await productsPage.addProductToCart(product);

    const item = productsPage.getProductItem(product);
    await expect(item.getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(productsPage.cartBadge).toHaveText('1');
  });

  test('should add multiple products and reflect correct cart count', async () => {
    await productsPage.addProductToCart(PRODUCTS.backpack.name);
    await productsPage.addProductToCart(PRODUCTS.bikeLight.name);
    await productsPage.addProductToCart(PRODUCTS.onesie.name);

    await expect(productsPage.cartBadge).toHaveText('3');
  });

  test('should remove a product from inventory and update cart badge', async () => {
    await productsPage.addProductToCart(PRODUCTS.backpack.name);
    await productsPage.addProductToCart(PRODUCTS.bikeLight.name);
    await expect(productsPage.cartBadge).toHaveText('2');

    await productsPage.removeProductFromCart(PRODUCTS.backpack.name);

    const item = productsPage.getProductItem(PRODUCTS.backpack.name);
    await expect(item.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    await expect(productsPage.cartBadge).toHaveText('1');
  });

  test('should sort products by price from low to high', async () => {
    await productsPage.sortBy('lohi');

    const prices = await productsPage.getAllProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test('should sort products by name from Z to A', async () => {
    await productsPage.sortBy('za');

    const names = await productsPage.getAllProductNames();
    const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sortedNames);
  });
});
