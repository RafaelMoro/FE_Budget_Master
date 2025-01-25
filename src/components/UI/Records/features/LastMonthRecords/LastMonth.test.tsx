import { screen, within } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'jest-fetch-mock';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { LastMonthRecords } from './LastMonthRecords';
import {
  failedOlderRecordsResponse, olderRecordsResponse, olderRecordsResponseEmptyRecords, userInitialState,
} from '../../Record.mocks';
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
      name: `Mes pasado: ${lastMonthName}`,
    });
    const icon = within(buttonExpandAccordion).getByTestId('ExpandMoreIcon');

    expect(screen.getByText(`Mes pasado: ${lastMonthName}`)).toBeInTheDocument();
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
      name: `Mes pasado: ${lastMonthName}`,
    });

    userEvent.click(accordion);

    const totalExpenseText = await screen.findByText(/gastos:/i);
    const totalIncomeText = screen.getByText(/ingresos:/i);
    const loadingSkeletons = screen.getAllByTestId('record-loading-skeleton');

    expect(totalExpenseText).toBeInTheDocument();
    expect(totalIncomeText).toBeInTheDocument();
    expect(loadingSkeletons).toHaveLength(3);
  });

  test('Show last month records expanded with empty records', async () => {
    fetchMock.once(JSON.stringify(olderRecordsResponseEmptyRecords));
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <LastMonthRecords color="blue" accountId="some-account-id" isGuestUser={false} />
      </Router>,
      { preloadedState: { user: userInitialState } },
    );

    const accordion = screen.getByRole('button', {
      name: `Mes pasado: ${lastMonthName}`,
    });

    userEvent.click(accordion);

    const noRecordsFoundText = await screen.findByText(/No has creado transacciones para este mes\./i);
    const createRecordButton = screen.getByRole('button', { name: /crear registro/i });

    expect(noRecordsFoundText).toBeInTheDocument();
    expect(createRecordButton).toBeInTheDocument();
  });

  test('Show last month records expanded with records', async () => {
    fetchMock.once(JSON.stringify(olderRecordsResponse));
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <LastMonthRecords color="blue" accountId="some-account-id" isGuestUser={false} />
      </Router>,
      { preloadedState: { user: userInitialState } },
    );

    const accordion = screen.getByRole('button', {
      name: `Mes pasado: ${lastMonthName}`,
    });

    userEvent.click(accordion);

    const firstRecordTitle = await screen.findByText(/Casa a solesta gym/i);
    const secondRecordtitle = screen.getByText(/Solesta gym a casa/i);

    expect(firstRecordTitle).toBeInTheDocument();
    expect(secondRecordtitle).toBeInTheDocument();
  });

  test('Show last month records expanded with an error', async () => {
    fetchMock.mockResponse(() => Promise.reject(JSON.stringify(failedOlderRecordsResponse)));
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <LastMonthRecords color="blue" accountId="some-account-id" isGuestUser={false} />
      </Router>,
      { preloadedState: { user: userInitialState } },
    );

    const accordion = screen.getByRole('button', {
      name: `Mes pasado: ${lastMonthName}`,
    });

    userEvent.click(accordion);

    const errorText = await screen.findByText(/Oops! Algo no salió como esperabamos\. Por favor, intente de nuevo más tarde\./i);
    expect(errorText).toBeInTheDocument();
  });
});
