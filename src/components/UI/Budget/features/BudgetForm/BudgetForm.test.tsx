import { screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { BudgetForm } from './BudgetForm';
import { formatDateToDDMMYYYY } from '../../../../../utils';
import { MONTHS } from '../../../../../globalInterface';

describe('Budget form', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  const history = createMemoryHistory();
  test('Show the budget form with name, budget limit, amount spent, type of budget inputs with cancel and next button', () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <BudgetForm />
      </Router>,
    );

    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /budget limit/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /amount spent/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  test('Given a user clicking on next without entering any data, should show error validations', async () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <BudgetForm />
      </Router>,
    );
    const nextButton = screen.getByRole('button', { name: /next/i });
    userEvent.click(nextButton);

    expect(await screen.findByText(/budget name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/budget limit is required/i)).toBeInTheDocument();
    expect(screen.getByText(/amount spent is required/i)).toBeInTheDocument();
  });

  test('Given a user entering a 2 character budget name, should show error validation', async () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <BudgetForm />
      </Router>,
    );
    const nextButton = screen.getByRole('button', { name: /next/i });
    const budgetNameInput = screen.getByRole('textbox', { name: /name/i });

    userEvent.type(budgetNameInput, 'Li');
    userEvent.click(nextButton);

    expect(await screen.findByText(/budget name must be at least 3 characters/i)).toBeInTheDocument();
  });

  test('Given a user entering a 21 character budget name, should show error validation', async () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <BudgetForm />
      </Router>,
    );
    const nextButton = screen.getByRole('button', { name: /next/i });
    const budgetNameInput = screen.getByRole('textbox', { name: /name/i });

    userEvent.type(budgetNameInput, 'An extremely very long budget name');
    userEvent.click(nextButton);

    expect(await screen.findByText(/budget name must be at most 20 characters/i)).toBeInTheDocument();
  });

  test('Given a user entering the first form correctly, then clicking next, should show the second form', async () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <BudgetForm />
      </Router>,
    );
    const nextButton = screen.getByRole('button', { name: /next/i });
    const budgetNameInput = screen.getByRole('textbox', { name: /name/i });
    const budgetLimitInput = screen.getByRole('textbox', { name: /budget limit/i });
    const amountSpentInput = screen.getByRole('textbox', { name: /amount spent/i });

    userEvent.type(budgetNameInput, 'Budget name');
    userEvent.type(budgetLimitInput, '1000');
    userEvent.type(amountSpentInput, '500');
    userEvent.click(nextButton);

    expect(await screen.findByRole('textbox', { name: /description \(optional\)/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /start date/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /end date/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /return/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create budget/i })).toBeInTheDocument();
  });

  // eslint-disable-next-line max-len
  test.skip('Given a user filling the first form correctly and clicking next, then he fill the end date with a past date, should show error validation', async () => {
    const currentDate = new Date();

    const twoDaysBefore = new Date(currentDate);
    twoDaysBefore.setDate(currentDate.getDate() - 2);
    const twoDaysBeforeMonthNumber = twoDaysBefore.getMonth();
    const twoDaysBeforeMonth = MONTHS[twoDaysBeforeMonthNumber];
    const twoDaysBeforeYear = twoDaysBefore.getFullYear().toString();
    const twoDaysDateFormatted = formatDateToDDMMYYYY(twoDaysBefore);
    const twoDaysBeforeDayNumber = twoDaysBefore.getDate().toString();

    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <BudgetForm />
      </Router>,
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    const budgetNameInput = screen.getByRole('textbox', { name: /name/i });
    const budgetLimitInput = screen.getByRole('textbox', { name: /budget limit/i });
    const amountSpentInput = screen.getByRole('textbox', { name: /amount spent/i });

    userEvent.type(budgetNameInput, 'Budget name');
    userEvent.type(budgetLimitInput, '1000');
    userEvent.type(amountSpentInput, '500');
    userEvent.click(nextButton);

    // Await on the second form to be shown.
    expect(await screen.findByRole('textbox', { name: /description \(optional\)/i })).toBeInTheDocument();
    const changeDateButtons = screen.getAllByRole('button', { name: /choose date/i });
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const [changeStartDateButton, changeEndDateButton] = changeDateButtons;

    userEvent.click(changeEndDateButton);
    // Await on the calendar to be opened.
    expect(await screen.findByRole('columnheader', { name: /friday/i })).toBeInTheDocument();

    const twoDaysBeforeDayButton = screen.getByRole('gridcell', { name: twoDaysBeforeDayNumber });
    // We can have the edge case where the current date is the first day of the month and two days before corresponds to the previous month.
    const twoDaysBeforeMonthText = screen.queryByText(`${twoDaysBeforeMonth} ${twoDaysBeforeYear}`);
    if (!twoDaysBeforeMonthText) {
      // Assigning value directly as clicking on the last month button does not work completelty well.
      const endDateInput = screen.getByRole('textbox', { name: /end date/i });
      userEvent.type(endDateInput, twoDaysDateFormatted);
    } else {
      userEvent.click(twoDaysBeforeDayButton);
    }

    await waitFor(() => {
      // expect the value to be changed with two days before
      expect(screen.getByRole('textbox', { name: /end date/i })).toHaveValue(twoDaysDateFormatted);
    });
    screen.debug(undefined, 1000000);
    const createBudgetButton = screen.getByRole('button', { name: /create budget/i });
    userEvent.click(createBudgetButton);

    expect(await screen.findByText(/the end date cannot be before today/i)).toBeInTheDocument();
  });
});
