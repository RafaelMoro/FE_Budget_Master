import { Page, type Locator } from '@playwright/test';

export class DashboardPage {
  page: Page;

  accountManagementHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountManagementHeading = page.getByRole('heading', { name: 'Account management' });
  }

  async waitLoadDashboard() {
    this.page.waitForLoadState('domcontentloaded', { timeout: 15_000 });
    expect(this.accountManagementHeading).toBeVisible();
  }
}
