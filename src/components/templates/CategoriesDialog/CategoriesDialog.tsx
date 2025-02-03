import { Dialog, IconButton, Typography } from '@mui/material';
import { AppIcon } from '../../UI/Icons';

interface CategoriesModalProps {
  open: boolean
  onClose: () => void
}

const CategoriesDialog = ({ open, onClose }: CategoriesModalProps) => {
  const something = '';

  return (
    <Dialog onClose={onClose} open={open}>
      <IconButton onClick={onClose}>
        <AppIcon icon="Close" />
      </IconButton>
      <Typography>Categorías</Typography>
    </Dialog>
  );
};

export { CategoriesDialog };
