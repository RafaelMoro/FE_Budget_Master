import { Page, type Locator } from '@playwright/test';
import { BASE_TEST_URL } from '../constants';

export class LandingPage {
  page: Page;

  logInButton: Locator;

  registerButton: Locator;

  startNowButton: Locator;

  logoButton: Locator;

  viewDashboardButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logInButton = page.getByRole('button', { name: 'Log in' });
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.startNowButton = page.getByRole('button', { name: 'Start now' });
    this.viewDashboardButton = page.getByRole('button', { name: /view my dashboard/i });
    this.logoButton = page.getByRole('button', { name: 'Budget Master logo Budget' });
  }

  async navigateToDashboard() {
    await this.page.goto(BASE_TEST_URL);
    await this.page.waitForLoadState('domcontentloaded', { timeout: 15_000 });
    await this.viewDashboardButton.click();
    await this.page.waitForLoadState('domcontentloaded', { timeout: 15_000 });
    await this.page.getByRole('heading', { name: 'Account management' }).click();
  }
}
