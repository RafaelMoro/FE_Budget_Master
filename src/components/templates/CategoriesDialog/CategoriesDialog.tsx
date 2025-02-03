import { useState } from 'react';
import {
  Dialog, IconButton, Typography, List, ListItemButton, ListItemText, Collapse,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { AppIcon } from '../../UI/Icons';

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
        <Collapse in={openList} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Subcategoria 1" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Dialog>
  );
};

export { CategoriesDialog };
