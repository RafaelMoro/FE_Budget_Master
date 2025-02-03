import { useState } from 'react';
import {
  ListItemButton, ListItemText, IconButton,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { SubcategoriesListDialog } from './SubcategoriesListDialog';
import { ICON_SIZE } from '../../../constants';
import { AppIcon } from '../../UI/Icons';
import { AppColors, FlexContainer } from '../../../styles';

interface CategoriesListDialogProps {
  categoryName: string;
  subCategories: string[];
}

const CategoriesListDialog = ({ categoryName, subCategories }: CategoriesListDialogProps) => {
  const [openList, setOpenList] = useState(false);

  const handleClick = () => {
    setOpenList((prevState) => !prevState);
  };

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={categoryName} />
        {openList ? <ExpandLess sx={ICON_SIZE} /> : <ExpandMore sx={ICON_SIZE} />}
      </ListItemButton>
      <FlexContainer gap={2} justifyContent="center">
        <IconButton aria-label={`boton-editar-categoria-${categoryName}`} onClick={handleEdit}>
          <AppIcon icon="Edit" fillColor={AppColors.primary} />
        </IconButton>
        <IconButton aria-label={`boton-eliminar-categoria-${categoryName}`} onClick={handleDelete}>
          <AppIcon icon="Delete" fillColor={AppColors.negative} />
        </IconButton>
      </FlexContainer>
      <SubcategoriesListDialog subCategories={subCategories} openList={openList} />
    </>

  );
};

export { CategoriesListDialog };
