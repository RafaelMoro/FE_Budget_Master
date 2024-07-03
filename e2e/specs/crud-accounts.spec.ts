import { test } from '@playwright/test';
import { DashboardPage } from '../pages/dashboardPage';
import { LandingPage } from '../pages/landingPage';

test.describe('CRUD Accounts', () => {
  test("GIVEN: I'm a logged in user, I navigate into my dashboard", async ({ page }) => {
    await test.step("GIVEN: I'm a logged in user, I navigate into my dashboard", async () => {
      const landingPage = new LandingPage(page);
      await landingPage.navigateToDashboard();
    });

    await test.step('THEN: I create an account', async () => {
      const dashboardPage = new DashboardPage(page);

      await dashboardPage.createAccount();
    });
  });
});
