import styled from '@emotion/styled';
import { LinearProgress, Typography } from '@mui/material';
import { AppColors, Chip } from '../../../styles';
import { ProgressProps } from './Budget.interface';

export const BudgetContainer = styled.div`
  padding: 3rem;
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
`;

export const LimitText = styled(Typography)`
  justify-self: end;
`;

export const DateText = styled(Typography)`
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

export const ProgressLabel = styled(Typography)`
  color: ${AppColors.positive};
    ${({ hasProgressMedium }: ProgressProps) => hasProgressMedium && `color: ${AppColors.warning};`}
    ${({ hasProgressHigh }: ProgressProps) => hasProgressHigh && `color: ${AppColors.negative};`}
`;
