import styled from '@emotion/styled';
import {
  AnchorButton, AppColors, PrimaryButton, responsiveBreakpoints,
  SecondaryButton,
} from '../../../styles';
import { ButtonPanelLoginProps } from './interface';

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const AnchorRegisterButton = styled(AnchorButton)`
  display: flex;
  order: 2;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    order: 1;
  }
`;

export const PrimaryButtonLoginForm = styled(PrimaryButton, { shouldForwardProp: (props) => props !== 'minWidth' })`
  min-width: ${({ minWidth }: ButtonPanelLoginProps) => minWidth}rem;
  order: 1;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    order: 2;
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
