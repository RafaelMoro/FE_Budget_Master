import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { BudgetEditorPage } from './BudgetEditorPage';

/**
 * The tests that expect successful or unsuccessful views will be taken care of in E2E tests.
 */

describe('Create budget page', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  const history = createMemoryHistory();
  test('Should show the create budget page', () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <BudgetEditorPage />
      </Router>,
    );

    expect(screen.getByText('Crear presupuesto')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /nombre/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Límite del presupuesto/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Cantidad gastada hasta ahora/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /siguiente/i })).toBeInTheDocument();
  });

  test('Giver a user filling the forms, then the loading screen is shown, and the success screen is shown', async () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <BudgetEditorPage />
      </Router>,
    );

    // Fill the first form
    const nextButton = screen.getByRole('button', { name: /siguiente/i });
    const budgetNameInput = screen.getByRole('textbox', { name: /nombre/i });
    const budgetLimitInput = screen.getByRole('textbox', { name: /Límite del presupuesto/i });
    const amountSpentInput = screen.getByRole('textbox', { name: /Cantidad gastada hasta ahora/i });

    userEvent.type(budgetNameInput, 'Budget name');
    userEvent.type(budgetLimitInput, '1000');
    userEvent.type(amountSpentInput, '500');
    userEvent.click(nextButton);

    // Await on the second form to be shown.
    expect(await screen.findByRole('textbox', { name: /descripción \(opcional\)/i })).toBeInTheDocument();
    const descriptionInput = screen.getByRole('textbox', { name: /descripción \(opcional\)/i });
    const createBudgetButton = screen.getByRole('button', { name: /crear/i });
    userEvent.type(descriptionInput, 'Budget description');
    userEvent.click(createBudgetButton);

    // Show loading screen
    expect(await screen.findByText('Su presupuesto está siendo creado. Por favor espere...')).toBeInTheDocument();
  });
});
