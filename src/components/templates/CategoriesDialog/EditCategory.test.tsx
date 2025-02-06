import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CategoryUI } from '../../../globalInterface';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { userInitialState } from '../../UI/Account/Account.mocks';
import { EditCategory } from './CategoryTemplate';

describe('EditCategory', () => {
  const categoryToEdit: CategoryUI = {
    category: 'Food and Drink',
    categoryId: 'category-id-1',
    subcategories: ['Restaurants', 'Groceries'],
  };
  const goBackAction = jest.fn();
  const updateError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('Show category and subcategory input, add subcategory, cancel, edit button and subcategories list', () => {
    renderWithProviders(
      <EditCategory categoryToEdit={categoryToEdit} goBackAction={goBackAction} updateError={updateError} />,
      { preloadedState: { user: userInitialState } },
    );

    expect(screen.getByRole('textbox', { name: /título de la categoría/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /subcategoría$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar subcategoría/i })).toBeInTheDocument();
    expect(screen.getByText(/subcategorías:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /restaurants/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /groceries/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument();
  });

  test('Given a user leaving empty the category name, show error message', async () => {
    renderWithProviders(
      <EditCategory categoryToEdit={categoryToEdit} goBackAction={goBackAction} updateError={updateError} />,
      { preloadedState: { user: userInitialState } },
    );

    const categoryNameInput = screen.getByRole('textbox', { name: /título de la categoría/i });
    const submitButton = screen.getByRole('button', { name: /editar/i });
    await act(async () => userEvent.type(categoryNameInput, '{selectall}{backspace}'));
    await waitFor(() => {
      expect(categoryNameInput).toHaveValue('');
    });

    await act(async () => userEvent.click(submitButton));
    expect(await screen.findByText(/por favor, ingrese un nombre de categoría/i)).toBeInTheDocument();
  });

  test('Given a user giving a category name with less than 3 characters, show error message', async () => {
    renderWithProviders(
      <EditCategory categoryToEdit={categoryToEdit} goBackAction={goBackAction} updateError={updateError} />,
      { preloadedState: { user: userInitialState } },
    );

    const categoryNameInput = screen.getByRole('textbox', { name: /título de la categoría/i });
    const submitButton = screen.getByRole('button', { name: /editar/i });
    await act(async () => userEvent.type(categoryNameInput, '{selectall}{backspace}'));
    await act(async () => userEvent.type(categoryNameInput, 'a'));
    await waitFor(() => {
      expect(categoryNameInput).toHaveValue('a');
    });

    await act(async () => userEvent.click(submitButton));
    expect(await screen.findByText(/por favor, ingrese una categoría de más de 3 caracteres/i)).toBeInTheDocument();
  });
});
