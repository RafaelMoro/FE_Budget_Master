import styled from '@emotion/styled';
import { LinearProgress, Typography } from '@mui/material';
import {
  AppColors, Chip, PrimaryButton, responsiveBreakpoints,
} from '../../../styles';
import { ContentPlaceholderProps, ProgressProps } from './Budget.interface';
import { blinkAnimation } from '../../../styles/animations/blink';

export const BudgetContainer = styled.div`
  padding: 3rem;
  max-width: 35rem;
  background-color: ${AppColors.white};
  box-shadow: 0 .4rem .8rem rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  &:hover {
      box-shadow: 0 .8rem 1.6rem 0 rgba(0, 0, 0, 0.2);
    }

  @media (${responsiveBreakpoints.desktop}) {
    max-width: 50rem;
  }
`;

export const ErrorContainer = styled.div`
  margin-top: 3rem;
`;

export const ContentPlaceholder = styled('div', { shouldForwardProp: (props) => props !== 'isTwoColumns' })`
  width: 100%;
  height: 2rem;
  background-color: ${AppColors.grey};
  border-radius: 10px;
  ${({ isTwoColumns }: ContentPlaceholderProps) => (isTwoColumns && 'grid-column: 1 / 3;')}
  ${blinkAnimation}
`;

export const BudgetsTitle = styled(Typography)`
  grid-column: 1 / 3;
  margin: 3rem 0;
`;

export const CreateBudgetButton = styled(PrimaryButton)`
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  justify-self: end;
  max-height: 4.4rem;
`;

export const Title = styled(Typography)`
  grid-column: 1 / 3;
  cursor: pointer;
  transition: 0.3s color;

  :hover {
    color: ${AppColors.primary};
  }
`;

export const TextTwoColumns = styled(Typography)`
  grid-column: 1 / 3;
`;

export const BudgetChip = styled(Chip)`
  background-color: ${AppColors.white};
  color: ${AppColors.primary};
  border: 1px solid ${AppColors.primary};
  max-width: 13.5rem;
`;

export const Progress = styled(LinearProgress, { shouldForwardProp: (props) => props !== 'hasProgressMedium' && props !== 'hasProgressHigh' })`
  grid-column: 1 / 3;
  span {
    background-color: ${AppColors.positive};
    ${({ hasProgressMedium }: ProgressProps) => hasProgressMedium && `background-color: ${AppColors.warning};`}
    ${({ hasProgressHigh }: ProgressProps) => hasProgressHigh && `background-color: ${AppColors.negative};`}
  }
`;

export const ProgressLabelContainer = styled.div`
  grid-column: 1 / 3;
  display: flex;
  justify-content: space-between;
`;

export const ProgressLabel = styled(Typography, { shouldForwardProp: (props) => props !== 'hasProgressMedium' && props !== 'hasProgressHigh' })`
  color: ${AppColors.positive};
    ${({ hasProgressMedium }: ProgressProps) => hasProgressMedium && `color: ${AppColors.warning};`}
    ${({ hasProgressHigh }: ProgressProps) => hasProgressHigh && `color: ${AppColors.negative};`}
`;
