import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  // Step One: Information
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  // Step Two: Overview
  readonly pageTitle: Locator;
  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;

  // Step Three: Complete
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Step One
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.errorMessage = page.locator('[data-test="error"]');

    // Step Two
    this.pageTitle = page.locator('.title');
    this.itemTotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.getByRole('button', { name: 'Finish' });

    // Step Three
    this.completeHeader = page.getByRole('heading', { name: 'Thank you for your order!' });
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
  }

  async fillCustomerInformation(firstName?: string, lastName?: string, postalCode?: string): Promise<void> {
    if (firstName) {
      await this.firstNameInput.fill(firstName);
    } else {
      await this.firstNameInput.clear();
    }

    if (lastName) {
      await this.lastNameInput.fill(lastName);
    } else {
      await this.lastNameInput.clear();
    }

    if (postalCode) {
      await this.postalCodeInput.fill(postalCode);
    } else {
      await this.postalCodeInput.clear();
    }
  }

  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  async backHome(): Promise<void> {
    await this.backHomeButton.click();
  }

  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) ?? '';
  }
}
