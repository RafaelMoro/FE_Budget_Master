import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useLogin } from './useLogin';
import { CountOnMeLocalStorage } from '../utils/LocalStorage/interface';
import { getLocalStorageInfo, saveInfoToLocalStorage } from '../utils';
import { signOn } from '../redux/slices/User/user.slice';
import { setRecordToBeModified } from '../redux/slices/Records/records.slice';
import { verifyJwtExpiration } from '../utils/verifyJwtExpiration';
import { DASHBOARD_ROUTE, EDIT_RECORD_ROUTE, LOGIN_ROUTE } from '../pages/RoutesConstants';

const useSyncLoginInfo = () => {
  const { signOut } = useLogin();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userReduxState = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!userReduxState.userInfo) {
      const localStorageInfo: CountOnMeLocalStorage = getLocalStorageInfo();
      const IsEmptyLocalStorage = Object.keys(localStorageInfo).length < 1;

      if (IsEmptyLocalStorage) {
        signOut();
        return;
      }

      const user = localStorageInfo?.user;
      const accessToken = user?.accessToken;
      const isExpiredAccessToken = verifyJwtExpiration(accessToken, signOut);

      if (!isExpiredAccessToken) dispatch(signOn(user));
      if (location.pathname === LOGIN_ROUTE) navigate(DASHBOARD_ROUTE);
      if (location.pathname === DASHBOARD_ROUTE && localStorageInfo?.recordToBeEdited) {
        // Reset record to be edited in local storage
        const { recordToBeEdited, ...restOfLocalStorage } = localStorageInfo;
        saveInfoToLocalStorage(restOfLocalStorage);
      }

      /** Update recordToBeEdited on redux if we got the record in local storage */
      if (location.pathname === EDIT_RECORD_ROUTE && localStorageInfo?.recordToBeEdited) {
        dispatch(setRecordToBeModified(localStorageInfo?.recordToBeEdited));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export { useSyncLoginInfo };
