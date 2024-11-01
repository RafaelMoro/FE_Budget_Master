import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { TextWithMarginBottomProps } from './GraphicsCard.interface';
import { appTheme } from '../../../styles/theme';
import { AppColors } from '../../../styles';

export const GraphicsCardContainer = styled.article`
  width: 100%;
  padding: 2rem 0;
  margin-bottom: ${appTheme.spacing(4)};
  background-color: ${AppColors.white};
  transition: 0.3s;
  border-radius: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  gap: 2rem;
`;

export const NoRecordsGraphicsCardContainer = styled(GraphicsCardContainer)`
  padding: 4rem 2rem;
  margin-bottom: ${appTheme.spacing(4)};
`;

export const TextWithMarginBottom = styled(Typography, { shouldForwardProp: (props) => props !== 'margin' })`
  margin-bottom: ${({ margin }: TextWithMarginBottomProps) => margin}rem;
`;
