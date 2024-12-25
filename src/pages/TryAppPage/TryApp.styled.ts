import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const Main = styled.main`
  margin-top: 5rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  min-height: 100vh;
  width: 100%;
  align-items: center;
`;

export const Description = styled(Typography)`
  max-width: 75ch;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
