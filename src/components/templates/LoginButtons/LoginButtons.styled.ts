import styled from '@emotion/styled';
import {
  AnchorButton, AppColors, PrimaryButton, responsiveBreakpoints,
  SecondaryButton,
} from '../../../styles';
import { ButtonPanelLoginProps } from './interface';

export const LoginButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  margin-bottom: 3rem;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  order: 2;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const AnchorRegisterButton = styled(AnchorButton)`
  display: flex;
  order: 2;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    order: 2;
  }
`;

export const AnchorTryAppButton = styled(AnchorButton)`
  color: ${AppColors.black};
  border-bottom: 1px solid ${AppColors.black};
  max-width: 10rem;
  display: flex;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    order: 1;
  }
`;

export const PrimaryButtonLoginForm = styled(PrimaryButton, { shouldForwardProp: (props) => props !== 'minWidth' })`
  min-width: ${({ minWidth }: ButtonPanelLoginProps) => minWidth}rem;
  order: 1;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    order: 3;
  }

  &.Mui-disabled, &:disabled {
    background-color: ${AppColors.primary};
    color: ${AppColors.white};
    opacity: 0.7;
  }
`;

export const SecondaryButtonForm = styled(SecondaryButton, { shouldForwardProp: (props) => props !== 'minWidth' })`
  min-width: ${({ minWidth }: ButtonPanelLoginProps) => minWidth}rem;
`;
