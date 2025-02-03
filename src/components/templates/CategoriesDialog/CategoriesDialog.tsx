import { useState } from 'react';
import {
  Dialog, IconButton, Typography, List, ListItemButton, ListItemText,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { AppIcon } from '../../UI/Icons';
import { SubcategoriesListDialog } from './SubcategoriesListDialog';

interface CategoriesModalProps {
  open: boolean
  onClose: () => void
}

const CategoriesDialog = ({ open, onClose }: CategoriesModalProps) => {
  const [openList, setOpenList] = useState(true);

  const handleClick = () => {
    setOpenList((prevState) => !prevState);
  };

  return (
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
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Tercera categoria" />
          {openList ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <SubcategoriesListDialog openList={openList} />
      </List>
    </Dialog>
  );
};

export { CategoriesDialog };
