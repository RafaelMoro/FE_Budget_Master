import { Page, type Locator } from '@playwright/test';

export class LandingPage {
  page: Page;

  logInButton: Locator;

  registerButton: Locator;

  startNowButton: Locator;

  logoButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logInButton = page.getByRole('button', { name: 'Log in' });
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.startNowButton = page.getByRole('button', { name: 'Start now' });
    this.logoButton = page.getByRole('button', { name: 'Budget Master logo Budget' });
  }
}
