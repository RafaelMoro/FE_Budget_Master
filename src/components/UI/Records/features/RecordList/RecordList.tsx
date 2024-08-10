import { LoadingStatus } from '../LoadingStatus';
import { NotElementFound } from '../../../../templates/NotFoundElement';

import { useAppSelector } from '../../../../../redux/hooks';
import { useGuestUser } from '../../../../../hooks/useGuestUser/useGuestUser';
import { AppColors } from '../../../../../styles';
import { List } from '../../Records.styled';
import { OlderRecords } from '../OlderRecords';
import { LastMonthRecords } from '../LastMonthRecords';
import { CurrentMonthRecords } from '../CurrentMonthRecords';
import { TestChart } from '../../../Graphics/TestChart';

interface RecordListProps {
  handleOpenCreateAccount: () => void;
}

const RecordList = ({ handleOpenCreateAccount }: RecordListProps) => {
  const { isGuestUser } = useGuestUser();
  const accountsFetchStatus = useAppSelector((state) => state.accounts.accountsFetchStatus);

  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const accountId = selectedAccount?._id ?? '';

  const color = selectedAccount?.backgroundColorUI?.color ?? AppColors.black;

  if (accountsFetchStatus === 'isUninitialized' && !isGuestUser) {
    return (
      <LoadingStatus text="Waiting on the load of accounts..." />
    );
  }

  if (accountsFetchStatus === 'loading') {
    return (
      <LoadingStatus text="Loading accounts...." />
    );
  }

  if (accounts && accounts.length === 0) {
    return (
      <NotElementFound
        description="You have not created accounts yet. Start now!"
        buttonText="Create account"
        onClickCb={handleOpenCreateAccount}
      />
    );
  }

  return (
    <List>
      <TestChart />
      <CurrentMonthRecords
        color={color}
        accountId={accountId}
        isGuestUser={isGuestUser}
      />
      <LastMonthRecords
        color={color}
        accountId={accountId}
        isGuestUser={isGuestUser}
      />
      <OlderRecords
        color={color}
        accountId={accountId}
        isGuestUser={isGuestUser}
      />
    </List>
  );
};

export { RecordList };
