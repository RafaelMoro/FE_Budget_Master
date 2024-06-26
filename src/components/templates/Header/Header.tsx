import { Drawer, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

import { useLogin } from '../../../hooks/useLogin';
import { useAppSelector } from '../../../redux/hooks';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../../pages/RoutesConstants';
import { HeaderProps } from './interface';
import { AppIcon } from '../../UI/Icons';
import { BrandLogoName } from '../BrandLogoName';
import {
  CloseIconButton, DrawerMenu, DrawerMenuLink, GuestUserButton, HeaderContainer, HeaderShadow,
} from './Header.styled';
import { GuestUserModal } from './GuestUserModal';

const Header = ({ isLandingPage = false }: HeaderProps) => {
  const { signOut } = useLogin();
  const hasSignedOn = useAppSelector((state) => state.userInterface.hasSignedOn);
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';

  const [openHamburguerDrawer, setOpenHamburguerDrawer] = useState(false);
  const [openGuestUserModal, setOpenGuestUserModal] = useState(false);
  const toggleGuestUserModal = () => setOpenGuestUserModal((prevState) => !prevState);
  const toggleHamburguerDrawer = () => setOpenHamburguerDrawer((prevState) => !prevState);

  return (
    <>
      <HeaderShadow isLandingPage={isLandingPage}>
        <HeaderContainer>
          <BrandLogoName isLandingPage={isLandingPage} />
          { (windowSize === 'Desktop' && hasSignedOn) && (<Typography variant="h3">Account management</Typography>) }
          { (hasSignedOn) && (
            <IconButton aria-label="sign-out-button" onClick={signOut}>
              <AppIcon icon="LogOut" />
            </IconButton>
          ) }
          { (!hasSignedOn && !isMobile) && (
            <GuestUserButton variant="text" size="medium" onClick={toggleGuestUserModal}>Get Personalized Experience</GuestUserButton>
          )}
          { (!hasSignedOn && isMobile) && (
            <IconButton onClick={toggleHamburguerDrawer}>
              <AppIcon icon="HamburguerMenu" />
            </IconButton>
          )}
        </HeaderContainer>
      </HeaderShadow>
      <Drawer anchor="bottom" open={openHamburguerDrawer}>
        <DrawerMenu>
          <CloseIconButton onClick={toggleHamburguerDrawer}>
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
      <GuestUserModal open={openGuestUserModal} onClose={toggleGuestUserModal} />
    </>
  );
};

export { Header };
