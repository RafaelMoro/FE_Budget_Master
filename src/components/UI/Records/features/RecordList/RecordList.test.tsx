import { screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { accountsInitialState, getAccountsState, userInitialState } from '../../Record.mocks';
import { RecordList } from './RecordList';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';

describe('Record List', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  const history = createMemoryHistory();
  const handleCreateAccount = jest.fn();

  test('Show record list waiting on load of the accounts', () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <RecordList handleOpenCreateAccount={handleCreateAccount} />
      </Router>,
      { preloadedState: { user: userInitialState, accounts: accountsInitialState } },
    );

    expect(screen.getByText('Waiting on the load of accounts...')).toBeInTheDocument();
  });

  test('Show record list while loading accounts', () => {
    const accountsState = getAccountsState({ state: 'loading' });
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <RecordList handleOpenCreateAccount={handleCreateAccount} />
      </Router>,
      { preloadedState: { user: userInitialState, accounts: accountsState } },
    );

    expect(screen.getByText('Loading accounts....')).toBeInTheDocument();
  });
});
