import styled from '@emotion/styled';
import { CardActions, Typography } from '@mui/material';

import {
  AppColors, InputForm, Paragraph, Anchor,
} from '../../../styles';

export const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  display: grid;
  gap: 2rem;
  grid-template-rows: 40% 60%;
  place-items: center;
`;

export const LogoContainer = styled.div`
  align-self: self-end;
  display: grid;
  gap: 1rem;
  place-items: center;
`;

export const LoginCard = styled.div`
  min-width: 27.5rem;
  align-self: start;
  @media (min-width: 480px) {
    min-height: 45rem;
    width: 45rem;
    padding: 3rem;
    box-shadow: 0 .4rem .8rem rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 1.5rem;
    &:hover {
      box-shadow: 0 .8rem 1.6rem 0 rgba(0, 0, 0, 0.2);
    }
  }
`;

export const FormLoginTitle = styled(Typography)`
  text-align: center;
  margin-bottom: 2rem;
`;

// TODO: change to body2
export const FormInstructions = styled(Paragraph)`
  color: ${AppColors.subtitleColor};
  margin-bottom: 1rem;
`;

export const LoginInput = styled(InputForm)`
  margin: 1rem 0;
`;

export const ForgotPasswordLink = styled(Anchor)`
  display: block;
  padding: 2rem 0;
`;

export const LoginCardActions = styled(CardActions)`
  display: flex;
  justify-content: space-between;
`;
