import { Page, type Locator, expect } from '@playwright/test';
import { BASE_TEST_URL } from '../constants';

export class DashboardPage {
  page: Page;

  accountManagementHeading: Locator;

  currentMonthAccordeon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountManagementHeading = page.getByRole('heading', { name: 'Account management' });
    this.currentMonthAccordeon = page.getByRole('button', { name: /current month/i });
  }

  async waitLoadDashboard() {
    await this.page.goto(BASE_TEST_URL);
    await this.page.waitForLoadState('domcontentloaded', { timeout: 15_000 });
    await expect(this.currentMonthAccordeon).toBeVisible();
  }
}
