import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

import { DASHBOARD_ROUTE, TRY_APP_COMPLETE_ROUTE } from '../RoutesConstants';
import { useGuestUser, useSyncLoginInfo } from '../../hooks';
import {
  BrandTitle, PrimaryButton, SecondaryButton,
} from '../../styles';
import {
  ActionsContainer, Description, GoBackAnchor, ImageWithData, ImageWithNoData, Main,
  PrimaryButtonContainer,
  SecondaryButtonContainer,
  SkipStepButton,
} from './TryApp.styled';
import tryAppEmptyAccountImage from '../../assets/try-app/try-app-empty-account.webp';
import tryAppWithDataImage from '../../assets/try-app/try-app-with-data.webp';
import { BUDGET_MASTER_LANDING, TRY_APP_META_DESCRIPTION, TRY_APP_META_TITLE } from '../../constants';
import { ReactHelmet } from '../../components/UI';

const TryApp = () => {
  const location = useLocation();
  const locationState = location?.state;
  const returnRoute = locationState ? locationState?.prevPath : BUDGET_MASTER_LANDING;
  const navigate = useNavigate();
  const { verifyGuestUser } = useSyncLoginInfo();
  const {
    addGuestUserWithData, addGuesUserWithoutData, isGuestUser, userLoggedOn,
  } = useGuestUser();

  const handleOwnData = () => {
    addGuesUserWithoutData();
    navigate(DASHBOARD_ROUTE);
  };

  const handleSampleData = () => {
    addGuestUserWithData();
    navigate(DASHBOARD_ROUTE);
  };

  useEffect(() => {
    if (isGuestUser || userLoggedOn) {
      verifyGuestUser();
      navigate(DASHBOARD_ROUTE);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuestUser, userLoggedOn]);

  return (
    <>
      <ReactHelmet metaTitle={TRY_APP_META_TITLE} metaDescription={TRY_APP_META_DESCRIPTION} completeURL={TRY_APP_COMPLETE_ROUTE} />
      <Main>
        <GoBackAnchor to={returnRoute} title="Volver atrás hacia Budget Master">
          <ArrowBackIosNewOutlinedIcon />
          Volver atrás
        </GoBackAnchor>
        <Typography variant="h1">
          Bienvenido a
          {' '}
          <BrandTitle>
            Budget Master
          </BrandTitle>
        </Typography>
        <Description>Para probar la aplicación podemos cargar datos de prueba o puedes decidir crear todos los datos por ti mismo.</Description>
        <ActionsContainer>
          <ImageWithData src={tryAppWithDataImage} alt="Budget Master App with data screenshot" />
          <PrimaryButtonContainer>
            <PrimaryButton type="button" onClick={handleOwnData}>Usar mis propios datos</PrimaryButton>
          </PrimaryButtonContainer>
          <ImageWithNoData src={tryAppEmptyAccountImage} alt="Budget Master App with no data screenshot" />
          <SecondaryButtonContainer>
            <SecondaryButton type="button" onClick={handleSampleData}>Usar datos de muestra</SecondaryButton>
          </SecondaryButtonContainer>
        </ActionsContainer>
        <SkipStepButton variant="text" onClick={handleOwnData}>Omitir este paso</SkipStepButton>
      </Main>
    </>
  );
};

export { TryApp };
