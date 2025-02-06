import styled from '@emotion/styled';
import {
  ListItemText, IconButton,
  Typography,
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
  grid-column: 1 / 2;
`;

export const GoBackIconButton = styled(IconButton)`
  justify-self: start;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
`;

export const SubcategoryText = styled(ListItemText)`
  padding: ${appTheme.spacing(2)};
  padding-left: ${appTheme.spacing(4)};
  color: ${AppColors.subtitleColor};
`;

export const WarningText = styled(Typography)`
  color: ${AppColors.negative};
  text-transform: uppercase;
`;

export const CategoryText = styled(ListItemText)`
  font-weight: 500;
`;

export const EditCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${appTheme.spacing(3)};
  justify-content: center;
  align-items: center;
`;

export const SubcategoryTitle = styled(Typography)`
  margin-top: ${appTheme.spacing(3)};
`;

export const SubcategoriesContainerChips = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${appTheme.spacing(2)};
`;

export const EditCategoryButtonContainer = styled.div`
  margin-top: ${appTheme.spacing(3)};
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
