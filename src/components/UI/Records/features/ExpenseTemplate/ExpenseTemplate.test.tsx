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

    expect(screen.getByRole('textbox', { name: /Cantidad disponible/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /fecha y hora/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /pequeña descripción/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /descripción \(opcional\)/i })).toBeInTheDocument();
    expect(categoryCombobox).toBeInTheDocument();
    expect(subCategoryCombobox).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /etiqueta \(opcional\)/i })).toBeInTheDocument();
    expect(budgetCombobox).toBeInTheDocument();
    expect(screen.getByText(/Nota:/i)).toBeInTheDocument();
    expect(screen.getByText(/personas relacionadas a esta transacción: 0/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar persona/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear gasto/i })).toBeInTheDocument();
  });

  test('Given an credit account, show the transaction paid input', () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <ExpenseTemplate edit={false} typeOfRecord="expense" />
      </Router>,
      { preloadedState: { accounts: accountsInitialState } },
    );

    expect(screen.getByRole('checkbox', { name: /transacción pagada/i })).toBeInTheDocument();
  });

  test('Given a user clickin on create record, show validation error,', async () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <ExpenseTemplate edit={false} typeOfRecord="expense" />
      </Router>,
    );
    createRecordButton = screen.getByRole('button', { name: /crear gasto/i });
    userEvent.click(createRecordButton);

    expect(await screen.findByText(/Por favor, ingrese una cantidad/i)).toBeInTheDocument();
    expect(screen.getByText(/Por favor, ingrese una pequeña descripción/i)).toBeInTheDocument();
    expect(screen.getByText(/Por favor, selecciona una categoría/i)).toBeInTheDocument();
    expect(screen.getByText(/Por favor, seleccione una subcategoría/i)).toBeInTheDocument();
  });

  test('Given a user filling short description with 2 characters, then show validation error', async () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <ExpenseTemplate edit={false} typeOfRecord="expense" />
      </Router>,
    );
    createRecordButton = screen.getByRole('button', { name: /crear gasto/i });
    const shortDescriptionInput = screen.getByRole('textbox', { name: /pequeña descripción/i });
    userEvent.type(shortDescriptionInput, 'ab');
    userEvent.click(createRecordButton);

    expect(await screen.findByText(/La pequeña descripción debe contener más de 3 caracteres/i)).toBeInTheDocument();
  });

  test('Given a user filling short description with a long text, show error validation', async () => {
    const text = 'this is a very long test on the short description where it will show validation error';
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <ExpenseTemplate edit={false} typeOfRecord="expense" />
      </Router>,
    );

    createRecordButton = screen.getByRole('button', { name: /crear gasto/i });
    const shortDescriptionInput = screen.getByRole('textbox', { name: /pequeña descripción/i });
    userEvent.type(shortDescriptionInput, text);
    userEvent.click(createRecordButton);

    expect(await screen.findByText(/La pequeña descripción debe contener menos de 50 caracteres\./i)).toBeInTheDocument();
  });
});
