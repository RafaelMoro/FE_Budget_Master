import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { TextWithMarginBottomProps } from './GraphicsCard.interface';

export const GraphicsCardContainer = styled.article`
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  gap: 2rem;
`;

export const NoRecordsGraphicsCardContainer = styled(GraphicsCardContainer)`
  padding: 4rem 2rem;
`;

export const TextWithMarginBottom = styled(Typography, { shouldForwardProp: (props) => props !== 'margin' })`
  margin-bottom: ${({ margin }: TextWithMarginBottomProps) => margin}rem;
`;
