import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Typography } from '@mui/material';

import { DASHBOARD_ROUTE } from '../RoutesConstants';
import { useSyncLoginInfo } from '../../hooks';
import { PrimaryButton, SecondaryButton } from '../../styles';
import {
  ActionsContainer, Description, ImageWithData, ImageWithNoData, LogoTitleLogin, Main,
  PrimaryButtonContainer,
  SecondaryButtonContainer,
  SkipStepButton,
} from './TryApp.styled';
import tryAppEmptyAccountImage from '../../assets/try-app/try-app-empty-account.webp';
import tryAppWithDataImage from '../../assets/try-app/try-app-with-data.webp';

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
      <ActionsContainer>
        <ImageWithData src={tryAppWithDataImage} alt="Budget Master App with data screenshot" />
        <PrimaryButtonContainer>
          <PrimaryButton type="button" onClick={handleClickSampleData}>Usar mis propios datos</PrimaryButton>
        </PrimaryButtonContainer>
        <ImageWithNoData src={tryAppEmptyAccountImage} alt="Budget Master App with no data screenshot" />
        <SecondaryButtonContainer>
          <SecondaryButton type="button" onClick={handleClickSampleData}>Usar datos de muestra</SecondaryButton>
        </SecondaryButtonContainer>
      </ActionsContainer>
      <SkipStepButton variant="text" onClick={handleClickSampleData}>Omitir este paso</SkipStepButton>
    </Main>
  );
};

export { TryApp };
