import { Typography } from '@mui/material';
import { BudgetUI } from '../../../globalInterface';
import { BudgetContainer } from './Budget.styled';
import { BudgetChip, DateText, LimitText } from '../../../pages/Budgets/BudgetsPage.styled';

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
  return (
    <BudgetContainer>
      <Typography variant="h4">{name}</Typography>
      <LimitText>
        Limit:
        {' '}
        {limitFormatted}
      </LimitText>
      <DateText>
        From
        {' '}
        {startDateFormatted}
        {' '}
        to
        {' '}
        {endDateFormatted}
      </DateText>
      <BudgetChip label={typeBudget} />
      <BudgetChip label={period} />
      <Typography>{description}</Typography>

    </BudgetContainer>
  );
};

export { Budget };
