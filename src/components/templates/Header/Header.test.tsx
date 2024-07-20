import { screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { getInitialUserInterfaceState, getUserMock } from '../../../tests/Global.mocks';
import { LOGIN_ROUTE } from '../../../pages/RoutesConstants';

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  const history = createMemoryHistory();
  test('Show Header in Landing page for Mobile', () => {
    const userInterfaceState = getInitialUserInterfaceState({ newWindowSize: 'Mobile' });
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Header isLandingPage />
      </Router>,
      { preloadedState: { userInterface: userInterfaceState } },
    );

    expect(screen.getByRole('heading', { name: /budget master/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /budget master logo/i })).toBeInTheDocument();
    expect(screen.getByTestId('hamburguer-menu-header')).toBeInTheDocument();
  });

  test('User clicks on hamburguer menu, click on Log in link and send him into Login page', async () => {
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

  test('Show Header in Landing page for Destop with guest user', () => {
    const guestUserState = getUserMock({ isGuestUser: true });
    const userInterfaceState = getInitialUserInterfaceState({ newWindowSize: 'Desktop' });
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Header isLandingPage />
      </Router>,
      { preloadedState: { userInterface: userInterfaceState, user: guestUserState } },
    );

    expect(screen.queryByRole('button', { name: /log in/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /register/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get personalized experience/i })).toBeInTheDocument();
  });
});
