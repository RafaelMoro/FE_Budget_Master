import { screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { BudgetForm } from './BudgetForm';

describe('Budget form', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  const history = createMemoryHistory();
  test('Show the budget form with name, budget limit, amount spent, type of budget inputs with cancel and next button', () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <BudgetForm />
      </Router>,
    );

    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /budget limit/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /amount spent/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  test('Given a user clicking on next without entering any data, should show error validations', async () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <BudgetForm />
      </Router>,
    );
    const nextButton = screen.getByRole('button', { name: /next/i });
    userEvent.click(nextButton);

    expect(await screen.findByText(/budget name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/budget limit is required/i)).toBeInTheDocument();
    expect(screen.getByText(/amount spent is required/i)).toBeInTheDocument();
  });

  test('Given a user entering a 2 character budget name, should show error validation', async () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <BudgetForm />
      </Router>,
    );
    const nextButton = screen.getByRole('button', { name: /next/i });
    const budgetNameInput = screen.getByRole('textbox', { name: /name/i });

    userEvent.type(budgetNameInput, 'Li');
    userEvent.click(nextButton);

    expect(await screen.findByText(/budget name must be at least 3 characters/i)).toBeInTheDocument();
  });

  test('Given a user entering a 21 character budget name, should show error validation', async () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <BudgetForm />
      </Router>,
    );
    const nextButton = screen.getByRole('button', { name: /next/i });
    const budgetNameInput = screen.getByRole('textbox', { name: /name/i });

    userEvent.type(budgetNameInput, 'An extremely very long budget name');
    userEvent.click(nextButton);

    expect(await screen.findByText(/budget name must be at most 20 characters/i)).toBeInTheDocument();
  });
});
