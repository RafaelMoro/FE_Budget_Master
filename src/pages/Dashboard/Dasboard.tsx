import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotification } from '../../hooks/useNotification';
import { useDashboardActions } from '../../components/UI/SpeedDial/useDashboardActions';
import { useAppSelector } from '../../redux/hooks';
import { ViewAccounts } from '../../components/UI/Account';
import {
  Notification, ReactHelmet, RecordList, SpeedDial,
} from '../../components/UI';
import { Header } from '../../components/templates/Header';
import { useBackToTopButton } from '../../hooks/useBackToTopButton';
import { useSyncLoginInfo } from '../../hooks/useSyncLoginInfo';
import { BackToTopButton } from '../../components/UI/BackToTopButton';
import {
  DashboardContainer, RecordsBox,
} from './Dashboard.styled';
import { useResizeWindow } from '../../hooks/useResizeWindow';
import { useLogin } from '../../hooks/useLogin';
import { useGuestUser } from '../../hooks';
import { DASHBOARD_COMPLETE_ROUTE, LOGIN_ROUTE } from '../RoutesConstants';
import { DASHBOARD_META_DESCRIPTION, DASHBOARD_META_TITLE } from '../../constants';

const Dashboard = () => {
  const navigate = useNavigate();
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const accountsUI = useAppSelector((state) => state.accounts.accounts);
  const {
    globalNotification, toggleGlobalNotification,
  } = useNotification();
  const { visible, scrollToTop, toggleVisibleDesktop } = useBackToTopButton({ windowSize });
  const { isEmptyLocalStorage, verifyGuestUser } = useSyncLoginInfo();
  const { isGuestUser, userLoggedOn } = useGuestUser();
  const { signOut } = useLogin();

  if (isEmptyLocalStorage) signOut();

  useEffect(() => {
    verifyGuestUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userLoggedOn === false && isGuestUser === false) {
      navigate(LOGIN_ROUTE);
    }
  }, [userLoggedOn, isGuestUser, navigate]);

  const { dashboardActions, accountActions } = useDashboardActions({
    // Set it as true if accountsUI array has more than 1 item.
    hideChangeAccount: ((accountsUI && accountsUI.length < 2) || windowSize !== 'Mobile'),
    // Set it as true if accountsUI array is empty
    hideAddRecord: (accountsUI && accountsUI.length === 0),
  });
  const { handleOpenCreateAccount } = accountActions;

  const noAccountsCreated = accountsUI && accountsUI.length === 0;
  useResizeWindow();

  return (
    <>
      <ReactHelmet metaTitle={DASHBOARD_META_TITLE} metaDescription={DASHBOARD_META_DESCRIPTION} completeURL={DASHBOARD_COMPLETE_ROUTE} />
      <Header />
      <DashboardContainer>
        {globalNotification.showNotification && (
          <Notification
            title={globalNotification.title}
            description={globalNotification.description}
            status={globalNotification.status}
            close={toggleGlobalNotification}
          />
        )}
        <ViewAccounts hide={noAccountsCreated} accountsActions={accountActions} />
        <RecordsBox id="record-box" onScroll={toggleVisibleDesktop} noAccountsCreated={noAccountsCreated}>
          <RecordList handleOpenCreateAccount={handleOpenCreateAccount} />
        </RecordsBox>
        <SpeedDial
          actions={dashboardActions}
          ariaLabelDescription="SpeedDial Accounts and Records actions"
        />
        { (visible) && (<BackToTopButton scrollToTop={scrollToTop} />) }
      </DashboardContainer>
    </>
  );
};

export { Dashboard };
