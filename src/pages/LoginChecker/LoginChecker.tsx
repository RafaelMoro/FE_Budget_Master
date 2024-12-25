import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import { useGuestUser, useSyncLoginInfo } from '../../hooks';
import { DASHBOARD_ROUTE } from '../RoutesConstants';
import { BrandTitle } from '../../styles';
import { Main } from './LoginChecker.styled';
import { HorizontalLoader } from '../../components/UI/HorizontalLoader';

const LoginChecker = () => {
  const navigate = useNavigate();
  const { addGuestUser, isGuestUser, userLoggedOn } = useGuestUser();
  console.log('isGuestUser', isGuestUser);
  console.log('userLoggedOn', userLoggedOn);
  const { verifyGuestUser } = useSyncLoginInfo();
  const checkLogin = () => {};

  const handleStartNow = () => {
    if (isGuestUser || userLoggedOn) {
      navigate(DASHBOARD_ROUTE);
      return;
    }
    addGuestUser();
    navigate(DASHBOARD_ROUTE);
  };

  useEffect(() => {
    verifyGuestUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Main>
      <Typography variant="h1">
        Bienvenido a
        {' '}
        <BrandTitle>
          Budget Master
        </BrandTitle>
      </Typography>
      <HorizontalLoader />
      <Typography>Revisando si ya ha iniciado sesión...</Typography>
      {
        (userLoggedOn) && (<Typography>Ya has iniciado sesión. Redirigiendote hacia tu panel de cuentas.</Typography>)
      }
    </Main>
  );
};

export { LoginChecker };
