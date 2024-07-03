import { test, expect } from '@playwright/test';
import { DashboardPage } from './pages/dashboardPage';
import { BASE_TEST_URL } from './constants';
import { LandingPage } from './pages/landingPage';

test('Login', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  const landingPage = new LandingPage(page);

  await page.goto(BASE_TEST_URL);
  await landingPage.viewDashboardButton.click();
  await expect(dashboardPage.accountManagementHeading).toBeVisible();
});
