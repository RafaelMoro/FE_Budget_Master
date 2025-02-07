import { useState } from 'react';
import {
  IconButton, Menu, Typography, Tooltip,
} from '@mui/material';
import { Avatar, MenuItem } from '../../../styles';
import { CategoriesDialog } from '../CategoriesDialog';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { toggleCategoryDialog } from '../../../redux/slices/userInterface.slice';

interface HeaderAvatarConfigProps {
  initials: string | undefined;
  signOut: () => void
}

const HeaderAvatarConfig = ({ initials, signOut }: HeaderAvatarConfigProps) => {
  const dispatch = useAppDispatch();
  const openCategoryDialog = useAppSelector((state) => state.userInterface.openCategoriesDialog);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const currentInitials = initials ?? 'DE';

  const toggleCategoriesDialog = () => dispatch(toggleCategoryDialog());
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenCategories = () => {
    handleClose();
    toggleCategoriesDialog();
  };

  return (
    <>
      <Tooltip title={
        <Typography>Abrir configuración</Typography>
              }
      >
        <IconButton aria-label="open-configuration-button" onClick={handleMenu}>
          <Avatar>{currentInitials}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenCategories}>Categorías</MenuItem>
        <MenuItem onClick={signOut}>Cerrar sesión</MenuItem>
      </Menu>
      <CategoriesDialog onClose={toggleCategoriesDialog} open={openCategoryDialog} />
    </>
  );
};

export { HeaderAvatarConfig };
