import { IconButton, List, Typography } from '@mui/material';
import { AppIcon } from '../../../Icons';
import { BudgetUI } from '../../../../../globalInterface';
import { getRemainingDays } from '../../../../../utils';
import { ProgressBudget } from '../ProgressBudget';
import { BudgetChip } from '../../Budget.styled';

interface BudgetDetailsDrawerProps {
  budget: BudgetUI;
  dateText: string;
  progress: number;
  toggleDrawer: () => void;
}

const BudgetDetailsDrawer = ({
  toggleDrawer, budget, dateText, progress,
}: BudgetDetailsDrawerProps) => {
  const restingDays = getRemainingDays(budget.endDate);

  return (
    <>
      <IconButton onClick={toggleDrawer}>
        <AppIcon icon="Close" />
      </IconButton>
      <Typography>{dateText}</Typography>
      <Typography>
        {restingDays}
        {' '}
        days left
      </Typography>
      <Typography variant="h4">{budget.name}</Typography>
      <Typography>
        Limit:
        {' '}
        {budget.limitFormatted}
      </Typography>
      <ProgressBudget currentAmountFormatted={budget.currentAmountFormatted} progress={progress} />
      <Typography>{budget.description}</Typography>
      <BudgetChip label={budget.typeBudget} />
      <BudgetChip label={budget.period} />
      { /** @TODO: Make every list item as collapsable to see records in budget history */ }
      { (budget.typeBudget === 'periodic' && budget.previousPeriods.length > 0) && (
        <>
          <Typography>Previous periods: </Typography>
          <List>
            { budget.previousPeriods.map((period) => (
              <Typography key={period}>{period}</Typography>
            )) }
          </List>
        </>
      ) }
    </>
  );
};

export { BudgetDetailsDrawer };
