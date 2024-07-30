import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { ExpenseTemplate } from './ExpenseTemplate';

describe('<ExpenseTemplate />', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  const history = createMemoryHistory();
  test('Show Expense Template with title, description, amount, tags and button', () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <ExpenseTemplate edit={false} typeOfRecord="expense" />
      </Router>,
    );
    const categoryCombobox = screen.getByTestId('select-record-category');
    const subCategoryCombobox = screen.getByTestId('select-record-subcategory');
    const budgetCombobox = screen.getByTestId('select-record-budget');

    expect(screen.getByRole('textbox', { name: /amount/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /date and time/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /short description/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /description \(optional\)/i })).toBeInTheDocument();
    expect(categoryCombobox).toBeInTheDocument();
    expect(subCategoryCombobox).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /tag \(optional\)/i })).toBeInTheDocument();
    expect(budgetCombobox).toBeInTheDocument();
    expect(screen.getByText(/Note:/i)).toBeInTheDocument();
    expect(screen.getByText(/people related to this transaction: 0/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add person/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create record/i })).toBeInTheDocument();
  });
});
