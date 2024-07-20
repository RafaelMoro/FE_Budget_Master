import { screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { Header } from './Header';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { getInitialUserInterfaceState } from '../../../tests/Global.mocks';

describe('Header', () => {
  const history = createMemoryHistory();
  test('Show Header in Mobile', () => {
    const userInterfaceState = getInitialUserInterfaceState({ newWindowSize: 'Mobile' });
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>,
      { preloadedState: { userInterface: userInterfaceState } },
    );

    expect(screen.getByRole('heading', { name: /budget master/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /budget master logo/i })).toBeInTheDocument();
    expect(screen.getByTestId('hamburguer-menu-header')).toBeInTheDocument();
    // expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    // expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });
});
