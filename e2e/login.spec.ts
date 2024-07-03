import { test } from '@playwright/test';
import { DashboardPage } from './pages/dashboardPage';

test.skip('Login, create account and create record, then log out.', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('test_login@test-budget-master.com');
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Password').fill('testLogin1@');
  await page.getByTestId('login-button').click();
  await page.getByRole('heading', { name: 'Account management' }).click();
  await page.getByRole('button', { name: 'Create account' }).click();
  await page.getByLabel('Account Title').click();
  await page.getByLabel('Account Title').fill('New account');
  await page.getByLabel('Amount').click();
  await page.getByLabel('Amount').fill('100');
  await page.getByLabel('Debit').click();
  await page.getByRole('option', { name: 'Debit' }).click();
  await page.getByLabel('Dark Orange').click();
  await page.getByRole('option', { name: 'Green', exact: true }).click();
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByTestId('notification-container').click();
  await page.getByRole('button', { name: 'Create Record' }).click();
  await page.getByLabel('Amount').click();
  await page.getByLabel('Amount').fill('50');
  await page.locator('div').filter({ hasText: /^Short Description$/ }).click();
  await page.getByLabel('Short Description').fill('New Expense');
  await page.getByLabel('Description (Optional)').click();
  await page.getByLabel('Description (Optional)').fill('Description of my new expense');
  await page.getByTestId('select-record-category').getByLabel('').click();
  await page.getByRole('option', { name: 'Financial Expenses' }).click();
  await page.getByTestId('select-record-subcategory').getByLabel('').click();
  await page.getByRole('option', { name: 'Auto insurance / Car Loan' }).click();
  await page.getByLabel('Tag (Optional)').click();
  await page.getByLabel('Tag (Optional)').fill('New tag');
  await page.getByRole('button', { name: 'Add tag' }).click();
  await page.getByLabel('Budget (Optional)').click();
  await page.getByLabel('Budget (Optional)').fill('New budget');
  await page.getByRole('button', { name: 'Add budget' }).click();
  await page.getByRole('button', { name: 'Add Person' }).click();
  await page.getByLabel('Full Name').click();
  await page.getByLabel('Full Name').fill('John');
  await page.getByRole('textbox', { name: 'Amount', exact: true }).click();
  await page.getByRole('textbox', { name: 'Amount', exact: true }).fill('160');
  await page.getByLabel('Amount Paid').click();
  await page.getByLabel('Amount Paid').fill('0');
  await page.getByRole('button', { name: 'Add Person' }).click();
  await page.getByTestId('create-edit-record-button').click();
  await page.getByLabel('sign-out-button').click();
});

test('Login', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);

  dashboardPage.waitLoadDashboard();
});
