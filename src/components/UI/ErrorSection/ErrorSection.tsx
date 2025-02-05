import { Typography } from '@mui/material';
import { AppIcon } from '../Icons';
import { CloseIconButton, ErrorContainer, ErrorIconContainer } from './ErrorSection.styled';
import { AppColors } from '../../../styles';

interface ErrorSectionProps {
  description: string;
  onClose: () => void;
  title?: string;
  hideIcon?: boolean;
}

const ErrorSection = ({
  title, description, onClose, hideIcon,
}: ErrorSectionProps) => (
  <ErrorContainer>
    <CloseIconButton aria-label="boton-cerrar-error" onClick={onClose}>
      <AppIcon icon="Close" />
    </CloseIconButton>
    { !hideIcon && (
      <ErrorIconContainer>
        <AppIcon icon="Error" fillColor={AppColors.white} size="4.5rem" />
      </ErrorIconContainer>
    ) }
    { title && (<Typography variant="subtitle1" align="center">{title}</Typography>) }
    <Typography>{description}</Typography>
  </ErrorContainer>
);

export { ErrorSection };
