import { Typography } from '@mui/material';
import { BudgetUI } from '../../../globalInterface';
import {
  BudgetContainer, BudgetChip, DateText, LimitText,
  Progress,
} from './Budget.styled';
import { calculateProgress } from './Budget.util';

/**
 * Todos:
 * Mostrar progress.
 *
*/

interface BudgetProps {
  budget: BudgetUI;
}

const Budget = ({
  budget,
}: BudgetProps) => {
  const {
    name, description, typeBudget, limit, currentAmount, limitFormatted, startDateFormatted, endDateFormatted, period,
  } = budget;
  const dateText = `From ${startDateFormatted} to ${endDateFormatted}`;
  const progress = calculateProgress({ limit, currentAmount });

  return (
    <BudgetContainer>
      <DateText variant="body2" align="center">
        {dateText}
      </DateText>
      <Typography variant="h4">{name}</Typography>
      <LimitText>
        Limit:
        {' '}
        {limitFormatted}
      </LimitText>
      <Progress variant="determinate" value={progress} />
      <BudgetChip label={typeBudget} />
      <BudgetChip label={period} />
      <Typography>{description}</Typography>

    </BudgetContainer>
  );
};

export { Budget };
