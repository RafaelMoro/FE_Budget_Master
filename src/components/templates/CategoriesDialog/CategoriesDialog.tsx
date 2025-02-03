import {
  Dialog, Typography,
} from '@mui/material';

import { AppIcon } from '../../UI/Icons';
import { CloseIconButton, CategoriesDialogContainer } from './CategoriesDialog.styled';
import { ShowCategories } from './ShowCategories';

interface CategoriesModalProps {
  open: boolean
  onClose: () => void
}

const CategoriesDialog = ({ open, onClose }: CategoriesModalProps) => (
  <Dialog onClose={onClose} open={open}>
    <CategoriesDialogContainer>
      <CloseIconButton onClick={onClose}>
        <AppIcon icon="Close" />
      </CloseIconButton>
      <Typography variant="h4" align="center">Categorías</Typography>
      <Typography>
        Haga click en cualquier categoría para ver sus subcategorías. Dentro encontrará los botones para editar o eliminar esa categoría.
      </Typography>
      <ShowCategories />
    </CategoriesDialogContainer>
  </Dialog>
);

export { CategoriesDialog };
