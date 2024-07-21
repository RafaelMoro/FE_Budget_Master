import styled from '@emotion/styled';
import { IconButton, Typography } from '@mui/material';

export const DrawerContainer = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 2rem;
`;

export const DrawerCloseIconButton = styled(IconButton)`
  grid-column: 1 / 3;
  justify-self: end;
`;
export const Title = styled(Typography)`
  grid-column: 1 / 3;
  margin-bottom: 4rem;
`;

export const DaysLeftText = styled(Typography)`
  justify-self: end;
`;
