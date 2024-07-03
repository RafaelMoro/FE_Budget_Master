import { Page, type Locator, expect } from '@playwright/test';

export class DashboardPage {
  page: Page;

  accountManagementHeading: Locator;

  currentMonthAccordeon: Locator;

  createAccountButton: Locator;

  createAccountCard: Locator;

  accountTitleInput: Locator;

  accountAmountInput: Locator;

  noRecordsText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountManagementHeading = page.getByRole('heading', { name: 'Account management' });
    this.currentMonthAccordeon = page.getByRole('button', { name: /current month/i });
    this.createAccountButton = page.getByRole('button', { name: 'Create account' });
    this.createAccountCard = page.locator('article').filter({ hasText: 'Create Account' });
    this.noRecordsText = page.getByText('You have not created records');

    // Account Dialog modal
    this.accountTitleInput = page.getByLabel('Account Title');
    this.accountAmountInput = page.getByLabel('Amount');
  }

  async createAccount() {
    await expect(this.currentMonthAccordeon).toBeVisible();
    await this.createAccountCard.click();

    // Modal
    await expect(this.page.getByRole('heading')).toContainText('Create Account:');
    // click on create account button on the modal
    await this.createAccountButton.click();

    // Validation
    await expect(this.page.locator('form')).toContainText('The title of your account is required.');
    await expect(this.page.locator('form')).toContainText('The initial amount of your account is required.');

    // Fill account's information
    await this.accountTitleInput.fill('My Account');
    await this.accountAmountInput.fill('1000');
    await this.page.getByLabel('Dark Orange').click();
    await this.page.getByRole('option', { name: 'Green', exact: true }).click();
    await this.createAccountButton.click();

    // await expect(this.page.getByTestId('notification-container').getByRole('heading')).toContainText('Account My account created');
    await expect(this.page.getByText('My account$1,500.')).toBeVisible();
  }
}
