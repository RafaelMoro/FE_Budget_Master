import styled from '@emotion/styled';
import { IconButton, Typography } from '@mui/material';
import { AppColors } from '../../../styles';

export const Main = styled.main`
  display: grid;
  padding: 1rem;
  gap: 1rem;
  max-width: 90rem;
  margin: 0 auto;
`;

export const GoBackIconButton = styled(IconButton)`
  color: ${AppColors.grey};
  justify-self: end;
`;

export const CreateBudgeTitle = styled(Typography)`
  margin-bottom: 3rem;
`;
