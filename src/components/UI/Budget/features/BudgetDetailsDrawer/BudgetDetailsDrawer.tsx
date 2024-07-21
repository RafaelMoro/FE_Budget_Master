import { IconButton, Typography } from '@mui/material';
import { AppIcon } from '../../../Icons';
import { BudgetUI } from '../../../../../globalInterface';

interface BudgetDetailsDrawerProps {
  dateText: string;
  toggleDrawer: () => void;
  budget: BudgetUI;
}

const BudgetDetailsDrawer = ({ toggleDrawer, budget, dateText }: BudgetDetailsDrawerProps) => (
  <>
    <IconButton onClick={toggleDrawer}>
      <AppIcon icon="Close" />
    </IconButton>
    <Typography>{dateText}</Typography>
    <Typography variant="h4">{budget.name}</Typography>
  </>
);

export { BudgetDetailsDrawer };
