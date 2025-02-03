import { useState } from 'react';
import {
  ListItemButton, ListItemText,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { SubcategoriesListDialog } from './SubcategoriesListDialog';
import { ICON_SIZE } from '../../../constants';

const CategoriesListDialog = ({ categoryName }: { categoryName: string }) => {
  const [openList, setOpenList] = useState(false);
  const subcategories = ['Primera subcategoría', 'Segunda subcategoría', 'Tercera subcategoría'];

  const handleClick = () => {
    setOpenList((prevState) => !prevState);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={categoryName} />
        {openList ? <ExpandLess sx={ICON_SIZE} /> : <ExpandMore sx={ICON_SIZE} />}
      </ListItemButton>
      <SubcategoriesListDialog subCategories={subcategories} openList={openList} />
    </>

  );
};

export { CategoriesListDialog };
