import { Drawer } from '@mui/material';
import { AppIcon } from '../../../../UI/Icons';
import { CloseIconButton, DrawerMenu } from '../../Header.styled';
import { TransparentButton } from '../../../../../styles';

interface LoggedUserDrawerProps {
  open: boolean;
  toggleDrawer: () => void;
  signOut: () => void
}

const LoggedUserDrawer = ({ open, toggleDrawer, signOut }: LoggedUserDrawerProps) => (
  <Drawer anchor="bottom" open={open}>
    <DrawerMenu>
      <CloseIconButton onClick={toggleDrawer}>
        <AppIcon icon="Close" />
      </CloseIconButton>
      <TransparentButton data-testid="log-out-button" onClick={signOut}>
        Log out
      </TransparentButton>
    </DrawerMenu>
  </Drawer>
);

export { LoggedUserDrawer };
