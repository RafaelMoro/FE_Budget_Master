import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import {
  AppColors, globalConfiguration, responsiveBreakpoints, TransparentButton,
} from '../../styles';

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
  font-size: ${globalConfiguration.mobile.fontSizes.H1} !important;
  font-weight: 400;

  @media ${responsiveBreakpoints.tablet} {
    font-size: ${globalConfiguration.tablet.fontSizes.H1};
  }
  @media ${responsiveBreakpoints.desktop} {
    font-size: ${globalConfiguration.desktop.fontSizes.H1} !important;
  }
`;

export const Description = styled(Typography)`
  max-width: 75ch;
`;

export const ActionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: "image-with-data"
  "primary-button"
  "image-with-no-data"
  "secondary-button";
  gap: 2rem;
  justify-items: center;

  img {
    width: 20rem;
    height: 100%;
    mask-image: linear-gradient(black 95%, transparent 100%);
  }

  @media (min-width: 768px) {
    place-items: center;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: "image-with-no-data image-with-data"
                          "primary-button secondary-button";
    img {
      width: 30rem;
    }
  }

  @media (min-width: 1024px) {
    img {
      width: 40rem;
    }
  }
`;

export const ImageWithData = styled.img`
  grid-area: image-with-data;
`;

export const ImageWithNoData = styled.img`
  grid-area: image-with-no-data;
`;

export const PrimaryButtonContainer = styled.div`
  grid-area: primary-button;
`;

export const SecondaryButtonContainer = styled.div`
  grid-area: secondary-button;
`;

export const SkipStepButton = styled(TransparentButton)`
  border-bottom: 1px solid ${AppColors.black};
  margin-bottom: 5rem;
`;
