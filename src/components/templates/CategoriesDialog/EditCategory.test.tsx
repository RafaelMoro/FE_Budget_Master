import { screen } from '@testing-library/react';
import { CategoryUI } from '../../../globalInterface';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { userInitialState } from '../../UI/Account/Account.mocks';
import { EditCategory } from './EditCategory';

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
});
