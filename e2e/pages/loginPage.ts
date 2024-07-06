import { Page, type Locator } from '@playwright/test';

export class LoginPage {
  page: Page;

  logInButton: Locator;

  registerButton: Locator;

  showPasswordButton: Locator;

  emailInput: Locator;

  paswordInput: Locator;

  forgotPasswordLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logInButton = page.getByTestId('login-button');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.showPasswordButton = page.getByTestId('show-hide-password-button');
    this.emailInput = page.getByLabel('Email');
    this.paswordInput = page.getByLabel('Password');
    this.forgotPasswordLink = page.getByRole('link', { name: 'Do you forgot your password?' });
  }
}
