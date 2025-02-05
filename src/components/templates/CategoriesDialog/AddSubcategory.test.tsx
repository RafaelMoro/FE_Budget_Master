import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddSubcategory } from './AddSubcategory';

describe('AddSubcategory', () => {
  test('Show add subcategory form', () => {
    const addSubcategory = jest.fn();
    render(<AddSubcategory addSubcategory={addSubcategory} />);

    expect(screen.getByRole('textbox', { name: /agregar subcategoría/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar subcategoría/i })).toBeInTheDocument();
  });

  test('Given a user adding a subcategory, the function addSubcategory is called', async () => {
    const addSubcategory = jest.fn();
    const newSubcategory = 'new subcategory';
    render(<AddSubcategory addSubcategory={addSubcategory} />);

    const addSubcategoryInput = screen.getByRole('textbox', { name: /agregar subcategoría/i });
    const addSubcategoryButton = screen.getByRole('button', { name: /agregar subcategoría/i });

    await act(async () => userEvent.type(addSubcategoryInput, newSubcategory));
    await act(async () => userEvent.click(addSubcategoryButton));

    expect(addSubcategory).toHaveBeenCalledWith(newSubcategory);
  });
});
