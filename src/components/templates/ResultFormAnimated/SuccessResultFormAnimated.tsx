import { CheckCircleOutlineOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { MessageContainer } from './ResultFormAnimated.styled';
import { AnchorButton, AppColors, PrimaryButton } from '../../../styles';

const {
  positive,
} = AppColors;

interface SuccessResultFormAnimatedProps {
  title: string;
  buttonText: string;
  redirectRoute: string;
}

const SuccessResultFormAnimated = ({ title, buttonText, redirectRoute }: SuccessResultFormAnimatedProps) => (
  <MessageContainer>
    <CheckCircleOutlineOutlined sx={{ fontSize: '4.5rem', fill: positive }} />
    <Typography>{title}</Typography>
    <AnchorButton padding="6rem 0 0 0" to={redirectRoute}>
      <PrimaryButton variant="contained" size="medium">{buttonText}</PrimaryButton>
    </AnchorButton>
  </MessageContainer>
);

export { SuccessResultFormAnimated };
