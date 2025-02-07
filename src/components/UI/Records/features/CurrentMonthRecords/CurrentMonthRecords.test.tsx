import { screen, within } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'jest-fetch-mock';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { CurrentMonthRecords } from './CurrentMonthRecords';
import {
  failedOlderRecordsResponse, olderRecordsResponse, olderRecordsResponseEmptyRecords, userInitialState,
} from '../../Record.mocks';
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
      name: `Mes actual: ${currentMonthName}`,
    });
    const icon = within(buttonExpandAccordion).getByTestId('ExpandLessIcon');
    const totalExpenseText = await screen.findByText(/gastos:/i);
    const totalIncomeText = screen.getByText(/ingresos:/i);
    const loadingSkeletons = screen.getAllByTestId('record-loading-skeleton');

    expect(totalExpenseText).toBeInTheDocument();
    expect(totalIncomeText).toBeInTheDocument();
    expect(loadingSkeletons).toHaveLength(3);
    expect(screen.getByText(`Mes actual: ${currentMonthName}`)).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  test('Show current month records with empty records', async () => {
    fetchMock.once(JSON.stringify(olderRecordsResponseEmptyRecords));
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <CurrentMonthRecords color="blue" accountId="some-account-id" isGuestUser={false} />
      </Router>,
      { preloadedState: { user: userInitialState } },
    );

    const noRecordsFoundText = await screen.findByText(/No has creado transacciones para este mes\./i);
    const createRecordButton = screen.getByRole('button', { name: /crear registro/i });

    expect(noRecordsFoundText).toBeInTheDocument();
    expect(createRecordButton).toBeInTheDocument();
  });

  // Hiding charts on unit tests due owner document error when interacting with the dom.
  test('Show current month records with records', async () => {
    fetchMock.once(JSON.stringify(olderRecordsResponse));
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <CurrentMonthRecords color="blue" accountId="some-account-id" isGuestUser={false} />
      </Router>,
      { preloadedState: { user: userInitialState } },
    );

    const firstRecordTitle = await screen.findByText(/Casa a solesta gym/i);
    const secondRecordtitle = screen.getByText(/Solesta gym a casa/i);

    expect(firstRecordTitle).toBeInTheDocument();
    expect(secondRecordtitle).toBeInTheDocument();
  });

  test('Show curent month records with an error', async () => {
    fetchMock.mockResponse(() => Promise.reject(JSON.stringify(failedOlderRecordsResponse)));
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <CurrentMonthRecords color="blue" accountId="some-account-id" isGuestUser={false} />
      </Router>,
      { preloadedState: { user: userInitialState } },
    );

    const errorText = await screen.findByText(/Oops! Algo no salió como esperabamos\. Por favor, intente de nuevo más tarde\./i);
    expect(errorText).toBeInTheDocument();
  });
});
