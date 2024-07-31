import { WindowSizeValues } from '../aliasType';
import { SystemStateEnum } from '../enums';
import { UserInterfaceInitialState } from '../redux/interface';
import { UserInitialState } from '../redux/slices/User/interface';

export const getInitialUserInterfaceState = ({ newWindowSize }: { newWindowSize: WindowSizeValues }): UserInterfaceInitialState => ({
  notification: {
    title: '',
    description: '',
    status: SystemStateEnum.Info,
    showNotification: false,
  },
  windowSize: newWindowSize,
  hasSignedOn: false,
});

export const getUserMock = ({ isGuestUser = false }: { isGuestUser?: boolean }): UserInitialState => ({
  userInfo: {
    bearerToken: isGuestUser ? '' : 'The bearer token',
    accessToken: isGuestUser ? '' : 'The access token',
    user: {
      email: isGuestUser ? '' : 'email@email.com',
      firstName: isGuestUser ? 'Guest' : 'John',
      lastName: isGuestUser ? 'User' : 'Doe',
      middleName: '',
      sub: 'sub-user-id-123',
    },
  },
});
