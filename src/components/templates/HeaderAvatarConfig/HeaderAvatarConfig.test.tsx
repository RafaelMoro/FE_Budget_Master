import { screen, render } from '@testing-library/react';
import { HeaderAvatarConfig } from './HeaderAvatarConfig';

describe('<HeaderAvatarConfig />', () => {
  test('Show Avatar with initials', () => {
    const signOut = jest.fn();
    render(<HeaderAvatarConfig initials="JD" signOut={signOut} />);
    screen.getByText(/jd/i);
  });
});
