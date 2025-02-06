import {
  screen, waitFor, act, within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'jest-fetch-mock';

import { CategoryUI } from '../../../globalInterface';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { userInitialState } from '../../UI/Account/Account.mocks';
import { EditCategory } from './CategoryTemplate';
import { successfulEditCategoriesReponse } from '../../UI/Records/Record.mocks';

const twentySubcategories = [
  'one subcategory',
  'two subcategory',
  'three',
  'four',
  'five',
  'six subcategory',
  'seven',
  'eight',
  'nine',
  'ten subcategory',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
  'twenty',
];

describe('EditCategory', () => {
  const categoryToEdit: CategoryUI = {
    category: 'Food and Drink',
    categoryId: 'category-id-1',
    subcategories: ['Restaurants', 'Groceries'],
  };
  const goBackAction = jest.fn();
  const updateError = jest.fn();
  const veryLongCategoryName = 'Very long category name with a lot of characters and description that does not really matter but I need keep it long';
  const newSubcategory = 'new subcategory 1';

  beforeEach(() => {
    fetchMock.resetMocks();
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

  test('Given a user editing a category name with less than 3 characters, show error message', async () => {
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

  test('Given a user editing a category name with more than 80 characters, show error message', async () => {
    renderWithProviders(
      <EditCategory categoryToEdit={categoryToEdit} goBackAction={goBackAction} updateError={updateError} />,
      { preloadedState: { user: userInitialState } },
    );

    const categoryNameInput = screen.getByRole('textbox', { name: /título de la categoría/i });
    const submitButton = screen.getByRole('button', { name: /editar/i });
    await act(async () => userEvent.type(categoryNameInput, '{selectall}{backspace}'));
    await act(async () => userEvent.type(categoryNameInput, veryLongCategoryName));
    await waitFor(() => {
      expect(categoryNameInput).toHaveValue(veryLongCategoryName);
    });

    await act(async () => userEvent.click(submitButton));
    expect(await screen.findByText(/por favor, ingrese una categoría con menos de 80 caracteres/i)).toBeInTheDocument();
  });

  test('Given a user deleting the last subcategory, show error message', async () => {
    const category: CategoryUI = {
      category: 'Food and Drink',
      categoryId: 'category-id-1',
      subcategories: ['Restaurants'],
    };

    renderWithProviders(
      <EditCategory categoryToEdit={category} goBackAction={goBackAction} updateError={updateError} />,
      { preloadedState: { user: userInitialState } },
    );

    const subcategory = screen.getByRole('button', { name: /restaurants/i });
    const deleteSubcategory = within(subcategory).getByTestId('CancelIcon');
    const submitButton = screen.getByRole('button', { name: /editar/i });

    await act(async () => userEvent.click(deleteSubcategory));
    await act(async () => userEvent.click(submitButton));

    expect(await screen.findByText(/por favor, agregue al menos una subcategoría/i)).toBeInTheDocument();
  });

  test('Given a user having 20 subcategories and adds 1 more, show error message', async () => {
    const category: CategoryUI = {
      category: 'Food and Drink',
      categoryId: 'category-id-1',
      subcategories: twentySubcategories,
    };

    renderWithProviders(
      <EditCategory categoryToEdit={category} goBackAction={goBackAction} updateError={updateError} />,
      { preloadedState: { user: userInitialState } },
    );

    const subcategoryInput = screen.getByRole('textbox', { name: /subcategoría$/i });
    const addSubcategoryButton = screen.getByRole('button', { name: /agregar subcategoría/i });
    screen.getByRole('textbox', { name: /subcategoría$/i });
    await act(async () => userEvent.type(subcategoryInput, newSubcategory));
    await act(async () => userEvent.click(addSubcategoryButton));
    const submitButton = screen.getByRole('button', { name: /editar/i });
    await act(async () => userEvent.click(submitButton));

    expect(await screen.findByText(/por favor, agregue menos de 20 subcategorías/i)).toBeInTheDocument();
  });

  test('Given a user editing the whole category, show tick mark in the submit button', async () => {
    fetchMock.once(JSON.stringify(successfulEditCategoriesReponse));
    renderWithProviders(
      <EditCategory categoryToEdit={categoryToEdit} goBackAction={goBackAction} updateError={updateError} />,
      { preloadedState: { user: userInitialState } },
    );

    const categoryNameInput = screen.getByRole('textbox', { name: /título de la categoría/i });
    const submitButton = screen.getByRole('button', { name: /editar/i });
    const subcategoryInput = screen.getByRole('textbox', { name: /subcategoría$/i });
    const addSubcategoryButton = screen.getByRole('button', { name: /agregar subcategoría/i });

    await act(async () => userEvent.type(categoryNameInput, ' 2'));
    await act(async () => userEvent.type(subcategoryInput, newSubcategory));
    await act(async () => userEvent.click(addSubcategoryButton));
    await act(async () => userEvent.click(submitButton));

    expect(await screen.findByTestId('DoneOutlinedIcon')).toBeInTheDocument();
  });
});
