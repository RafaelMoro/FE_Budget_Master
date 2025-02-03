import { render, screen } from '@testing-library/react';
import { SubcategoriesListDialog } from './SubcategoriesListDialog';

describe('<SubcategoriesListDialog />', () => {
  test('Show subcategories list', () => {
    const handleEdit = jest.fn();
    const handleDelete = jest.fn();
    const categoryName = 'First category';
    const subcategories = ['First subcategory', 'Second subcategory'];
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
});
