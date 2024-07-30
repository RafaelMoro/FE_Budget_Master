import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { ExpenseTemplate } from './ExpenseTemplate';
import { accountsInitialState } from '../../Record.mocks';

describe('<ExpenseTemplate />', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  const history = createMemoryHistory();

  let createRecordButton: HTMLElement | null = null;
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

  test('Given an credit account, show the transaction paid input', () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <ExpenseTemplate edit={false} typeOfRecord="expense" />
      </Router>,
      { preloadedState: { accounts: accountsInitialState } },
    );

    expect(screen.getByRole('checkbox', { name: /transaction paid/i })).toBeInTheDocument();
  });

  test('Given a user clickin on create record, show validation error,', async () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <ExpenseTemplate edit={false} typeOfRecord="expense" />
      </Router>,
    );
    createRecordButton = screen.getByRole('button', { name: /create record/i });
    userEvent.click(createRecordButton);

    expect(await screen.findByText(/amount is required/i)).toBeInTheDocument();
    expect(screen.getByText(/short description is required/i)).toBeInTheDocument();
    expect(screen.getByText(/^category is required/i)).toBeInTheDocument();
    expect(screen.getByText(/subcategory is required/i)).toBeInTheDocument();
  });

  test('Given a user filling short description with 2 characters, then show validation error', async () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <ExpenseTemplate edit={false} typeOfRecord="expense" />
      </Router>,
    );
    createRecordButton = screen.getByRole('button', { name: /create record/i });
    const shortDescriptionInput = screen.getByRole('textbox', { name: /short description/i });
    userEvent.type(shortDescriptionInput, 'ab');
    userEvent.click(createRecordButton);

    expect(await screen.findByText(/short description is too short/i)).toBeInTheDocument();
  });
});
