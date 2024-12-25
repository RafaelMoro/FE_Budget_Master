import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Typography } from '@mui/material';

import { DASHBOARD_ROUTE } from '../RoutesConstants';
import { useSyncLoginInfo } from '../../hooks';
import { PrimaryButton, SecondaryButton } from '../../styles';
import {
  ButtonContainer, Description, LogoTitleLogin, Main,
} from './TryApp.styled';

const TryApp = () => {
  const navigate = useNavigate();
  const { verifyGuestUser } = useSyncLoginInfo();
  const handleClickSampleData = () => navigate(DASHBOARD_ROUTE);

  useEffect(() => {
    verifyGuestUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Main>
      <Typography variant="h1">
        Bienvenido a
        {' '}
        <LogoTitleLogin>
          Budget Master
        </LogoTitleLogin>
      </Typography>
      <Description>Para probar la aplicación podemos cargar datos de prueba o puedes decidir crear todos los datos por ti mismo.</Description>
      <ButtonContainer>
        <SecondaryButton type="button" onClick={handleClickSampleData}>Usar datos de muestra</SecondaryButton>
        <PrimaryButton type="button" onClick={handleClickSampleData}>Usar mis propios datos</PrimaryButton>
      </ButtonContainer>
    </Main>
  );
};

export { TryApp };
