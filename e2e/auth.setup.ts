import { test as setup, expect } from '@playwright/test';
import { BASE_TEST_URL } from './constants';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto(`${BASE_TEST_URL}/login`);
  await page.getByLabel('Email').fill('username');
  await page.getByLabel('Password').fill('password');
  await page.getByTestId('login-button').click();
  await page.getByTestId('DoneOutlinedIcon').isVisible();
  // Wait until the page receives the cookies.
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  // await expect(page.getByRole('heading', { name: 'Account management' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
