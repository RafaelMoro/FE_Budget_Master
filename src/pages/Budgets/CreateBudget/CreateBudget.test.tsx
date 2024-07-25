import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { CreateBudget } from './CreateBudget';
import { successfulResponseCreateBudget } from '../../../components/UI/Budget/Budget.mocks';

describe('Create budget page', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  const history = createMemoryHistory();
  test('Should show the create budget page', () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <CreateBudget />
      </Router>,
    );

    expect(screen.getByText('Create budget:')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /budget limit/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /amount spent/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  test('Giver a user filling the forms, then the loading screen is shown, and the success screen is shown', async () => {
    // fetchMock.once(JSON.stringify(successfulResponseCreateBudget));
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <CreateBudget />
      </Router>,
    );

    // Fill the first form
    const nextButton = screen.getByRole('button', { name: /next/i });
    const budgetNameInput = screen.getByRole('textbox', { name: /name/i });
    const budgetLimitInput = screen.getByRole('textbox', { name: /budget limit/i });
    const amountSpentInput = screen.getByRole('textbox', { name: /amount spent/i });

    userEvent.type(budgetNameInput, 'Budget name');
    userEvent.type(budgetLimitInput, '1000');
    userEvent.type(amountSpentInput, '500');
    userEvent.click(nextButton);

    // Await on the second form to be shown.
    expect(await screen.findByRole('textbox', { name: /description \(optional\)/i })).toBeInTheDocument();
    const descriptionInput = screen.getByRole('textbox', { name: /description \(optional\)/i });
    const createBudgetButton = screen.getByRole('button', { name: /create budget/i });
    userEvent.type(descriptionInput, 'Budget description');
    userEvent.click(createBudgetButton);

    // Show loading screen
    expect(await screen.findByText('Your budget is being created. Please wait...')).toBeInTheDocument();
  });
});
