import { render, screen } from '@testing-library/react';
import { AddSubcategory } from './AddSubcategory';

describe('AddSubcategory', () => {
  test('Show add subcategory form', () => {
    const addSubcategory = jest.fn();
    render(<AddSubcategory addSubcategory={addSubcategory} />);

    expect(screen.getByRole('textbox', { name: /agregar subcategoría/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar subcategoría/i })).toBeInTheDocument();
  });
});
