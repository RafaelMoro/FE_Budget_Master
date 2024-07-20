import { Drawer, Typography } from '@mui/material';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../../../../pages/RoutesConstants';
import { AppIcon } from '../../../../UI/Icons';
import { CloseIconButton, DrawerMenu, DrawerMenuLink } from '../../Header.styled';

interface NotLoggedDrawerProps {
  open: boolean;
  toggleDrawer: () => void;
}

const NotLoggedDrawer = ({ open, toggleDrawer }: NotLoggedDrawerProps) => (
  <Drawer anchor="bottom" open={open}>
    <DrawerMenu>
      <CloseIconButton onClick={toggleDrawer}>
        <AppIcon icon="Close" />
      </CloseIconButton>
      <DrawerMenuLink to={LOGIN_ROUTE}>
        <Typography>Log in</Typography>
      </DrawerMenuLink>
      <DrawerMenuLink to={REGISTER_ROUTE}>
        <Typography>Register</Typography>
      </DrawerMenuLink>
    </DrawerMenu>
  </Drawer>
);

export { NotLoggedDrawer };
