import { Drawer, Typography } from '@mui/material';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../../../../pages/RoutesConstants';
import { AppIcon } from '../../../../UI/Icons';
import { CloseIconButton, DrawerMenu, DrawerMenuLink } from '../../Header.styled';
import { useGuestUser } from '../../../../../hooks';
import { TransparentButton } from '../../../../../styles';

interface NotLoggedDrawerProps {
  open: boolean;
  toggleDrawer: () => void;
  handleGuestUser: () => void;
}
const NotLoggedDrawer = ({ open, toggleDrawer, handleGuestUser }: NotLoggedDrawerProps) => {
  const { isGuestUser } = useGuestUser();
  return (
    <Drawer anchor="bottom" open={open}>
      <DrawerMenu>
        <CloseIconButton onClick={toggleDrawer}>
          <AppIcon icon="Close" />
        </CloseIconButton>
        {
          (!isGuestUser) && (
            <>
              <DrawerMenuLink to={LOGIN_ROUTE}>
                <Typography>Log in</Typography>
              </DrawerMenuLink>
              <DrawerMenuLink to={REGISTER_ROUTE}>
                <Typography>Register</Typography>
              </DrawerMenuLink>
            </>
          )
        }
        {
          (isGuestUser) && (
            <TransparentButton onClick={handleGuestUser}>Get personalized experience</TransparentButton>
          )
        }
      </DrawerMenu>
    </Drawer>
  );
};

export { NotLoggedDrawer };
