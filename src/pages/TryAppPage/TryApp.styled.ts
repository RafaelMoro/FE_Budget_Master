import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { AppColors, globalConfiguration, responsiveBreakpoints } from '../../styles';

export const Main = styled.main`
  margin-top: 5rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  min-height: 100vh;
  width: 100%;
  align-items: center;
`;

export const LogoTitleLogin = styled(Typography)`
  font-family: 'Russo One', sans-serif;
  color: ${AppColors.primary};
  display: inline;
  font-size: ${globalConfiguration.mobile.fontSizes.H1};
  font-weight: 400;

  @media ${responsiveBreakpoints.tablet} {
    font-size: ${globalConfiguration.tablet.fontSizes.H1};
  }
  @media ${responsiveBreakpoints.desktop} {
    font-size: ${globalConfiguration.desktop.fontSizes.H1};
  }
`;

export const Description = styled(Typography)`
  max-width: 75ch;
`;

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  img {
    width: 20rem;
    height: 100%;
    mask-image: linear-gradient(black 95%, transparent 100%);
  }

  @media (max-width: 768px) {
  }
`;
