import { screen, within } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { LastMonthRecords } from './LastMonthRecords';
import { userInitialState } from '../../Record.mocks';
import { getLastMonthDate } from '../../../../../utils';

describe('Last Month Records', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  const history = createMemoryHistory();
  const { lastMonthName } = getLastMonthDate();

  test('Show last month accordeon collapsed', () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <LastMonthRecords color="red" accountId="some-account-id" isGuestUser={false} />
      </Router>,
      { preloadedState: { user: userInitialState } },
    );

    const buttonExpandAccordion = screen.getByRole('button', {
      name: `Last month: ${lastMonthName}`,
    });
    const icon = within(buttonExpandAccordion).getByTestId('ExpandMoreIcon');

    expect(screen.getByText(`Last month: ${lastMonthName}`)).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  test('Show last records expanded with loading state', async () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <LastMonthRecords color="blue" accountId="some-account-id" isGuestUser={false} />
      </Router>,
      { preloadedState: { user: userInitialState } },
    );

    const accordion = screen.getByRole('button', {
      name: `Last month: ${lastMonthName}`,
    });

    userEvent.click(accordion);

    const totalExpenseText = await screen.findByText(/total expense:/i);
    const totalIncomeText = screen.getByText(/total income:/i);
    const loadingSkeletons = screen.getAllByTestId('record-loading-skeleton');

    expect(totalExpenseText).toBeInTheDocument();
    expect(totalIncomeText).toBeInTheDocument();
    expect(loadingSkeletons).toHaveLength(3);
  });
});
