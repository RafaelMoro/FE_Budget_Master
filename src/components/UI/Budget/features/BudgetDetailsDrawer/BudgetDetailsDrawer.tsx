import { IconButton } from '@mui/material';
import { AppIcon } from '../../../Icons';

interface BudgetDetailsDrawerProps {
  toggleDrawer: () => void
}

const BudgetDetailsDrawer = ({ toggleDrawer }: BudgetDetailsDrawerProps) => (
  <>
    <IconButton onClick={toggleDrawer}>
      <AppIcon icon="Close" />
    </IconButton>
    <p>Drawer</p>
  </>
);

export { BudgetDetailsDrawer };
