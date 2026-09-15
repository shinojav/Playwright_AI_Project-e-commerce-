import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import {
  VALID_USERS,
  LOCKED_USER,
  INVALID_USERS,
  VALIDATION_USERS,
  ERROR_MESSAGES
} from '../test-data/users';

test.describe('Login Functionality - Data-Driven Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('should successfully log in with standard credentials', async ({ page }) => {
    await loginPage.login(VALID_USERS.standard.username, VALID_USERS.standard.password);

    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('should display error message for locked out user', async () => {
    await loginPage.login(LOCKED_USER.username, LOCKED_USER.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.lockedOut);
  });

  for (const user of INVALID_USERS) {
    test(`should reject login with ${user.description}`, async () => {
      await loginPage.login(user.username, user.password);

      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.invalidCredentials);
    });
  }

  for (const scenario of VALIDATION_USERS) {
    test(`should validate required fields for ${scenario.description}`, async () => {
      await loginPage.login(scenario.username, scenario.password);

      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText(scenario.expectedError);
    });
  }

  test('should allow dismissing the error message', async () => {
    await loginPage.login();
    await expect(loginPage.errorMessage).toBeVisible();

    await loginPage.dismissError();
    await expect(loginPage.errorMessage).not.toBeVisible();
  });
});