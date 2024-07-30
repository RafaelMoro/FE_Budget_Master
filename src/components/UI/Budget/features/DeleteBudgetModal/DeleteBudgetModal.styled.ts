import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { ErrorParagraphValidation } from '../../../../../styles';

export const Container = styled.div`
  padding: 3rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
`;

export const Title = styled(Typography)`
  grid-column: 1 / 3;
`;

export const WarnText = styled(ErrorParagraphValidation)`
  grid-column: 1 / 3;
  text-align: center;
`;
