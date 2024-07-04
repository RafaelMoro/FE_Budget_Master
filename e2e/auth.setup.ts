import { test as setup, expect } from '@playwright/test';
import { BASE_TEST_URL } from './constants';
import test_creds from '../playwright/.auth/test-user-cred.json';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto(`${BASE_TEST_URL}/login`);
  await page.waitForLoadState('domcontentloaded', { timeout: 15_000 });
  await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible();
  await page.getByLabel('Email').fill(test_creds.user);
  await page.getByLabel('Password').fill(test_creds.password);
  await page.getByTestId('login-button').click();
  await expect(page.getByRole('heading', { name: 'Account management' })).toBeVisible();
  // Wait until the page receives the cookies.
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  // await expect(page.getByRole('heading', { name: 'Account management' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
