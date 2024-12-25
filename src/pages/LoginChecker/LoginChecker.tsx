import { Typography } from '@mui/material';
import { Main } from './LoginChecker.styled';
import { BrandTitle } from '../../styles';

const LoginChecker = () => {
  const checkLogin = () => {};

  return (
    <Main>
      <Typography variant="h1">
        Bienvenido a
        {' '}
        <BrandTitle>
          Budget Master
        </BrandTitle>
      </Typography>
      <Typography>Revisando si ya ha iniciado sesión...</Typography>
    </Main>
  );
};

export { LoginChecker };
