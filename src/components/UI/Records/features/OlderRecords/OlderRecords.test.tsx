import { screen, within } from '@testing-library/react';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { userInitialState } from '../../Record.mocks';
import { OlderRecords } from './OlderRecords';

describe('Older Records', () => {
  test('Show older records collapsed', () => {
    renderWithProviders(
      <OlderRecords color="blue" accountId="some-account-id" isGuestUser={false} />,
      { preloadedState: { user: userInitialState } },
    );

    const buttonExpandAccordion = screen.getByRole('button', {
      name: /older records/i,
    });
    const icon = within(buttonExpandAccordion).getByTestId('ExpandMoreIcon');

    expect(screen.getByText('Older Records')).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
});
