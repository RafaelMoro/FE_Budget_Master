import { useState } from 'react';
import {
  IconButton, Menu, Typography, Tooltip,
} from '@mui/material';
import { Avatar, MenuItem } from '../../../styles';

interface HeaderAvatarConfigProps {
  initials: string | undefined;
  signOut: () => void
}

const HeaderAvatarConfig = ({ initials, signOut }: HeaderAvatarConfigProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const currentInitials = initials ?? 'DE';

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleClose}>Categorías</MenuItem>
        <MenuItem onClick={signOut}>Cerrar sesión</MenuItem>
      </Menu>
    </>
  );
};

export { HeaderAvatarConfig };
