import { AnchorButton, PrimaryButton, SecondaryButton } from '../../../styles';
import { Error } from '../../UI';
import { AnchorContainer } from './ResultFormAnimated.styled';

interface ErrorResultFormAnimatedProps {
  error: string;
  redirectRoute: string;
  secondaryButtonText: string;
  primaryButtonText: string;
  resetCounterView: () => void;
}

const ErrorResultFormAnimated = ({
  error, redirectRoute, secondaryButtonText, primaryButtonText, resetCounterView,
}: ErrorResultFormAnimatedProps) => (
  <Error description={error}>
    <AnchorContainer>
      <AnchorButton to={redirectRoute}>
        <SecondaryButton variant="contained" size="medium">{secondaryButtonText}</SecondaryButton>
      </AnchorButton>
      <PrimaryButton variant="contained" onClick={() => resetCounterView()} size="medium">{primaryButtonText}</PrimaryButton>
    </AnchorContainer>
  </Error>
);

export { ErrorResultFormAnimated };
