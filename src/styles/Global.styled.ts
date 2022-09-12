import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Button, TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField';

import { IGlobalConfiguration } from './interface';

export const GlobalStyles = css`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  html {
    font-size: 62.5%;
  }
  body {
    font-family: 'Roboto', sans-serif;
  }
  h1, h2, h3, p {
    line-height: 1.5;
  }
`;

export const appColors = {
  primary: '#E6991E',
  secondary: '#EAB765',
  white: '#FAF8F6',
  black: '#1D1305',
  positive: '#35E6DB',
  negative: '#E65A12',
  bgColorLight: '#F5EFE5',
  bgColorDark: '#66440D',
  grey: '#9F9B94',
  subtitleColor: '#B5BFCA',
};

export const GlobalConfiguration: IGlobalConfiguration = {
  mobile: {
    fontSizes: {
      H1: '2.2rem',
      H2: '2rem',
      H3: '1.7rem',
      P: '1.6rem',
      Sub: '1.4rem',
    },
  },
  tablet: {
    fontSizes: {
      H1: '2.4rem',
      H2: '2.2rem',
      H3: '2rem',
      P: '1.6rem',
      Sub: '1.5rem',
    },
  },
  desktop: {
    fontSizes: {
      H1: '3.2rem',
      H2: '2.8rem',
      H3: '2.4rem',
      P: '1.8rem',
      Sub: '1.6rem',
    },
  },
};

export const PrimaryButton = styled(Button)`
  font-size: ${GlobalConfiguration.mobile.fontSizes.P};
  background-color: ${appColors.primary};

  &:hover {
    background-color: ${appColors.bgColorDark};
  }

  @media (min-width: 480px) {
    font-size: ${GlobalConfiguration.tablet.fontSizes.P};
  }
  @media (min-width: 1024px) {
    font-size: ${GlobalConfiguration.desktop.fontSizes.P};
  }
`;

export const Heading1 = styled.h1`
  font-size: ${GlobalConfiguration.mobile.fontSizes.H1};
  font-weight: bold;

  @media (min-width: 480px) {
    font-size: ${GlobalConfiguration.tablet.fontSizes.H1};
  }
  @media (min-width: 1024px) {
    font-size: ${GlobalConfiguration.desktop.fontSizes.H1};
  }
`;

export const Paragraph = styled.p`
font-size: ${GlobalConfiguration.mobile.fontSizes.Sub};

@media (min-width: 480px) {
  font-size: ${GlobalConfiguration.tablet.fontSizes.Sub};
}
@media (min-width: 1024px) {
  font-size: ${GlobalConfiguration.desktop.fontSizes.Sub};
}
`;

export const InputForm = styled(TextField)<TextFieldProps>`
  input {
    font-size: ${GlobalConfiguration.mobile.fontSizes.P};
  }
  label {
    font-size: ${GlobalConfiguration.mobile.fontSizes.P};
  }
  @media (min-width: 480px) {
    input {
    font-size: ${GlobalConfiguration.tablet.fontSizes.P};
    }
    label {
      font-size: ${GlobalConfiguration.tablet.fontSizes.P};
    }
  }
  @media (min-width: 1024px) {
    input {
    font-size: ${GlobalConfiguration.desktop.fontSizes.P};
    }
    label {
      font-size: ${GlobalConfiguration.desktop.fontSizes.P};
    }
  }
`;
