import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  test('Given a user leaving empty the category name, show error message', async () => {
    renderWithProviders(
      <CreateCategory
        changeSelectCategoryIconFn={changeSelectCategoryIconFn}
        goBackAction={goBackAction}
        updateError={updateError}
      />,
      { preloadedState: { user: userInitialState } },
    );

    const submitButton = screen.getByRole('button', { name: /crear/i });

    await act(async () => userEvent.click(submitButton));
    expect(await screen.findByText(/por favor, ingrese un nombre de categoría/i)).toBeInTheDocument();
  });
});
