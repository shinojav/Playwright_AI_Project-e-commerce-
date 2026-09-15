import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorDismissButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorDismissButton = page.locator('.error-button');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username?: string, password?: string): Promise<void> {
    if (username !== undefined && username !== '') {
      await this.fillUsername(username);
    } else {
      await this.usernameInput.clear();
    }

    if (password !== undefined && password !== '') {
      await this.fillPassword(password);
    } else {
      await this.passwordInput.clear();
    }

    await this.clickLogin();
  }

  async dismissError(): Promise<void> {
    await this.errorDismissButton.click();
  }
}
