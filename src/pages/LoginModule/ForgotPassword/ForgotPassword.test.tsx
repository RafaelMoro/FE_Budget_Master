import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';

import { ForgotPassword } from './ForgotPassword';
import { WrapperRedux } from '../../../tests/WrapperRedux';
import { LOGIN_ROUTE } from '../../RoutesConstants';

const successfulResponse = {
  version: '2.0.0',
  success: true,
  message: 'Email sent',
  data: null,
  error: null,
};
const userNotFoundResponse = {
  version: '2.0.0',
  success: false,
  message: null,
  data: null,
  error: {
    statusCode: 400,
    message: 'User not found.',
    error: 'Bad Request',
  },
};

beforeEach(() => {
  fetchMock.resetMocks();
  jest.clearAllMocks();
  // having console error because of formik.
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('Reset password page tests', () => {
  test('Show Forgot Password page with title, description, an input to put an email, cancel and send buttons', () => {
    const history = createMemoryHistory();
    render(
      <WrapperRedux>
        <Router location={history.location} navigator={history}>
          <ForgotPassword />
        </Router>
      </WrapperRedux>,
    );

    expect(screen.getByRole('heading', {
      name: /¿olvidaste tu contraseña\? recuperémosla juntos/i,
    })).toBeInTheDocument();
    expect(screen.getByText(/ingrese su correo electrónico y le enviaremos las instrucciones para recuperar su contraseña\./i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  describe('Validations of the email input', () => {
    let emailInput: HTMLElement | null = null;
    let changePasswordButton: HTMLElement | null = null;

    beforeEach(() => {
      const history = createMemoryHistory();
      render(
        <WrapperRedux>
          <Router location={history.location} navigator={history}>
            <ForgotPassword />
          </Router>
        </WrapperRedux>,
      );
    });

    test('When the user leaves the email input empty, then he clicks the button, a required email error should appear', async () => {
      emailInput = screen.getByRole('textbox', { name: /correo electrónico/i });
      changePasswordButton = screen.getByRole('button', { name: /enviar/i });

      fireEvent.click(changePasswordButton);

      await waitFor(() => {
        expect(emailInput).toBeInTheDocument();
        const error = screen.getByText(/Por favor, ingrese su correo electrónico/i);
        expect(error).toBeInTheDocument();
      });
    });

    test('When the user enters an invalid email, then he clicks on the button send, an invalid email error should appear', async () => {
      emailInput = screen.getByRole('textbox', { name: /correo electrónico/i });
      changePasswordButton = screen.getByRole('button', { name: /enviar/i });

      userEvent.type(emailInput, 'a');
      fireEvent.click(changePasswordButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      });
    });
  });

  test(`The user enters a non registered email,
  then show a notification where the email is not registered and show create account button.`, async () => {
    let emailInput: HTMLElement | null = null;
    let changePasswordButton: HTMLElement | null = null;
    const email = 'example@mail.com';

    const history = createMemoryHistory();
    fetchMock.mockRejectedValueOnce(JSON.stringify(userNotFoundResponse));
    render(
      <WrapperRedux>
        <Router location={history.location} navigator={history}>
          <ForgotPassword />
        </Router>
      </WrapperRedux>,
    );
    emailInput = screen.getByRole('textbox', { name: /correo electrónico/i });
    changePasswordButton = screen.getByRole('button', { name: /enviar/i });

    userEvent.type(emailInput, email);
    userEvent.click(changePasswordButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      // Show general error but in real case, we show email not associated to an account notification.
      const notificationText = screen.getByText('Oops! Algo no salió como esperabamos. Por favor, intente de nuevo más tarde.');
      expect(notificationText).toBeInTheDocument();
    });
  });

  test('The user enters a registered email, then the email sent notification is shown.', async () => {
    let emailInput: HTMLElement | null = null;
    let changePasswordButton: HTMLElement | null = null;
    const email = 'example@mail.com';

    const history = createMemoryHistory();
    fetchMock.once(JSON.stringify(successfulResponse));
    render(
      <WrapperRedux>
        <Router location={history.location} navigator={history}>
          <ForgotPassword />
        </Router>
      </WrapperRedux>,
    );
    emailInput = screen.getByRole('textbox', { name: /correo electrónico/i });
    changePasswordButton = screen.getByRole('button', { name: /enviar/i });

    userEvent.type(emailInput, email);
    userEvent.click(changePasswordButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      const successNotification = screen.getByRole('heading', { name: /email sent/i });
      expect(successNotification).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe(LOGIN_ROUTE);
    }, {
      timeout: 4000,
    });
  });
});
