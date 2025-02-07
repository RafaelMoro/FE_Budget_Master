import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { userInitialState } from '../../UI/Account/Account.mocks';
import { CreateCategory } from './CategoryTemplate';

describe('CreateCategory', () => {
  const goBackAction = jest.fn();
  const updateError = jest.fn();
  const changeSelectCategoryIconFn = jest.fn();

  test('Show category and subcategory input, add subcategory, cancel, edit button and subcategories list', () => {
    renderWithProviders(
      <CreateCategory
        changeSelectCategoryIconFn={changeSelectCategoryIconFn}
        goBackAction={goBackAction}
        updateError={updateError}
      />,
      { preloadedState: { user: userInitialState } },
    );

    expect(screen.getByRole('textbox', { name: /título de la categoría/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /subcategoría$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar subcategoría/i })).toBeInTheDocument();
    expect(screen.getByText(/subcategorías:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear/i })).toBeInTheDocument();
  });
});
