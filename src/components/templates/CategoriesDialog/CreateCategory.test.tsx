import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { userInitialState } from '../../UI/Account/Account.mocks';
import { CreateCategory } from './CategoryTemplate';

describe('CreateCategory', () => {
  const goBackAction = jest.fn();
  const updateError = jest.fn();
  const changeSelectCategoryIconFn = jest.fn();
  const categoryName = 'Food and Drink';
  const veryLongCategoryName = 'Very long category name with a lot of characters and description that does not really matter but I need keep it long';

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

  test('Given a user creating a category name with less than 3 characters, show error message', async () => {
    renderWithProviders(
      <CreateCategory
        changeSelectCategoryIconFn={changeSelectCategoryIconFn}
        goBackAction={goBackAction}
        updateError={updateError}
      />,
      { preloadedState: { user: userInitialState } },
    );

    const categoryNameInput = screen.getByRole('textbox', { name: /título de la categoría/i });
    const submitButton = screen.getByRole('button', { name: /crear/i });
    await act(async () => userEvent.type(categoryNameInput, 'a'));
    await waitFor(() => {
      expect(categoryNameInput).toHaveValue('a');
    });

    await act(async () => userEvent.click(submitButton));
    expect(await screen.findByText(/por favor, ingrese una categoría de más de 3 caracteres/i)).toBeInTheDocument();
  });

  test('Given a user editing a category name with more than 80 characters, show error message', async () => {
    renderWithProviders(
      <CreateCategory
        changeSelectCategoryIconFn={changeSelectCategoryIconFn}
        goBackAction={goBackAction}
        updateError={updateError}
      />,
      { preloadedState: { user: userInitialState } },
    );

    const categoryNameInput = screen.getByRole('textbox', { name: /título de la categoría/i });
    const submitButton = screen.getByRole('button', { name: /crear/i });
    await act(async () => userEvent.type(categoryNameInput, veryLongCategoryName));
    await waitFor(() => {
      expect(categoryNameInput).toHaveValue(veryLongCategoryName);
    });

    await act(async () => userEvent.click(submitButton));
    expect(await screen.findByText(/por favor, ingrese una categoría con menos de 80 caracteres/i)).toBeInTheDocument();
  });

  test('Given a user creating a category with no subcategories, show error message', async () => {
    renderWithProviders(
      <CreateCategory
        changeSelectCategoryIconFn={changeSelectCategoryIconFn}
        goBackAction={goBackAction}
        updateError={updateError}
      />,
      { preloadedState: { user: userInitialState } },
    );

    const submitButton = screen.getByRole('button', { name: /crear/i });
    const categoryNameInput = screen.getByRole('textbox', { name: /título de la categoría/i });
    await act(async () => userEvent.type(categoryNameInput, categoryName));
    await waitFor(() => {
      expect(categoryNameInput).toHaveValue(categoryName);
    });
    await act(async () => userEvent.click(submitButton));

    expect(await screen.findByText(/por favor, agregue al menos una subcategoría/i)).toBeInTheDocument();
  });
});
