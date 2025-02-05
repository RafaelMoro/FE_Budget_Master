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

  test("Given a user clicking in 'agregar subcategoria' with no subcategory in the input, the error message is shown", async () => {
    const addSubcategory = jest.fn();
    render(<AddSubcategory addSubcategory={addSubcategory} />);

    const addSubcategoryButton = screen.getByRole('button', { name: /agregar subcategoría/i });
    await act(async () => userEvent.click(addSubcategoryButton));

    expect(await screen.findByText(/por favor, ingrese una subcategoría/i)).toBeInTheDocument();
  });

  test('Given a user adding a subcategory with less than 3 characters, the error message is shown', async () => {
    const addSubcategory = jest.fn();
    const newSubcategory = 'n';
    render(<AddSubcategory addSubcategory={addSubcategory} />);

    const addSubcategoryInput = screen.getByRole('textbox', { name: /agregar subcategoría/i });
    const addSubcategoryButton = screen.getByRole('button', { name: /agregar subcategoría/i });

    await act(async () => userEvent.type(addSubcategoryInput, newSubcategory));
    await act(async () => userEvent.click(addSubcategoryButton));

    expect(await screen.findByText(/por favor, ingrese una subcategoría de más de 3 caracteres/i)).toBeInTheDocument();
  });

  test('Given a user adding a subcategory with more than 30 characters, the error message is shown', async () => {
    const addSubcategory = jest.fn();
    const newSubcategory = 'a subcategory with more than 30 characters';
    render(<AddSubcategory addSubcategory={addSubcategory} />);

    const addSubcategoryInput = screen.getByRole('textbox', { name: /agregar subcategoría/i });
    const addSubcategoryButton = screen.getByRole('button', { name: /agregar subcategoría/i });

    await act(async () => userEvent.type(addSubcategoryInput, newSubcategory));
    await act(async () => userEvent.click(addSubcategoryButton));

    expect(await screen.findByText(/por favor, ingrese una subcategoría con menos de 30 caracteres/i)).toBeInTheDocument();
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
