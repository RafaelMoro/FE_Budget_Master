import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CategoriesListDialog } from './CategoriesListDialog';

describe('<CategoriesListDialog />', () => {
  const subcategories = ['First subcategory', 'Second subcategory'];
  const updateAction = jest.fn();
  const category = 'First category';
  test('Show categories list', () => {
    render(<CategoriesListDialog updateAction={updateAction} categoryId="category-id-1" subCategories={subcategories} categoryName={category} />);

    expect(screen.getByText(/first category/i)).toBeInTheDocument();
    expect(screen.queryByText(/first subcategory/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/second subcategory/i)).not.toBeInTheDocument();
  });

  test('Click on category, then show subcategories list', async () => {
    render(<CategoriesListDialog updateAction={updateAction} categoryId="category-id-1" subCategories={subcategories} categoryName={category} />);

    const categoryButton = screen.getByRole('button', { name: /first category/i });
    await act(async () => userEvent.click(categoryButton));

    expect(await screen.findByText(/first subcategory/i)).toBeInTheDocument();
    expect(screen.getByText(/second subcategory/i)).toBeInTheDocument();
  });
});
