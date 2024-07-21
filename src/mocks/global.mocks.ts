import { User } from '../globalInterface';
import { GUEST_USER_ID } from '../hooks/useGuestUser/constants';
import { UserInitialState } from '../redux/slices/User/interface';

const guestUser: User = {
  accessToken: '',
  bearerToken: '',
  user: {
    email: '',
    firstName: 'Guest',
    lastName: 'User',
    middleName: '',
    sub: GUEST_USER_ID,
  },
};

export const userLoggedMock: UserInitialState = {
  userInfo: {
    bearerToken: 'The bearer token',
    accessToken: 'The access token',
    user: {
      email: 'email@email.com',
      firstName: 'John',
      lastName: 'Doe',
      middleName: '',
      sub: 'sub-user-id-123',
    },
  },
};

export const guestUserMock: UserInitialState = {
  userInfo: guestUser,
};
