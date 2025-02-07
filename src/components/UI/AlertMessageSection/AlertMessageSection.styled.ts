import styled from '@emotion/styled';
import { IconButton } from '@mui/material';

import { AlertStateProps } from './AlertMessage.interface';
import { appTheme } from '../../../styles/theme';
import { AppColors } from '../../../styles';

export const AlertMessageContainer = styled('section', { shouldForwardProp: (props) => props !== 'state' })`
  padding: ${appTheme.spacing(3)};;
  display: grid;
  gap: ${appTheme.spacing(3)};;
  grid-template-columns: 1fr;
  background-color: ${({ state }: AlertStateProps) => (state === 'error' ? AppColors.negativeLight : AppColors.warningLight)};
  color: ${AppColors.white};
`;

export const CloseIconButton = styled(IconButton)`
  justify-self: end;
  grid-row: 1 / 2;
`;

export const ErrorIconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
