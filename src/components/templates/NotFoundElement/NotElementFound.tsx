import { Typography } from '@mui/material';
import { Container, Picture } from './NotFound.styled';
import { PrimaryButton } from '../../../styles';
import noAccountsFoundPng from '../../../assets/no_accounts_found_png.png';
import noAccountsFoundWebp from '../../../assets/no_accounts_found_webp.webp';

interface NoAccountsFoundProps {
  description: string;
  buttonText: string;
  onClickCb: () => void;
}

const NotElementFound = ({ onClickCb, description, buttonText }: NoAccountsFoundProps) => (
  <Container>
    <Picture>
      <source srcSet={noAccountsFoundWebp} type="image/webp" />
      <img src={noAccountsFoundPng} alt="No Accounts Found" />
    </Picture>
    <Typography align="center" variant="body2">
      {description}
    </Typography>
    <PrimaryButton onClick={onClickCb}>{buttonText}</PrimaryButton>
  </Container>
);

export { NotElementFound };
