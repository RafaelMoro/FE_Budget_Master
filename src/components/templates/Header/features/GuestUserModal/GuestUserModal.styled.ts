import { IconButton, Typography } from '@mui/material';
import styled from '@emotion/styled';

import { CancelButton, responsiveBreakpoints } from '../../../../../styles';
import { appTheme } from '../../../../../styles/theme';

export const EraseButton = styled(CancelButton)`
  max-height: 4.6rem;
`;

export const Title = styled(Typography)`
  justify-self: center;
  align-self: center;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }
`;

export const CloseModalBox = styled(IconButton)`
  justify-self: end;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }
`;

export const ModalBox = styled.div`
  padding: 3rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${appTheme.spacing(4)};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${appTheme.spacing(5)};

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    flex-direction: row;
  }
`;

export const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${appTheme.spacing(3)};

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    flex-direction: row;
  }
`;
