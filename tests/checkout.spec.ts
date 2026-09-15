import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import {
  VALID_USERS,
  PRODUCTS,
  CUSTOMER_DATA,
  ERROR_MESSAGES
} from '../test-data/users';

test.describe('Checkout Workflow - Functional & Validation Tests', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login(VALID_USERS.standard.username, VALID_USERS.standard.password);
    await expect(productsPage.pageTitle).toHaveText('Products');

    // Add a product and navigate to cart
    await productsPage.addProductToCart(PRODUCTS.backpack.name);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
  });

  test('should successfully complete the entire checkout process', async ({ page }) => {
    // Fill customer info
    await checkoutPage.fillCustomerInformation(
      CUSTOMER_DATA.firstName,
      CUSTOMER_DATA.lastName,
      CUSTOMER_DATA.postalCode
    );
    await checkoutPage.continueToOverview();

    // Verify Overview step
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await expect(checkoutPage.pageTitle).toHaveText('Checkout: Overview');
    await expect(page.getByText(PRODUCTS.backpack.name)).toBeVisible();
    await expect(checkoutPage.itemTotalLabel).toContainText('$29.99');
    await expect(checkoutPage.taxLabel).toBeVisible();
    await expect(checkoutPage.totalLabel).toContainText('$32.39');

    // Complete order
    await checkoutPage.finishOrder();

    // Verify Confirmation
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    await expect(checkoutPage.completeHeader).toBeVisible();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkoutPage.completeText).toContainText('Your order has been dispatched');

    // Navigate back home
    await checkoutPage.backHome();
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(productsPage.pageTitle).toHaveText('Products');
  });

  test('should display validation error when first name is missing', async () => {
    await checkoutPage.fillCustomerInformation('', CUSTOMER_DATA.lastName, CUSTOMER_DATA.postalCode);
    await checkoutPage.continueToOverview();

    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toHaveText(ERROR_MESSAGES.firstNameRequired);
  });

  test('should display validation error when postal code is missing', async () => {
    await checkoutPage.fillCustomerInformation(CUSTOMER_DATA.firstName, CUSTOMER_DATA.lastName, '');
    await checkoutPage.continueToOverview();

    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toHaveText(ERROR_MESSAGES.postalCodeRequired);
  });

  test('should cancel checkout and return to cart', async ({ page }) => {
    await checkoutPage.cancelCheckout();

    await expect(page).toHaveURL(/.*cart.html/);
    await expect(cartPage.pageTitle).toHaveText('Your Cart');
    await expect(cartPage.getCartItem(PRODUCTS.backpack.name)).toBeVisible();
  });
});
