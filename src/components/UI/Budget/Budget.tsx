import { Typography } from '@mui/material';
import { BudgetUI } from '../../../globalInterface';
import {
  BudgetContainer, BudgetChip, DateText, LimitText,
} from './Budget.styled';

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
    name, description, typeBudget, limitFormatted, startDateFormatted, endDateFormatted, period,
  } = budget;
  const dateText = `From ${startDateFormatted} to ${endDateFormatted}`;

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
      <BudgetChip label={typeBudget} />
      <BudgetChip label={period} />
      <Typography>{description}</Typography>

    </BudgetContainer>
  );
};

export { Budget };
