import {
  Dialog, IconButton, Typography, List, ListItemButton, ListItemText,
} from '@mui/material';
import { AppIcon } from '../../UI/Icons';
import { CategoriesListDialog } from './CategoriesListDialog';

interface CategoriesModalProps {
  open: boolean
  onClose: () => void
}

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
      <ListItemButton>
        <ListItemText primary="Primera categoria" />
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Segunda categoria" />
      </ListItemButton>
      <CategoriesListDialog categoryName="Tercera categoria" />
    </List>
  </Dialog>
);

export { CategoriesDialog };
