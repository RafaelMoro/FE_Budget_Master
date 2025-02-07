import {
  Divider, Drawer, ListItemButton, Typography,
  ListItemText,
} from '@mui/material';

import { BUDGETS_ROUTE, DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { AppIcon } from '../../../../UI/Icons';
import {
  ActiveDrawerMenuLink,
  CloseIconButton, DrawerMenu,
} from '../../Header.styled';
import { TransparentButton } from '../../../../../styles';
import { UserDrawerList } from './UserDrawerList';

interface LoggedUserDrawerProps {
  open: boolean;
  activeDashboardPage: boolean;
  activeBudgetsPage: boolean;
  toggleDrawer: () => void;
  signOut: () => void;
  openCategoriesDialog: () => void;
}

const LoggedUserDrawer = ({
  open, activeBudgetsPage, activeDashboardPage, toggleDrawer, signOut, openCategoriesDialog,
}: LoggedUserDrawerProps) => (
  <Drawer anchor="bottom" open={open}>
    <DrawerMenu>
      <CloseIconButton onClick={toggleDrawer}>
        <AppIcon icon="Close" />
      </CloseIconButton>
      <UserDrawerList title="Navegación">
        <ActiveDrawerMenuLink active={activeDashboardPage} to={DASHBOARD_ROUTE}>
          <Typography>Accounts</Typography>
        </ActiveDrawerMenuLink>
        <ActiveDrawerMenuLink active={activeBudgetsPage} to={BUDGETS_ROUTE}>
          <Typography>Budgets</Typography>
        </ActiveDrawerMenuLink>
      </UserDrawerList>
      <UserDrawerList title="Configuración" open={false}>
        <ListItemButton onClick={openCategoriesDialog}>
          <ListItemText primary="Categorías" />
        </ListItemButton>
      </UserDrawerList>
      <Divider style={{ width: '100%' }} />
      <TransparentButton data-testid="log-out-button" onClick={signOut}>
        Log out
      </TransparentButton>
    </DrawerMenu>
  </Drawer>
);

export { LoggedUserDrawer };
