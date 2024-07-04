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

  editAccountIconButton: Locator;

  editModalTitle: Locator;

  modifyAccountButtonModal: Locator;

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
    this.editAccountIconButton = page.getByLabel('edit-button-account-My Account').first();
    this.editModalTitle = page.getByRole('heading', { name: 'Modify Account:' });
    this.modifyAccountButtonModal = page.getByRole('button', { name: 'Modify Account' });
  }

  async createAccount({ accountTitle }: { accountTitle: string }) {
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
    await this.accountTitleInput.fill(accountTitle);
    await this.accountAmountInput.fill('1000');
    await this.page.getByLabel('Dark Orange').click();
    await this.page.getByRole('option', { name: 'Green', exact: true }).click();
    await this.createAccountButton.click();

    await expect(this.page.getByText(accountTitle)).toBeVisible();
  }

  async modifyAccount({ accountTitle }: { accountTitle: string }) {
    // On dashboard
    await expect(this.currentMonthAccordeon).toBeVisible();

    // Click on edit icon button of the account created on createAccount()
    await this.page.getByLabel(`edit-button-account-${accountTitle}`).click();

    // await for modal to be opened
    await expect(this.editModalTitle).toBeVisible();

    // Edit account's information
    await this.accountTitleInput.fill(`${accountTitle} edited`);
    await this.accountAmountInput.fill('500');
    await this.page.getByLabel('Green').click();
    await this.page.getByRole('option', { name: 'Dark Red' }).click();
    await this.page.getByLabel('Debit').click();
    await this.page.getByRole('option', { name: 'Food Voucher' }).click();

    await this.modifyAccountButtonModal.click();

    // asset
    await expect(this.page.getByRole('complementary')).toContainText(`${accountTitle} edited`);
    await expect(this.page.getByRole('complementary')).toContainText('$500.00');
    await expect(this.page.getByRole('complementary')).toContainText('Food Voucher');
  }

  async deleteAccount({ accountTitle }: { accountTitle: string }) {
    await expect(this.currentMonthAccordeon).toBeVisible();
    await this.page.getByLabel(`delete-button-account-${accountTitle} edited`).click();

    // Modal
    await expect(this.page.getByRole('heading')).toContainText('Delete Account');
    await expect(
      this.page.getByLabel('Delete Account').locator('div'),
    ).toContainText(/Are you sure you want to delete the account/i);
    await this.page.getByRole('button', { name: 'Delete Account' }).click();
    await expect(this.page.getByRole('heading', { name: /My Account/i })).not.toBeVisible();
  }
}
