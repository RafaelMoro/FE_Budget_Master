import styled from '@emotion/styled';
import { IconButton, Typography } from '@mui/material';
import { responsiveBreakpoints } from '../../../../../styles';

export const DrawerContainer = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 2rem;

  @media ${responsiveBreakpoints.tablet} {
    min-width: 40rem;
  }

  @media ${responsiveBreakpoints.desktop} {
    min-width: 60rem;
  }
`;

export const DrawerCloseIconButton = styled(IconButton)`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  justify-self: end;
`;

export const BudgetDateDrawer = styled(Typography)`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  align-self: center;
  justify-self: center;
`;

export const IconsContainer = styled.div`
  grid-column: 1 / 3;
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 4rem;

`;

export const Title = styled(Typography)`
  grid-column: 1 / 3;
`;

export const DaysLeftText = styled(Typography)`
  justify-self: end;
`;
