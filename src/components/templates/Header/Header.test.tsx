import { screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { getInitialUserInterfaceState, getUserMock } from '../../../tests/Global.mocks';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../../pages/RoutesConstants';

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  const history = createMemoryHistory();
  test('Show Header for Mobile', () => {
    const userInterfaceState = getInitialUserInterfaceState({ newWindowSize: 'Mobile' });
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>,
      { preloadedState: { userInterface: userInterfaceState } },
    );

    expect(screen.getByText(/budget master/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /budget master logo/i })).toBeInTheDocument();
    expect(screen.getByTestId('hamburguer-menu-header')).toBeInTheDocument();
  });

  test('Show Header in Landing page for Mobile', () => {
    const userInterfaceState = getInitialUserInterfaceState({ newWindowSize: 'Mobile' });
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Header isLandingPage />
      </Router>,
      { preloadedState: { userInterface: userInterfaceState } },
    );

    expect(screen.getByText(/budget master/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /budget master logo/i })).toBeInTheDocument();
    expect(screen.getByTestId('hamburguer-menu-header')).toBeInTheDocument();
  });

  test('Given a logged user in Mobile, he clicks on the log out button, then the hamburguer menu icon appears', async () => {
    const loggedUserState = getUserMock({ isGuestUser: false });
    const userInterfaceState = getInitialUserInterfaceState({ newWindowSize: 'Mobile' });
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>,
      { preloadedState: { userInterface: userInterfaceState, user: loggedUserState } },
    );

    const hamburguerMenu = screen.getByTestId('hamburguer-menu-header');
    expect(hamburguerMenu).toBeInTheDocument();

    userEvent.click(hamburguerMenu);
    expect(await screen.findByTestId('log-out-button')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('log-out-button'));

    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
    expect(screen.getByTestId('hamburguer-menu-header')).toBeInTheDocument();
  });

  test('Given a user in mobile, he clicks on hamburguer menu, then he clicks on Log in link and send him into Login page', async () => {
    const userInterfaceState = getInitialUserInterfaceState({ newWindowSize: 'Mobile' });
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Header isLandingPage />
      </Router>,
      { preloadedState: { userInterface: userInterfaceState } },
    );

    const hamburguerMenu = screen.getByTestId('hamburguer-menu-header');

    expect(hamburguerMenu).toBeInTheDocument();
    userEvent.click(hamburguerMenu);
    expect(await screen.findByText(/log in/i)).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/log in/i));
    await waitFor(() => {
      expect(history.location.pathname).toBe(LOGIN_ROUTE);
    });
  });

  test('Given a user in mobile, he clicks on hamburguer menu, then he clicks on Register link and send him into Register page', async () => {
    const userInterfaceState = getInitialUserInterfaceState({ newWindowSize: 'Mobile' });
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Header isLandingPage />
      </Router>,
      { preloadedState: { userInterface: userInterfaceState } },
    );

    const hamburguerMenu = screen.getByTestId('hamburguer-menu-header');

    expect(hamburguerMenu).toBeInTheDocument();
    userEvent.click(hamburguerMenu);
    expect(await screen.findByText(/log in/i)).toBeInTheDocument();

    const register = screen.getByText(/register/i);
    expect(register).toBeInTheDocument();

    userEvent.click(register);
    await waitFor(() => {
      expect(history.location.pathname).toBe(REGISTER_ROUTE);
    });
  });

  test('Show Header in Landing page for Destop', () => {
    const userInterfaceState = getInitialUserInterfaceState({ newWindowSize: 'Desktop' });
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Header isLandingPage />
      </Router>,
      { preloadedState: { userInterface: userInterfaceState } },
    );

    expect(screen.queryByTestId('hamburguer-menu-header')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test(`Given a guest user in the landing page, he clicks on the button 'get personalized experience',
    then a modal is shown, then he clicks on the button 'Log in'`, async () => {
    const guestUserState = getUserMock({ isGuestUser: true });
    const userInterfaceState = getInitialUserInterfaceState({ newWindowSize: 'Desktop' });
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Header isLandingPage />
      </Router>,
      { preloadedState: { userInterface: userInterfaceState, user: guestUserState } },
    );
    const getPersonalizedExperienceButton = screen.getByRole('button', { name: /get personalized experience/i });

    expect(screen.queryByRole('button', { name: /log in/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /register/i })).not.toBeInTheDocument();
    // Expect show personalized button in landing page.
    expect(getPersonalizedExperienceButton).toBeInTheDocument();

    userEvent.click(getPersonalizedExperienceButton);

    // Expect modal shown.
    expect(await screen.findByRole('heading', { name: /secure your data/i })).toBeInTheDocument();
    expect(screen.getByText(/save your progress by creating an account or continue your journey by signing in/i)).toBeInTheDocument();
    const logInButton = screen.getByRole('button', { name: /log in/i });
    expect(logInButton).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();

    userEvent.click(logInButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe(LOGIN_ROUTE);
    });
  });

  test(`Given a guest user in a non landing page, he clicks on the button 'get personalized experience',
    then a modal is shown, then he clicks on the button 'Log in'`, async () => {
    const guestUserState = getUserMock({ isGuestUser: true });
    const userInterfaceState = getInitialUserInterfaceState({ newWindowSize: 'Desktop' });
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>,
      { preloadedState: { userInterface: userInterfaceState, user: guestUserState } },
    );
    const getPersonalizedExperienceButton = screen.getByRole('button', { name: /get personalized experience/i });

    expect(screen.queryByRole('button', { name: /log in/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /register/i })).not.toBeInTheDocument();
    // Expect show personalized button.
    expect(getPersonalizedExperienceButton).toBeInTheDocument();

    userEvent.click(getPersonalizedExperienceButton);

    // Expect modal shown.
    expect(await screen.findByRole('heading', { name: /secure your data/i })).toBeInTheDocument();
    expect(screen.getByText(/save your progress by creating an account or continue your journey by signing in/i)).toBeInTheDocument();
    const logInButton = screen.getByRole('button', { name: /log in/i });
    expect(logInButton).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();

    userEvent.click(logInButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe(LOGIN_ROUTE);
    });
  });

  test(`Given a guest user in the landing page, he clicks on the button 'get personalized experience',
    then a modal is shown, then he clicks on the button 'Register'`, async () => {
    const guestUserState = getUserMock({ isGuestUser: true });
    const userInterfaceState = getInitialUserInterfaceState({ newWindowSize: 'Desktop' });
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Header isLandingPage />
      </Router>,
      { preloadedState: { userInterface: userInterfaceState, user: guestUserState } },
    );
    const getPersonalizedExperienceButton = screen.getByRole('button', { name: /get personalized experience/i });

    expect(screen.queryByRole('button', { name: /log in/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /register/i })).not.toBeInTheDocument();
    // Expect show personalized button in landing page.
    expect(getPersonalizedExperienceButton).toBeInTheDocument();

    userEvent.click(getPersonalizedExperienceButton);

    // Expect modal shown.
    expect(await screen.findByRole('heading', { name: /secure your data/i })).toBeInTheDocument();
    expect(screen.getByText(/save your progress by creating an account or continue your journey by signing in/i)).toBeInTheDocument();
    const registerButton = screen.getByRole('button', { name: /register/i });
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();

    userEvent.click(registerButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe(REGISTER_ROUTE);
    });
  });

  test(`Given a guest user in a non landing page, he clicks on the button 'get personalized experience',
    then a modal is shown, then he clicks on the button 'Register'`, async () => {
    const guestUserState = getUserMock({ isGuestUser: true });
    const userInterfaceState = getInitialUserInterfaceState({ newWindowSize: 'Desktop' });
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>,
      { preloadedState: { userInterface: userInterfaceState, user: guestUserState } },
    );
    const getPersonalizedExperienceButton = screen.getByRole('button', { name: /get personalized experience/i });

    expect(screen.queryByRole('button', { name: /log in/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /register/i })).not.toBeInTheDocument();
    // Expect show personalized button.
    expect(getPersonalizedExperienceButton).toBeInTheDocument();

    userEvent.click(getPersonalizedExperienceButton);

    // Expect modal shown.
    expect(await screen.findByRole('heading', { name: /secure your data/i })).toBeInTheDocument();
    expect(screen.getByText(/save your progress by creating an account or continue your journey by signing in/i)).toBeInTheDocument();
    const registerButton = screen.getByRole('button', { name: /register/i });
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();

    userEvent.click(registerButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe(REGISTER_ROUTE);
    });
  });

  test('Given a logged user in Desktop, he clicks on the log out button, then the sign in and register button appears', async () => {
    const loggedUserState = getUserMock({ isGuestUser: false });
    const userInterfaceState = getInitialUserInterfaceState({ newWindowSize: 'Desktop' });
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>,
      { preloadedState: { userInterface: userInterfaceState, user: loggedUserState } },
    );

    const signOutButton = screen.getByRole('button', { name: /sign-out-button/i });
    expect(signOutButton).toBeInTheDocument();

    userEvent.click(signOutButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });
});
