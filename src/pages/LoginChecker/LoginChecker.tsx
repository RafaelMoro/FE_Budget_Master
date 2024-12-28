import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import { useGuestUser, useSyncLoginInfo } from '../../hooks';
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from '../RoutesConstants';
import { BrandTitle } from '../../styles';
import { Main } from './LoginChecker.styled';
import { HorizontalLoader } from '../../components/UI/HorizontalLoader';

const LoginChecker = () => {
  const navigate = useNavigate();
  const { isGuestUser, userLoggedOn } = useGuestUser();
  const { verifyGuestUser } = useSyncLoginInfo();

  const [showInitialMessage, setShowInitialMessage] = useState(true);

  useEffect(() => {
    const res = verifyGuestUser();
    console.log('res', res);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowInitialMessage(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (userLoggedOn) {
      setTimeout(() => {
        navigate(DASHBOARD_ROUTE);
      }, 2000);
    }
    if (!isGuestUser && !userLoggedOn && !showInitialMessage) {
      setTimeout(() => {
        navigate(LOGIN_ROUTE);
      }, 3000);
    }

    if (isGuestUser && !showInitialMessage) {
      setTimeout(() => {
        navigate(DASHBOARD_ROUTE);
      }, 2000);
    }
  }, [navigate, userLoggedOn, isGuestUser, showInitialMessage]);

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
      {
        (showInitialMessage) && (<Typography>Revisando si ya ha iniciado sesión...</Typography>)
      }
      {
        (userLoggedOn && !showInitialMessage) && (<Typography>Ya has iniciado sesión. Redirigiendote hacia tu panel de administración.</Typography>)
      }
      {
        (!isGuestUser && !userLoggedOn && !showInitialMessage) && (
        <Typography>No has iniciado sesión. Redirigiendote hacia el inicio de sesión.</Typography>
        )
      }
      {
        (isGuestUser && !showInitialMessage) && (
          <>
            <Typography>Estás accediendo a la versión gratuita de nuestra plataforma. </Typography>
            <Typography>En unos momentos, serás redirigido al panel de administración para continuar con tu experiencia financiera.</Typography>
          </>
        )
      }
    </Main>
  );
};

export { LoginChecker };
