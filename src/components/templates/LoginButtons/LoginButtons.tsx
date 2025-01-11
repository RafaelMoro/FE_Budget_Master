import { REGISTER_ROUTE, TRY_APP_ROUTE } from '../../../pages/RoutesConstants';
import { AppColors, TransparentButton } from '../../../styles';
import { AppIcon } from '../../UI/Icons';
import { LoadingSpinner } from '../../UI/LoadingSpinner';
import {
  AnchorRegisterButton, AnchorTryAppButton, ButtonContainer, LoginButtonsContainer, PrimaryButtonLoginForm, SecondaryButtonForm,
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
  <LoginButtonsContainer>
    <ButtonContainer>
      <AnchorRegisterButton to={REGISTER_ROUTE} state={cancelStateLink} title="Register into Budget Master">
        <SecondaryButtonForm minWidth="12" variant="contained" size="medium">Registrarse</SecondaryButtonForm>
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
        { (!loading && !success) && 'Iniciar sesión' }
      </PrimaryButtonLoginForm>
    </ButtonContainer>
    <AnchorTryAppButton to={TRY_APP_ROUTE} title="Probar aplicación en su forma gratuita" state={cancelStateLink}>
      <TransparentButton>Probar gratis</TransparentButton>
    </AnchorTryAppButton>
  </LoginButtonsContainer>
);

export { LoginButtons };
