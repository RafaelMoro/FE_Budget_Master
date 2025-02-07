import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'jest-fetch-mock';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { CategoriesDialog } from './CategoriesDialog';
import { userInitialState } from '../../UI/Account/Account.mocks';
import { ERROR_MESSAGE_EDIT_CATEGORY, ERROR_MESSAGE_FETCH_CATEGORY, ERROR_MESSAGE_GENERAL } from '../../../constants';
import { failedCreateEditCategoriesReponse, failedResponseFetchCategories, successfulResponseFetchCategories } from '../../UI/Records/Record.mocks';

describe('<CategoriesDialog />', () => {
  const onClose = jest.fn();

  const newSubcategory = 'new subcategory 1';

  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  test('Show title and description', () => {
    renderWithProviders(
      <CategoriesDialog onClose={onClose} open />,
      { preloadedState: { user: userInitialState } },
    );

    expect(screen.getByRole('heading', { name: /categorías/i })).toBeInTheDocument();
    // eslint-disable-next-line max-len
    const description = 'Haga click en cualquier categoría para ver sus subcategorías. Dentro encontrará los botones para editar o eliminar esa categoría.';
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  test('Given a user creating a category, show the appropiate title and description', async () => {
    renderWithProviders(
      <CategoriesDialog onClose={onClose} open />,
      { preloadedState: { user: userInitialState } },
    );

    const createCategoryButton = screen.getByRole('button', { name: /crear categoría/i });
    await act(async () => userEvent.click(createCategoryButton));

    expect(await screen.findByRole('heading', { name: /crear categoría/i })).toBeInTheDocument();
    expect(
      screen.getByText(/puede crear una nueva categoría, ingresando su nombre y seleccionando las subcategorías que desea agregar\./i),
    ).toBeInTheDocument();
  });

  test('Given a user editing a category, show the appropiate title and description', async () => {
    fetchMock.once(JSON.stringify(successfulResponseFetchCategories));
    renderWithProviders(
      <CategoriesDialog onClose={onClose} open />,
      { preloadedState: { user: userInitialState } },
    );

    expect(await screen.findByRole('button', { name: /Food and Drink/i })).toBeInTheDocument();
    const categoryButton = screen.getByRole('button', { name: /Food and Drink/i });
    await act(async () => userEvent.click(categoryButton));

    expect(await screen.findByRole('button', { name: /boton-editar-categoria-food and drink/i }));
    const editCategoryButton = screen.getByRole('button', { name: /boton-editar-categoria-food and drink/i });
    await act(async () => userEvent.click(editCategoryButton));

    expect(await screen.findByRole('heading', { name: /editar categoría/i })).toBeInTheDocument();
    const description = screen.getByText(
      // eslint-disable-next-line max-len
      /puede cambiar el nombre de la categoría, agregar subcategoría, o bien, eliminar una subcategoría dando click en el botón en forma de x que está junto a la subcategoría/i,
    );
    expect(description).toBeInTheDocument();
  });

  test('Given a user editing a category and fails the edition, show the appropiate error message', async () => {
    fetchMock.once(JSON.stringify(successfulResponseFetchCategories));
    fetchMock.mockRejectedValueOnce(JSON.stringify(failedCreateEditCategoriesReponse));
    renderWithProviders(
      <CategoriesDialog onClose={onClose} open />,
      { preloadedState: { user: userInitialState } },
    );

    expect(await screen.findByRole('button', { name: /Food and Drink/i })).toBeInTheDocument();
    const categoryButton = screen.getByRole('button', { name: /Food and Drink/i });
    await act(async () => userEvent.click(categoryButton));

    expect(await screen.findByRole('button', { name: /boton-editar-categoria-food and drink/i }));
    const editCategoryButton = screen.getByRole('button', { name: /boton-editar-categoria-food and drink/i });
    await act(async () => userEvent.click(editCategoryButton));

    expect(await screen.findByRole('heading', { name: /editar categoría/i })).toBeInTheDocument();

    const categoryNameInput = screen.getByRole('textbox', { name: /título de la categoría/i });
    const submitButton = screen.getByRole('button', { name: /editar/i });
    const subcategoryInput = screen.getByRole('textbox', { name: /subcategoría$/i });
    const addSubcategoryButton = screen.getByRole('button', { name: /agregar subcategoría/i });

    await act(async () => userEvent.type(categoryNameInput, ' 2'));
    await act(async () => userEvent.type(subcategoryInput, newSubcategory));
    await act(async () => userEvent.click(addSubcategoryButton));
    await act(async () => userEvent.click(submitButton));

    expect(await screen.findByRole('heading', { name: /categorías/i })).toBeInTheDocument();
    expect(screen.getByText(ERROR_MESSAGE_EDIT_CATEGORY)).toBeInTheDocument();
    expect(screen.getByText(ERROR_MESSAGE_GENERAL)).toBeInTheDocument();
  });

  test('Given a user deleting a category, show the appropiate title and description', async () => {
    fetchMock.once(JSON.stringify(successfulResponseFetchCategories));
    renderWithProviders(
      <CategoriesDialog onClose={onClose} open />,
      { preloadedState: { user: userInitialState } },
    );

    expect(await screen.findByRole('button', { name: /Food and Drink/i })).toBeInTheDocument();
    const categoryButton = screen.getByRole('button', { name: /Food and Drink/i });
    await act(async () => userEvent.click(categoryButton));

    expect(await screen.findByRole('button', { name: /boton-eliminar-categoria-food and drink/i }));
    const deleteCategoryButton = screen.getByRole('button', { name: /boton-eliminar-categoria-food and drink/i });
    await act(async () => userEvent.click(deleteCategoryButton));

    expect(await screen.findByRole('heading', { name: /eliminar categoría/i })).toBeInTheDocument();
    const description = screen.getByText(
      /si elimina esta categoría y tiene transacciones relacionadas a la categoría, estas aparecerán como categoría no encontrada\./i,
    );
    expect(description).toBeInTheDocument();
  });

  test('Given an error while fetching categories, show error message', async () => {
    fetchMock.mockRejectedValueOnce(JSON.stringify(failedResponseFetchCategories));
    renderWithProviders(
      <CategoriesDialog onClose={onClose} open />,
      { preloadedState: { user: userInitialState } },
    );

    expect(await screen.findByText(ERROR_MESSAGE_FETCH_CATEGORY)).toBeInTheDocument();
    expect(screen.getByText(ERROR_MESSAGE_GENERAL)).toBeInTheDocument();
  });
});
