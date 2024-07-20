import { Divider, Drawer, Typography } from '@mui/material';
import { AppIcon } from '../../../../UI/Icons';
import {
  ActiveDrawerMenuLink,
  CloseIconButton, DrawerMenu,
} from '../../Header.styled';
import { TransparentButton } from '../../../../../styles';
import { BUDGETS_ROUTE, DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';

interface LoggedUserDrawerProps {
  open: boolean;
  activeDashboardPage: boolean;
  activeBudgetsPage: boolean;
  toggleDrawer: () => void;
  signOut: () => void;
}

const LoggedUserDrawer = ({
  open, activeBudgetsPage, activeDashboardPage, toggleDrawer, signOut,
}: LoggedUserDrawerProps) => (
  <Drawer anchor="bottom" open={open}>
    <DrawerMenu>
      <CloseIconButton onClick={toggleDrawer}>
        <AppIcon icon="Close" />
      </CloseIconButton>
      <ActiveDrawerMenuLink active={activeDashboardPage} to={DASHBOARD_ROUTE}>
        <Typography>Accounts</Typography>
      </ActiveDrawerMenuLink>
      <ActiveDrawerMenuLink active={activeBudgetsPage} to={BUDGETS_ROUTE}>
        <Typography>Budgets</Typography>
      </ActiveDrawerMenuLink>
      <Divider style={{ width: '100%' }} />
      <TransparentButton data-testid="log-out-button" onClick={signOut}>
        Log out
      </TransparentButton>
    </DrawerMenu>
  </Drawer>
);

export { LoggedUserDrawer };
