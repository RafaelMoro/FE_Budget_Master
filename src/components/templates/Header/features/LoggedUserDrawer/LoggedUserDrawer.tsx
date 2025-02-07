import {
  Divider, Drawer, ListItemText, Typography, List, ListItemButton,
  Collapse,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { useState } from 'react';
import { BUDGETS_ROUTE, DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { ICON_SIZE } from '../../../../../constants';
import { AppIcon } from '../../../../UI/Icons';
import {
  ActiveDrawerMenuLink,
  CloseIconButton, DrawerMenu,
} from '../../Header.styled';
import { TransparentButton } from '../../../../../styles';

interface LoggedUserDrawerProps {
  open: boolean;
  activeDashboardPage: boolean;
  activeBudgetsPage: boolean;
  toggleDrawer: () => void;
  signOut: () => void;
}

const LoggedUserDrawer = ({
  open, activeBudgetsPage, activeDashboardPage, toggleDrawer, signOut,
}: LoggedUserDrawerProps) => {
  const [openList, setOpenList] = useState(false);
  const handleClick = () => setOpenList((prevState) => !prevState);
  return (
    <Drawer anchor="bottom" open={open}>
      <DrawerMenu>
        <CloseIconButton onClick={toggleDrawer}>
          <AppIcon icon="Close" />
        </CloseIconButton>
        <List
          sx={{
            width: '100%', maxWidth: 360, bgcolor: 'background.paper', justifySelf: 'center',
          }}
          component="nav"
          aria-labelledby="nested-list-categories"
        >
          <ListItemButton onClick={handleClick}>
            <ListItemText primary="Navegación" />
            {openList ? <ExpandLess sx={ICON_SIZE} /> : <ExpandMore sx={ICON_SIZE} />}
          </ListItemButton>
          <Collapse in={openList} timeout="auto" unmountOnExit>
            <ActiveDrawerMenuLink active={activeDashboardPage} to={DASHBOARD_ROUTE}>
              <Typography>Accounts</Typography>
            </ActiveDrawerMenuLink>
            <ActiveDrawerMenuLink active={activeBudgetsPage} to={BUDGETS_ROUTE}>
              <Typography>Budgets</Typography>
            </ActiveDrawerMenuLink>
          </Collapse>
        </List>
        <Divider style={{ width: '100%' }} />
        <TransparentButton data-testid="log-out-button" onClick={signOut}>
          Log out
        </TransparentButton>
      </DrawerMenu>
    </Drawer>
  );
};

export { LoggedUserDrawer };
