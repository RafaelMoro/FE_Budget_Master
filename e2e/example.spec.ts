import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('domcontentloaded', { timeout: 15_000 });
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForLoadState('domcontentloaded', { timeout: 15_000 });
  await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible();


  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Budget Master/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
