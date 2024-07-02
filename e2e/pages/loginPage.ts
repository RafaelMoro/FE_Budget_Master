import { Page, type Locator } from '@playwright/test';

const loginUser = process.env.REACT_APP_TEST_LOGIN_EMAIL ?? '';
const loginPassword = process.env.REACT_APP_TEST_LOGIN_PASSWORD ?? '';

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

  async login() {
    console.log('loginUser', loginUser);
    console.log('loginPassword', loginPassword);
    if (!loginUser || !loginPassword) {
      throw new Error('Missing TEST_LOGIN_EMAIL or TEST_LOGIN_PASSWORD environment variable');
    }
    await this.emailInput.fill(loginUser);
    await this.paswordInput.fill(loginPassword);
    await this.logInButton.click();
  }
}
