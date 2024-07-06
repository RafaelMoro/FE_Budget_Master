import {
  fireEvent, screen, within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import fetchMock from 'jest-fetch-mock';

import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import {
  failedOlderRecordsResponse, olderRecordsResponse, olderRecordsResponseEmptyRecords, userInitialState,
} from '../../Record.mocks';
import { OlderRecords } from './OlderRecords';
import { getCurrentDate, getFutureDate, getLastMonthDate } from '../../../../../utils';

describe('Older Records', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  const history = createMemoryHistory();
  test('Show older records collapsed', () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <OlderRecords color="blue" accountId="some-account-id" isGuestUser={false} />
      </Router>,
      { preloadedState: { user: userInitialState } },
    );

    const buttonExpandAccordion = screen.getByRole('button', {
      name: /older records/i,
    });
    const icon = within(buttonExpandAccordion).getByTestId('ExpandMoreIcon');

    expect(screen.getByText('Older Records')).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  test('Show older records expanded with loading state', async () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <OlderRecords color="blue" accountId="some-account-id" isGuestUser={false} />
      </Router>,
      { preloadedState: { user: userInitialState } },
    );

    const accordion = screen.getByRole('button', {
      name: /older records/i,
    });

    userEvent.click(accordion);

    const totalExpenseText = await screen.findByText(/total expense:/i);
    const totalIncomeText = screen.getByText(/total income:/i);
    const selectMonthTestId = screen.getByTestId('select-month');
    const selectMonthComboBox = within(selectMonthTestId).getByRole('combobox');
    const selectYearTestId = screen.getByTestId('select-month');
    const selectYearComboBox = within(selectYearTestId).getByRole('combobox');
    const searchExpensesButton = screen.getByRole('button', { name: /search expenses/i });
    const loadingSkeletons = screen.getAllByTestId('record-loading-skeleton');

    expect(totalExpenseText).toBeInTheDocument();
    expect(totalIncomeText).toBeInTheDocument();
    expect(selectMonthComboBox).toBeInTheDocument();
    expect(selectYearComboBox).toBeInTheDocument();
    expect(searchExpensesButton).toBeInTheDocument();
    expect(loadingSkeletons).toHaveLength(3);
  });

  test('Show older records expanded with empty records', async () => {
    fetchMock.once(JSON.stringify(olderRecordsResponseEmptyRecords));
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <OlderRecords color="blue" accountId="some-account-id" isGuestUser={false} />
      </Router>,
      { preloadedState: { user: userInitialState } },
    );

    const accordion = screen.getByRole('button', {
      name: /older records/i,
    });

    userEvent.click(accordion);

    const noRecordsFoundText = await screen.findByText(/you have not created records for this month\./i);
    const createRecordButton = screen.getByRole('button', { name: /create record/i });

    expect(noRecordsFoundText).toBeInTheDocument();
    expect(createRecordButton).toBeInTheDocument();
  });

  test('Show older records expanded with records', async () => {
    fetchMock.once(JSON.stringify(olderRecordsResponse));
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <OlderRecords color="blue" accountId="some-account-id" isGuestUser={false} />
      </Router>,
      { preloadedState: { user: userInitialState } },
    );

    const accordion = screen.getByRole('button', {
      name: /older records/i,
    });

    userEvent.click(accordion);

    const firstRecordTitle = await screen.findByText(/Casa a solesta gym/i);
    const secondRecordtitle = screen.getByText(/Solesta gym a casa/i);

    expect(firstRecordTitle).toBeInTheDocument();
    expect(secondRecordtitle).toBeInTheDocument();
  });

  test('Show older records expanded with an error', async () => {
    fetchMock.mockResponse(() => Promise.reject(JSON.stringify(failedOlderRecordsResponse)));
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <OlderRecords color="blue" accountId="some-account-id" isGuestUser={false} />
      </Router>,
      { preloadedState: { user: userInitialState } },
    );

    const accordion = screen.getByRole('button', {
      name: /older records/i,
    });

    userEvent.click(accordion);

    const errorText = await screen.findByText(/An error has ocurred. Please try again later\./i);
    expect(errorText).toBeInTheDocument();
  });

  test('Show older records, click a month beyond the current month, click on search expenses and should show error', async () => {
    const { futureMonth, futureMonthName } = getFutureDate();

    fetchMock.once(JSON.stringify(olderRecordsResponse));
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <OlderRecords color="blue" accountId="some-account-id" isGuestUser={false} />
      </Router>,
      { preloadedState: { user: userInitialState } },
    );

    // Click accordion
    const accordion = screen.getByRole('button', {
      name: /older records/i,
    });
    userEvent.click(accordion);
    await screen.findByText(/Casa a solesta gym/i);

    // Change month on combobox
    const selectMonthTestId = screen.getByTestId('select-month');
    const selectMonthButton = within(selectMonthTestId).getByRole('combobox');
    fireEvent.mouseDown(selectMonthButton);
    const listbox = within(screen.getByRole('presentation')).getByRole(
      'listbox',
    );
    const options = within(listbox).getAllByRole('option');
    fireEvent.click(options[futureMonth]);
    expect(await screen.findByText(futureMonthName)).toBeInTheDocument();

    // Click on search expenses button
    const searchExpensesButton = screen.getByRole('button', { name: /search expenses/i });
    userEvent.click(searchExpensesButton);

    const errorMessage = new RegExp(`You are selecting a date in the future: ${futureMonthName} 2024`);
    await screen.findByText(errorMessage);
  });

  test('Show older records, then click the current month option, then click on search expenses and should show error', async () => {
    const { currentMonth, currentMonthName } = getCurrentDate();

    fetchMock.once(JSON.stringify(olderRecordsResponse));
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <OlderRecords color="blue" accountId="some-account-id" isGuestUser={false} />
      </Router>,
      { preloadedState: { user: userInitialState } },
    );

    // Click accordion
    const accordion = screen.getByRole('button', {
      name: /older records/i,
    });
    userEvent.click(accordion);
    await screen.findByText(/Casa a solesta gym/i);

    // Change month on combobox
    const selectMonthTestId = screen.getByTestId('select-month');
    const selectMonthButton = within(selectMonthTestId).getByRole('combobox');
    fireEvent.mouseDown(selectMonthButton);
    const listbox = within(screen.getByRole('presentation')).getByRole(
      'listbox',
    );
    const options = within(listbox).getAllByRole('option');
    fireEvent.click(options[currentMonth]);
    expect(await screen.findByText(currentMonthName)).toBeInTheDocument();

    // Click on search expenses button
    const searchExpensesButton = screen.getByRole('button', { name: /search expenses/i });
    userEvent.click(searchExpensesButton);

    const errorMessage = new RegExp(`${currentMonthName} records are shown above. Please select an older month.`);
    await screen.findByText(errorMessage);
  });

  test('Show older records, then click the last month option, then click on search expenses and should show error', async () => {
    const { lastMonth, lastMonthName } = getLastMonthDate();

    fetchMock.once(JSON.stringify(olderRecordsResponse));
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <OlderRecords color="blue" accountId="some-account-id" isGuestUser={false} />
      </Router>,
      { preloadedState: { user: userInitialState } },
    );

    // Click accordion
    const accordion = screen.getByRole('button', {
      name: /older records/i,
    });
    userEvent.click(accordion);
    await screen.findByText(/Casa a solesta gym/i);

    // Change month on combobox
    const selectMonthTestId = screen.getByTestId('select-month');
    const selectMonthButton = within(selectMonthTestId).getByRole('combobox');
    fireEvent.mouseDown(selectMonthButton);
    const listbox = within(screen.getByRole('presentation')).getByRole(
      'listbox',
    );
    const options = within(listbox).getAllByRole('option');
    fireEvent.click(options[lastMonth]);
    expect(await screen.findByText(lastMonthName)).toBeInTheDocument();

    // Click on search expenses button
    const searchExpensesButton = screen.getByRole('button', { name: /search expenses/i });
    userEvent.click(searchExpensesButton);

    const errorMessage = new RegExp(`${lastMonthName} records are shown above. Please select an older month.`);
    await screen.findByText(errorMessage);
  });
});
