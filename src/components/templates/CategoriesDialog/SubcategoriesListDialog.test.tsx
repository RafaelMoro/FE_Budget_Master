import { render, screen } from '@testing-library/react';
import { SubcategoriesListDialog } from './SubcategoriesListDialog';

describe('<SubcategoriesListDialog />', () => {
  test('Show subcategories list', () => {
    const categoryName = 'First category';
    const subcategories = ['First subcategory', 'Second subcategory'];
    render(<SubcategoriesListDialog categoryName={categoryName} subCategories={subcategories} openList />);

    expect(screen.getByText(/first subcategory/i)).toBeInTheDocument();
    expect(screen.getByText(/second subcategory/i)).toBeInTheDocument();
  });
});
