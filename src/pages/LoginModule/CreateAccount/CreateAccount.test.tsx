import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import { CreateAccount } from './CreateAccount';
import { WrapperRedux } from '../../../tests/WrapperRedux';

beforeEach(() => {
  // having console error because of formik.
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'test@mail.com',
  password: 'TestPassword1@',
  confirmPassword: 'TestPassword1@',
};

describe('<CreateAccount />', () => {
  const history = createMemoryHistory();
  let title: HTMLElement | null = null;
  let description: HTMLElement | null = null;

  // Inputs
  let nameInputs: HTMLElement[] | null = null;
  let middleNameInput: HTMLElement | null = null;
  let lastNameInput: HTMLElement | null = null;
  let emailInput: HTMLElement | null = null;
  let passwordInput: HTMLElement | null = null;
  let confirmPasswordInput: HTMLElement | null = null;

  // Buttons
  let nextButton: HTMLElement | null = null;
  let cancelButton: HTMLElement | null = null;
  let returnButton: HTMLElement | null = null;
  let createAccountButton: HTMLElement | null = null;

  describe('Render all UI elements in Create Account page', () => {
    beforeEach(() => {
      render(
        <WrapperRedux>
          <Router location={history.location} navigator={history}>
            <CreateAccount />
          </Router>
        </WrapperRedux>,
      );
    });

    test('Render first view with title, description, inputs: First name, middle name and last name, buttons: cancel and next', () => {
      title = screen.getByRole('heading', { name: /crear cuenta/i });
      description = screen.getByText(/llene la siguiente información para crear su cuenta\./i);
      nameInputs = screen.getAllByRole('textbox', { name: /nombre/i });
      const [firstNameInput] = nameInputs;
      middleNameInput = screen.getByRole('textbox', { name: /segundo nombre \(opcional\)/i });
      lastNameInput = screen.getByRole('textbox', { name: /apellido/i });
      nextButton = screen.getByRole('button', { name: /siguiente/i });
      cancelButton = screen.getByRole('link', { name: /cancelar/i });

      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(firstNameInput).toBeInTheDocument();
      expect(middleNameInput).toBeInTheDocument();
      expect(lastNameInput).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });

    test(`Render second view with title, description, inputs:
    email, password and confirm password, buttons: return and create account`, async () => {
      nameInputs = screen.getAllByRole('textbox', { name: /nombre/i });
      const [firstNameInput] = nameInputs;
      lastNameInput = screen.getByRole('textbox', { name: /apellido/i });
      nextButton = screen.getByRole('button', { name: /siguiente/i });

      // Go to the next view.
      userEvent.type(firstNameInput, userData.firstName);
      userEvent.type(lastNameInput, userData.lastName);
      fireEvent.click(nextButton);

      await waitFor(() => {
        title = screen.getByRole('heading', { name: /crear cuenta/i });
        description = screen.getByText(/llene la siguiente información para crear su cuenta\./i);
        emailInput = screen.getByRole('textbox', { name: /correo electrónico/i });
        passwordInput = screen.getByTestId('password-input');
        confirmPasswordInput = screen.getByTestId('confirm-password-input');
        createAccountButton = screen.getByRole('button', { name: /crear cuenta/i });
        returnButton = screen.getByRole('button', { name: /regresar/i });

        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInTheDocument();
        expect(returnButton).toBeInTheDocument();
        expect(createAccountButton).toBeInTheDocument();
      });
    });
  });
});
