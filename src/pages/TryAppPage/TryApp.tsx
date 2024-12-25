import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { DASHBOARD_ROUTE } from '../RoutesConstants';
import { PrimaryButton, SecondaryButton } from '../../styles';
import { ButtonContainer, Description, Main } from './TryApp.styled';

const TryApp = () => {
  const navigate = useNavigate();
  const handleClickSampleData = () => navigate(DASHBOARD_ROUTE);

  return (
    <Main>
      <Typography variant="h1">Bienvenido a Budget Master</Typography>
      <Description>Para probar la aplicación podemos cargar datos de prueba o puedes decidir crear todos los datos por ti mismo.</Description>
      <ButtonContainer>
        <SecondaryButton type="button" onClick={handleClickSampleData}>Usar datos de muestra</SecondaryButton>
        <PrimaryButton type="button" onClick={handleClickSampleData}>Usar mis propios datos</PrimaryButton>
      </ButtonContainer>
    </Main>
  );
};

export { TryApp };
