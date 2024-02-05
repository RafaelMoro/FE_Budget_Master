import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { DASHBOARD_ROUTE, LOGIN_ROUTE } from '../pages/RoutesConstants';
import { LoginValues } from '../pages/LoginModule/Login/interface';
import { SystemStateEnum } from '../enums';
import { useNotification } from './useNotification';
import { saveInfoToLocalStorage } from '../utils';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  loginUser, disableNavigateDashboardFlag, signOff,
} from '../redux/slices/User/user.slice';
import { resetAccounts, resetSelectedAccount } from '../redux/slices/Accounts/accounts.slice';
import { ERROR_MESSAGE_GENERAL, ERROR_MESSAGE_UNAUTHORIZED, UNAUTHORIZED_ERROR } from '../constants';
import { resetRecordsAndTotal } from '../redux/slices/Records/records.slice';

const NOTIFICATION_TITLE = 'Error';
const NOTIFICATION_DESCRIPTION = '';
const NOTIFICATION_STATUS = SystemStateEnum.Error;

/*
* useLogin manages:
*   - The notification of the Login Page
*   - Update user atom from local storage
*   - handleSubmit function to manage the data when the form in the Login page is submitted.
*
* It returns:
*   - handleSubmit: manages the actions after submitting the form in the Login page
*   - toggleShowNotification: Function that toggles the notification to show it or hide it.
*   - notificationInfo: React ref that has the notification title, description and status.
*   - showNotification: A flag to show or hide the notification component.
*/

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userReduxState = useAppSelector((state) => state.user);
  const {
    toggleShowNotification, notificationInfo,
    updateDescription, notification,
  } = useNotification({
    title: NOTIFICATION_TITLE, description: NOTIFICATION_DESCRIPTION, status: NOTIFICATION_STATUS,
  });

  const signOut = () => {
    // Reset redux state and local storage after sign out.
    dispatch(signOff());
    dispatch(resetAccounts());
    dispatch(resetSelectedAccount());
    dispatch(resetRecordsAndTotal());
    saveInfoToLocalStorage({});
    navigate(LOGIN_ROUTE);
  };

  // After having a success login, the flag of navigate to dashboard will be enabled.
  useEffect(() => {
    if (userReduxState.navigateToDashboard) {
      // After navigating to the dashboard, disable the flag to avoid re-render.
      navigate(DASHBOARD_ROUTE);
      dispatch(disableNavigateDashboardFlag());
    }
  }, [dispatch, navigate, userReduxState.navigateToDashboard]);

  const handleSubmit = async (values: LoginValues) => {
    try {
      await dispatch(loginUser(values)).unwrap();
    } catch (err) {
      // Catches if the action returns an axios error that could be error 401 unauthorized
      const errorCatched = err as AxiosError;
      if (errorCatched?.message === UNAUTHORIZED_ERROR) {
        updateDescription(ERROR_MESSAGE_UNAUTHORIZED);
        toggleShowNotification();
        return;
      }
      updateDescription(ERROR_MESSAGE_GENERAL);
      toggleShowNotification();
    }
  };

  const submitOnPressEnter = (
    event: React.KeyboardEvent<HTMLFormElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: (() => Promise<void>) & (() => Promise<any>),
  ) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  return {
    handleSubmit,
    handleShowNotification: toggleShowNotification,
    signOut,
    notificationInfo,
    notification,
    submitOnPressEnter,
  };
};

export { useLogin };
