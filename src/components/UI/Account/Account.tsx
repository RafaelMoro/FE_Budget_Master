import { IconButton } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';

import { IAccountProps } from './interface';
import { formatNumberToCurrency } from '../../../utils/FormatNumberToCurrency';
import { BackgroundColors, TextColors, Paragraph } from '../../../styles';
import { AccountContainerColoroued, AccountTitle } from './Account.styled';

const Account = ({
  title,
  amount,
  accountType,
  backgroundColor,
  color,
  selected = false,
  openModifyAccountModal,
}: IAccountProps) => {
  const amountFormatted: string = formatNumberToCurrency(amount as number);
  const newBgColor = BackgroundColors[backgroundColor];
  const newColor = TextColors[color];

  return (
    <AccountContainerColoroued backgroundColor={newBgColor} color={newColor} selected={selected}>
      <AccountTitle>{ title }</AccountTitle>
      <Paragraph>{ amountFormatted }</Paragraph>
      <IconButton onClick={openModifyAccountModal}>
        <EditOutlined sx={{ fontSize: '2.5rem', fill: newColor }} />
      </IconButton>
      <Paragraph>{ accountType }</Paragraph>
    </AccountContainerColoroued>
  );
};

export { Account };
