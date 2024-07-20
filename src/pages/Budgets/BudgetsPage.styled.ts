import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { AppColors, Chip } from '../../styles';

export const Main = styled.main`
  min-height: 100vh;
  background-color: ${AppColors.bgColorWhite};
`;

export const LimitText = styled(Typography)`
  justify-self: end;
`;

export const DateText = styled(Typography)`
  grid-column: 1 / 3;
`;

export const BudgetChip = styled(Chip)`
  background-color: ${AppColors.primary};
  color: ${AppColors.white};
`;
