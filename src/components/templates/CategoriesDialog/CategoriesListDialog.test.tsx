import { render, screen } from '@testing-library/react';
import { CategoriesListDialog } from './CategoriesListDialog';

describe('<CategoriesListDialog />', () => {
  const subcategories = ['First subcategory', 'Second subcategory'];
  const category = 'First category';
  test('Show categories list', () => {
    render(<CategoriesListDialog subCategories={subcategories} categoryName={category} />);

    screen.getByText(/first category/i);
    expect(screen.queryByText(/first subcategory/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/second subcategory/i)).not.toBeInTheDocument();
  });
});
