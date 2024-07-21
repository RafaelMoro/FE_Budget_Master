import { IconButton, Typography } from '@mui/material';
import { AppIcon } from '../../../Icons';
import { BudgetUI } from '../../../../../globalInterface';
import { getRemainingDays } from '../../../../../utils';

interface BudgetDetailsDrawerProps {
  dateText: string;
  toggleDrawer: () => void;
  budget: BudgetUI;
}

const BudgetDetailsDrawer = ({ toggleDrawer, budget, dateText }: BudgetDetailsDrawerProps) => {
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
    </>
  );
};

export { BudgetDetailsDrawer };
