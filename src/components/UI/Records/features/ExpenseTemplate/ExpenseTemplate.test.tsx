import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, screen, within } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { ExpenseTemplate } from './ExpenseTemplate';
import { accountsInitialState, successfulCreateExpenseResponse, successfulResponseFetchCategories } from '../../Record.mocks';

describe('<ExpenseTemplate />', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  const history = createMemoryHistory();

  let createRecordButton: HTMLElement | null = null;
  test('Show the form to create an expense with title, description, amount, tags and button', () => {
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

  test('Given a user creating an expense in a credit account, show the transaction paid input', () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <ExpenseTemplate edit={false} typeOfRecord="expense" />
      </Router>,
      { preloadedState: { accounts: accountsInitialState } },
    );

    expect(screen.getByRole('checkbox', { name: /transaction paid/i })).toBeInTheDocument();
  });

  test('Given a user clicking on create record without filling the form, show validation error,', async () => {
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

  test('Given a user filling short description with a long text, show error validation', async () => {
    const text = 'this is a very long test on the short description where it will show validation error';
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <ExpenseTemplate edit={false} typeOfRecord="expense" />
      </Router>,
    );

    createRecordButton = screen.getByRole('button', { name: /create record/i });
    const shortDescriptionInput = screen.getByRole('textbox', { name: /short description/i });
    userEvent.type(shortDescriptionInput, text);
    userEvent.click(createRecordButton);

    expect(await screen.findByText(/short description is too long\. use description field instead\./i)).toBeInTheDocument();
  });

  test.only('Given a user creating an expense, the expense is created', async () => {
    fetchMock
      .once(JSON.stringify(successfulResponseFetchCategories))
      .once(JSON.stringify(successfulCreateExpenseResponse));

    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <ExpenseTemplate edit={false} typeOfRecord="expense" />
      </Router>,
    );

    // Wait on the load of the categories
    expect(await screen.findByText(/^category/i)).toBeInTheDocument();
    const amountInput = screen.getByRole('textbox', { name: /amount/i });
    const dateInput = screen.getByRole('textbox', { name: /date and time/i });
    const shortDescriptionInput = screen.getByRole('textbox', { name: /short description/i });
    const descriptionInput = screen.getByRole('textbox', { name: /description \(optional\)/i });
    createRecordButton = screen.getByRole('button', { name: /create record/i });

    userEvent.type(amountInput, '100');
    expect(amountInput).toHaveValue('100');
    userEvent.type(dateInput, '2024-07-20T12:08:00.000Z');
    userEvent.type(shortDescriptionInput, 'Cash');
    userEvent.type(descriptionInput, 'Cash');
    // screen.debug(undefined, 10000000);

    // Select category
    const selectCategoryTestId = screen.getByTestId('select-record-category');
    const selectCategoryButton = within(selectCategoryTestId).getByRole('combobox');
    fireEvent.mouseDown(selectCategoryButton);
    const listboxCategory = within(screen.getByRole('presentation')).getByRole(
      'listbox',
    );
    const optionsCategory = within(listboxCategory).getAllByRole('option');
    fireEvent.click(optionsCategory[0]);
    expect(await screen.findByText(/food and drink/i)).toBeInTheDocument();

    // userEvent.click(createRecordButton);

    // await waitFor(() => {
    //   expect(fetchMock).toHaveBeenCalledTimes(3);
    // });
  });
});
