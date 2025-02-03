import {
  Dialog, IconButton, Typography, List,
} from '@mui/material';
import { AppIcon } from '../../UI/Icons';
import { CategoriesListDialog } from './CategoriesListDialog';

interface CategoriesModalProps {
  open: boolean
  onClose: () => void
}

const subcategories = ['Primera subcategoría', 'Segunda subcategoría', 'Tercera subcategoría'];

const CategoriesDialog = ({ open, onClose }: CategoriesModalProps) => (
  <Dialog onClose={onClose} open={open}>
    <IconButton onClick={onClose}>
      <AppIcon icon="Close" />
    </IconButton>
    <Typography>Categorías</Typography>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-categories"
    >
      <CategoriesListDialog subCategories={subcategories} categoryName="Primera categoria" />
      <CategoriesListDialog subCategories={subcategories} categoryName="Segunda categoria" />
      <CategoriesListDialog subCategories={subcategories} categoryName="Tercera categoria" />
    </List>
  </Dialog>
);

export { CategoriesDialog };
