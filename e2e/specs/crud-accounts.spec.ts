import { test } from '@playwright/test';
import { DashboardPage } from '../pages/dashboardPage';
import { LandingPage } from '../pages/landingPage';

test.describe('CRUD Accounts', () => {
  test("GIVEN: I'm a logged in user, I navigate into my dashboard", async ({ page }) => {
    const rightNow = new Date();
    const hours = rightNow.getHours();
    const minutes = rightNow.getMinutes();
    const seconds = rightNow.getSeconds();
    const accountTitle = `Account ${hours}:${minutes}:${seconds}`;

    await test.step("GIVEN: I'm a logged in user, I navigate into my dashboard", async () => {
      const landingPage = new LandingPage(page);
      await landingPage.navigateToDashboard();
    });

    await test.step('THEN: I create an account', async () => {
      const dashboardPage = new DashboardPage(page);

      await dashboardPage.createAccount({ accountTitle });
    });

    await test.step('THEN: I edit an account', async () => {
      const dashboardPage = new DashboardPage(page);

      await dashboardPage.modifyAccount({ accountTitle });
    });

    await test.step('THEN: I delete an account', async () => {
      const dashboardPage = new DashboardPage(page);

      await dashboardPage.deleteAccount({ accountTitle });
    });
  });
});
