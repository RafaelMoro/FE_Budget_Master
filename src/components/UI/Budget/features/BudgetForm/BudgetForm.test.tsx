import { screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

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
});
