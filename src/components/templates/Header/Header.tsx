import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppSelector } from '../../../redux/hooks';
import { useLogin, useGuestUser } from '../../../hooks';
import {
  BUDGETS_ROUTE, DASHBOARD_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE,
} from '../../../pages/RoutesConstants';
import { HeaderProps } from './Header.interface';

import { AppIcon } from '../../UI/Icons';
import { BrandLogoName } from '../BrandLogoName';
import { GuestUserModal, LoggedUserDrawer, NotLoggedDrawer } from './features';
import {
  AnchorButton, AppColors, FlexContainer, PrimaryButton, SecondaryButton,
} from '../../../styles';
import {
  GuestUserButton, HeaderContainer, HeaderNav, HeaderNavAnchor, HeaderShadow,
} from './Header.styled';

const Header = ({ isLandingPage = false }: HeaderProps) => {
  const location = useLocation();
  const { signOut } = useLogin();
  const { isGuestUser, userLoggedOn } = useGuestUser();
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';

  const [openNotLoggedDrawer, setOpenNotLoggedDrawer] = useState(false);
  const [openLoggedDrawer, setOpenLoggedDrawer] = useState(false);
  const [openGuestUserModal, setOpenGuestUserModal] = useState(false);
  const toggleGuestUserModal = () => setOpenGuestUserModal((prevState) => !prevState);
  const toggleNotLoggedDrawer = () => setOpenNotLoggedDrawer((prevState) => !prevState);
  const toggleLoggedDrawer = () => setOpenLoggedDrawer((prevState) => !prevState);
  const toggleHamburguerMenu = !isGuestUser && userLoggedOn ? toggleLoggedDrawer : toggleNotLoggedDrawer;

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
          { (isMobile) && (
            <IconButton data-testid="hamburguer-menu-header" onClick={toggleHamburguerMenu}>
              <AppIcon icon="HamburguerMenu" fillColor={isLandingPage ? AppColors.white : AppColors.primary} />
            </IconButton>
          )}
        </HeaderContainer>
      </HeaderShadow>
      <NotLoggedDrawer open={openNotLoggedDrawer} toggleDrawer={toggleNotLoggedDrawer} />
      <LoggedUserDrawer open={openLoggedDrawer} toggleDrawer={toggleLoggedDrawer} signOut={signOut} />
      <GuestUserModal open={openGuestUserModal} onClose={toggleGuestUserModal} />
    </>
  );
};

export { Header };
