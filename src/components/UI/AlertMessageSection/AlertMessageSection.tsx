import { Typography } from '@mui/material';
import { AppIcon } from '../Icons';
import { CloseIconButton, AlertMessageContainer, ErrorIconContainer } from './AlertMessageSection.styled';
import { AppColors } from '../../../styles';
import { AlertMessageSectionProps } from './AlertMessage.interface';

const AlertMessageSection = ({
  title, description, onClose, hideIcon, state = 'error',
}: AlertMessageSectionProps) => (
  <AlertMessageContainer state={state}>
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
  </AlertMessageContainer>
);

export { AlertMessageSection };
