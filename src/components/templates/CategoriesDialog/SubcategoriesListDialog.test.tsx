import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SubcategoriesListDialog } from './SubcategoriesListDialog';

describe('<SubcategoriesListDialog />', () => {
  const handleEdit = jest.fn();
  const handleDelete = jest.fn();
  const categoryName = 'First category';
  const subcategories = ['First subcategory', 'Second subcategory'];

  test('Show subcategories list', () => {
    render(
      <SubcategoriesListDialog
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        categoryName={categoryName}
        subCategories={subcategories}
        openList
      />,
    );

    expect(screen.getByRole('button', { name: /boton-editar-categoria-First category/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /boton-eliminar-categoria-First category/i })).toBeInTheDocument();
    expect(screen.getByText(/first subcategory/i)).toBeInTheDocument();
    expect(screen.getByText(/second subcategory/i)).toBeInTheDocument();
  });

  test('Given a user clicking on the edit button, the function handleEdit is called', async () => {
    render(
      <SubcategoriesListDialog
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        categoryName={categoryName}
        subCategories={subcategories}
        openList
      />,
    );

    const editCategoryButton = screen.getByRole('button', { name: /boton-editar-categoria-First category/i });
    await act(async () => userEvent.click(editCategoryButton));

    expect(handleEdit).toHaveBeenCalled();
  });

  test('Given a user clicking on the delete button, the function handleDelete is called', async () => {
    render(
      <SubcategoriesListDialog
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        categoryName={categoryName}
        subCategories={subcategories}
        openList
      />,
    );

    const deleteCategoryButton = screen.getByRole('button', { name: /boton-eliminar-categoria-First category/i });
    await act(async () => userEvent.click(deleteCategoryButton));

    expect(handleDelete).toHaveBeenCalled();
  });
});
