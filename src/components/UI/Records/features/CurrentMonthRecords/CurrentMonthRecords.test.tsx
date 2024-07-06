import { screen, within } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { CurrentMonthRecords } from './CurrentMonthRecords';
import { userInitialState } from '../../Record.mocks';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { getCurrentDate } from '../../../../../utils';

describe('Current month records', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  const history = createMemoryHistory();
  const { currentMonthName } = getCurrentDate();

  test('Show current month accordeon in loading state', async () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <CurrentMonthRecords color="red" accountId="some-account-id" isGuestUser={false} />
      </Router>,
      { preloadedState: { user: userInitialState } },
    );

    const buttonExpandAccordion = screen.getByRole('button', {
      name: `Current month: ${currentMonthName}`,
    });
    const icon = within(buttonExpandAccordion).getByTestId('ExpandLessIcon');
    const totalExpenseText = await screen.findByText(/total expense:/i);
    const totalIncomeText = screen.getByText(/total income:/i);
    const loadingSkeletons = screen.getAllByTestId('record-loading-skeleton');

    expect(totalExpenseText).toBeInTheDocument();
    expect(totalIncomeText).toBeInTheDocument();
    expect(loadingSkeletons).toHaveLength(3);
    expect(screen.getByText(`Current month: ${currentMonthName}`)).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
});
