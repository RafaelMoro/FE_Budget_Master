import { screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'jest-fetch-mock';

import { AccountDialog } from './AccountDialog';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';

const successfulResponse = {
  version: '2.0.0',
  success: true,
  message: null,
  data: {
    account: {
      _id: '123',
      title: 'Bank account',
      accountType: 'Credit',
      backgroundColor: 'Teal',
      color: 'White',
      amount: 499,
      sub: '123-456',
      __v: 0,
    },
  },
  error: null,
};
const unsuccessfulResponse = {
  version: '2.0.0',
  success: false,
  message: null,
  data: null,
  error: {
    message: 'Unauthorized',
    statusCode: 401,
  },
};
afterEach(cleanup);

beforeEach(() => {
  // having console error because of formik.
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('<AccountDialog />', () => {
  beforeEach(() => {
    renderWithProviders(
      <AccountDialog
        open
        onClose={jest.fn()}
        accountAction="Create"
        account={null}
      />,
      { preloadedState: {} },
    );
  });
  test('Show a dialog to create an account', () => {
    const title = screen.getByRole('heading', { name: /crear cuenta:/i });
    const accountTitleTextBox = screen.getByRole('textbox', { name: /título de la cuenta/i });
    const amountTextBox = screen.getByRole('textbox', { name: /cantidad disponible/i });
    const typeOfAccountSelectInput = screen.getByText(/débito/i);
    const createAccountByutton = screen.getByRole('button', {
      name: /crear/i,
    });

    expect(title).toBeInTheDocument();
    expect(accountTitleTextBox).toBeInTheDocument();
    expect(amountTextBox).toBeInTheDocument();
    expect(typeOfAccountSelectInput).toBeInTheDocument();
    expect(createAccountByutton).toBeInTheDocument();
  });

  test('If account title and amount are empty, show validaton error', async () => {
    const createAccountByutton = screen.getByRole('button', {
      name: /crear/i,
    });

    userEvent.click(createAccountByutton);

    await waitFor(() => {
      expect(screen.getByText(/por favor, ingrese el título de su cuenta\./i)).toBeInTheDocument();
      expect(screen.getByText(/por favor, ingrese la cantidad actual de su cuenta\./i)).toBeInTheDocument();
    });
  });
});

describe('AccountDialog creation account', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('Create account with success', async () => {
    fetchMock.once(JSON.stringify(successfulResponse));
    const onClose = jest.fn();
    renderWithProviders(
      <AccountDialog
        open
        onClose={onClose}
        accountAction="Create"
        account={null}
      />,
      { preloadedState: {} },
    );

    const accountTitleTextBox = screen.getByRole('textbox', { name: /título de la cuenta/i });
    const amountTextBox = screen.getByRole('textbox', { name: /cantidad disponible/i });
    const createAccountByutton = screen.getByRole('button', {
      name: /crear/i,
    });

    userEvent.type(accountTitleTextBox, 'Bank account');
    userEvent.type(amountTextBox, '499');

    userEvent.click(createAccountByutton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  test('Create account with no success', async () => {
    fetchMock.once(JSON.stringify(unsuccessfulResponse));
    const onClose = jest.fn();
    renderWithProviders(
      <AccountDialog
        open
        onClose={onClose}
        accountAction="Create"
        account={null}
      />,
      { preloadedState: {} },
    );

    const accountTitleTextBox = screen.getByRole('textbox', {
      name: /account title/i,
    });
    const amountTextBox = screen.getByRole('textbox', {
      name: /amount/i,
    });
    const createAccountByutton = screen.getByRole('button', {
      name: /create account/i,
    });

    userEvent.type(accountTitleTextBox, 'Bank account');
    userEvent.type(amountTextBox, '499');

    userEvent.click(createAccountByutton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });
});
