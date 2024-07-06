import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import fetchMock from 'jest-fetch-mock';

import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { olderRecordsResponseEmptyRecords, userInitialState } from '../../Record.mocks';
import { OlderRecords } from './OlderRecords';

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
    // const noRecordsFoundText = screen.getByText(/you have not created records for this month\./i);
    // const createRecordButton = screen.getByRole('button', { name: /create record/i });

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
});
