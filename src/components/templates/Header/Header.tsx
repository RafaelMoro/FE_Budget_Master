import { Drawer, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

import { useLocation } from 'react-router-dom';
import { useLogin, useGuestUser } from '../../../hooks';
import { useAppSelector } from '../../../redux/hooks';
import {
  BUDGETS_ROUTE, DASHBOARD_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE,
} from '../../../pages/RoutesConstants';
import { HeaderProps } from './Header.interface';

import { AppIcon } from '../../UI/Icons';
import { BrandLogoName } from '../BrandLogoName';
import { GuestUserModal } from './GuestUserModal';
import {
  CloseIconButton, DrawerMenu, DrawerMenuLink, GuestUserButton, HeaderContainer, HeaderNav, HeaderNavAnchor, HeaderShadow,
} from './Header.styled';
import {
  AnchorButton, AppColors, FlexContainer, PrimaryButton, SecondaryButton,
} from '../../../styles';

const Header = ({ isLandingPage = false }: HeaderProps) => {
  const location = useLocation();
  const { signOut } = useLogin();
  const { isGuestUser, userLoggedOn } = useGuestUser();
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';

  const [openHamburguerDrawer, setOpenHamburguerDrawer] = useState(false);
  const [openGuestUserModal, setOpenGuestUserModal] = useState(false);
  const toggleGuestUserModal = () => setOpenGuestUserModal((prevState) => !prevState);
  const toggleHamburguerDrawer = () => setOpenHamburguerDrawer((prevState) => !prevState);

  const activeDashboardPage = location.pathname === DASHBOARD_ROUTE;
  const activeBudgetsPage = location.pathname === BUDGETS_ROUTE;

  return (
    <>
      <HeaderShadow isLandingPage={isLandingPage}>
        <HeaderContainer>
          <BrandLogoName isLandingPage={isLandingPage} />
          { (windowSize === 'Desktop' && !isGuestUser && !isLandingPage) && (
            <HeaderNav>
              <HeaderNavAnchor active={activeDashboardPage} to={DASHBOARD_ROUTE}>Accounts</HeaderNavAnchor>
              <HeaderNavAnchor active={activeBudgetsPage} to="/budgets">Budgets</HeaderNavAnchor>
            </HeaderNav>
          ) }
          { (!isGuestUser && userLoggedOn) && (
            <IconButton aria-label="sign-out-button" onClick={signOut}>
              <AppIcon fillColor={isLandingPage ? AppColors.white : AppColors.primary} icon="LogOut" />
            </IconButton>
          ) }
          { (isGuestUser && !isMobile) && (
            <GuestUserButton
              isLandingPage={isLandingPage}
              variant="text"
              size="medium"
              onClick={toggleGuestUserModal}
            >
              Get Personalized Experience
            </GuestUserButton>
          )}
          { (!isGuestUser && !userLoggedOn && !isMobile) && (
            <FlexContainer gap={3} justifyContent="space-between">
              <AnchorButton to={LOGIN_ROUTE}>
                <SecondaryButton>Log in</SecondaryButton>
              </AnchorButton>
              <AnchorButton to={REGISTER_ROUTE}>
                <PrimaryButton>Register</PrimaryButton>
              </AnchorButton>
            </FlexContainer>
          ) }
          { (isMobile && !userLoggedOn) && (
            <IconButton onClick={toggleHamburguerDrawer}>
              <AppIcon icon="HamburguerMenu" fillColor={isLandingPage ? AppColors.white : AppColors.primary} />
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
