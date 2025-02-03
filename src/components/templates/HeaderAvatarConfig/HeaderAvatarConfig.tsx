import { useState } from 'react';
import {
  IconButton, Menu, Typography, Tooltip,
} from '@mui/material';
import { Avatar, MenuItem } from '../../../styles';
import { CategoriesDialog } from '../CategoriesDialog';

interface HeaderAvatarConfigProps {
  initials: string | undefined;
  signOut: () => void
}

const HeaderAvatarConfig = ({ initials, signOut }: HeaderAvatarConfigProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openCategoriesDialog, setOpenCategoriesDialog] = useState(false);
  const currentInitials = initials ?? 'DE';

  const toggleCategoriesDialog = () => setOpenCategoriesDialog((prevState) => !prevState);
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
      <CategoriesDialog onClose={toggleCategoriesDialog} open={openCategoriesDialog} />
    </>
  );
};

export { HeaderAvatarConfig };
