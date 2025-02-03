import styled from '@emotion/styled';
import {
  ListItemText,
} from '@mui/material';
import { appTheme } from '../../../styles/theme';
import { AppColors } from '../../../styles';

export const SubcategoryText = styled(ListItemText)`
  padding: ${appTheme.spacing(2)};
  padding-left: ${appTheme.spacing(4)};
  color: ${AppColors.subtitleColor};
`;

export const CategoryText = styled(ListItemText)`
  font-weight: 500;
`;
