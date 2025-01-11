import styled from '@emotion/styled';
import { Form } from 'formik';

import { Typography } from '@mui/material';
import { appTheme } from '../../../styles/theme';
import { responsiveBreakpoints } from '../../../styles';

export const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: grid;
  place-content: center;
`;

export const MainContainer = styled.article`
  display: grid;
  grid-template-rows: 10rem 10rem 1fr;
  gap: ${appTheme.spacing(4)};

  @media ${responsiveBreakpoints.tablet} {
    max-width: 50rem;
    gap: ${appTheme.spacing(5)};
  }

  @media ${responsiveBreakpoints.desktop} {
    max-width: 50rem;
    gap: ${appTheme.spacing(6)};
  }
`;

export const FormTitle = styled(Typography)`
  text-align: center;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    text-align: center;
  }
`;

export const FormDescription = styled(Typography)`
  padding-left: 2rem;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    padding-left: 0;
  }
`;

export const FormContainer = styled(Form)`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: ${appTheme.spacing(4)};
  justify-items: center;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    padding: 0;
    gap: ${appTheme.spacing(5)};
  }
`;
