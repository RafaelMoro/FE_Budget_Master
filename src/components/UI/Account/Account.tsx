import { IconButton, Typography } from '@mui/material';

import { AppIcon } from '../Icons';
import { AccountComponentProps } from './Account.interface';
import {
  AccountContainerColoroued, AccountTitle, AccountIconsContainer, SelectedTextBox,
} from './Account.styled';
import { AppColors } from '../../../styles';

const Account = ({
  account,
  selectAccountOnClick,
  openModifyAccountModal,
  openDeleteAccountModal,
}: AccountComponentProps) => {
  const {
    _id: accountId, title, accountType, selected, amountFormatted,
  } = account;

  return (
    <AccountContainerColoroued
      color={AppColors.white}
      selected={selected}
      onClick={selectAccountOnClick}
    >
      <AccountTitle variant="h4">{ title }</AccountTitle>
      <Typography>{ amountFormatted }</Typography>
      <AccountIconsContainer>
        <IconButton aria-label={`edit-button-account-${title}`} onClick={() => openModifyAccountModal(accountId)}>
          <AppIcon icon="Edit" fillColor={AppColors.bgColorDark} />
        </IconButton>
        <IconButton aria-label={`delete-button-account-${title}`} onClick={() => openDeleteAccountModal(accountId, title)}>
          <AppIcon icon="Delete" fillColor={AppColors.bgColorDark} />
        </IconButton>
      </AccountIconsContainer>
      <Typography>{ accountType }</Typography>
      { (selected) && (
        <SelectedTextBox backgroundColor={AppColors.black}>
          <Typography>Selected</Typography>
        </SelectedTextBox>
      ) }
    </AccountContainerColoroued>
  );
};

export { Account };
