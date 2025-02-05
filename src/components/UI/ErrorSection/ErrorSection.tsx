import { Typography } from '@mui/material';
import { AppIcon } from '../Icons';
import { CloseIconButton, ErrorContainer } from './ErrorSection.styled';

interface ErrorSectionProps {
  title?: string;
  hideIcon?: boolean;
  description: string;
  onClose: () => void;
}

const ErrorSection = ({
  title, description, onClose, hideIcon,
}: ErrorSectionProps) => (
  <ErrorContainer>
    <CloseIconButton aria-label="boton-cerrar-error" onClick={onClose}>
      <AppIcon icon="Close" />
    </CloseIconButton>
    { !hideIcon && (<AppIcon icon="Error" size="4.5rem" />) }
    { title && (<Typography variant="h4" align="center">{title}</Typography>) }
    <Typography>{description}</Typography>
  </ErrorContainer>
);

export { ErrorSection };
