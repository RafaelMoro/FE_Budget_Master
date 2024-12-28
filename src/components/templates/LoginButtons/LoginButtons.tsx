import { REGISTER_ROUTE } from '../../../pages/RoutesConstants';
import { AppColors } from '../../../styles';
import { AppIcon } from '../../UI/Icons';
import { LoadingSpinner } from '../../UI/LoadingSpinner';
import {
  AnchorRegisterButton, ButtonContainer, PrimaryButtonLoginForm, SecondaryButtonForm,
} from './LoginButtons.styled';

interface LoginButtonsProps {
  submitForm: (() => Promise<void>) & (() => Promise<unknown>)
  cancelStateLink?: object;
  loading?: boolean;
  success?: boolean;
}

const LoginButtons = ({
  submitForm,
  cancelStateLink = {},
  loading = false,
  success = false,
}: LoginButtonsProps) => (
  <ButtonContainer>
    <AnchorRegisterButton to={REGISTER_ROUTE} state={cancelStateLink}>
      <SecondaryButtonForm minWidth="12" variant="contained" size="medium">Register</SecondaryButtonForm>
    </AnchorRegisterButton>
    <PrimaryButtonLoginForm
      data-testid="login-button"
      disabled={loading || success}
      minWidth="12"
      variant="contained"
      onClick={submitForm}
      size="medium"
    >
      { (loading && !success) && (<LoadingSpinner />) }
      { (!loading && success) && (<AppIcon icon="TickMark" fillColor={AppColors.white} />) }
      { (!loading && !success) && 'Login' }
    </PrimaryButtonLoginForm>
  </ButtonContainer>
);

export { LoginButtons };
