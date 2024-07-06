import { screen, within } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

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

  test('Show last month accordeon collapsed', () => {
    const { lastMonthName } = getLastMonthDate();
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
});
