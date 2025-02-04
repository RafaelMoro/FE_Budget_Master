import styled from '@emotion/styled';
import {
  ListItemText, IconButton,
} from '@mui/material';
import { appTheme } from '../../../styles/theme';
import { AppColors } from '../../../styles';

export const CategoriesDialogContainer = styled.div`
  display: grid;
  padding: ${appTheme.spacing(3)};
  grid-template-columns: 1fr;
  gap: ${appTheme.spacing(3)};
`;

export const CloseIconButton = styled(IconButton)`
  justify-self: end;
  grid-row: 1 / 2;
`;

export const GoBackIconButton = styled(IconButton)`
  justify-self: start;
  grid-row: 1 / 2;
`;

export const SubcategoryText = styled(ListItemText)`
  padding: ${appTheme.spacing(2)};
  padding-left: ${appTheme.spacing(4)};
  color: ${AppColors.subtitleColor};
`;

export const CategoryText = styled(ListItemText)`
  font-weight: 500;
`;
