import { screen, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { HeaderAvatarConfig } from './HeaderAvatarConfig';

describe('<HeaderAvatarConfig />', () => {
  const toggleCategoriesDialog = jest.fn();
  test('Show Avatar with initials', () => {
    const signOut = jest.fn();
    render(<HeaderAvatarConfig toggleCategoriesDialog={toggleCategoriesDialog} initials="JD" signOut={signOut} />);
    screen.getByText(/jd/i);
  });

  test('Click on avatar and open menu', async () => {
    const signOut = jest.fn();
    render(<HeaderAvatarConfig toggleCategoriesDialog={toggleCategoriesDialog} initials="JD" signOut={signOut} />);

    const button = screen.getByRole('button', { name: /open-configuration-button/i });
    await act(async () => userEvent.click(button));

    expect(await screen.findByRole('menuitem', { name: /categorías/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /cerrar sesión/i })).toBeInTheDocument();
  });

  test('Click on avatar, then open menu, then click on "cerrar sesión" and sign out function is called', async () => {
    const signOut = jest.fn();
    render(<HeaderAvatarConfig toggleCategoriesDialog={toggleCategoriesDialog} initials="JD" signOut={signOut} />);

    const button = screen.getByRole('button', { name: /open-configuration-button/i });
    await act(async () => userEvent.click(button));
    await screen.findByRole('menuitem', { name: /categorías/i });
    const signOutButton = screen.getByRole('menuitem', { name: /cerrar sesión/i });
    await act(async () => userEvent.click(signOutButton));

    expect(signOut).toHaveBeenCalled();
  });
});
