import { useState } from 'react';
import {
  ListItemButton, ListItemText,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { SubcategoriesListDialog } from './SubcategoriesListDialog';

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
        {openList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <SubcategoriesListDialog subCategories={subcategories} openList={openList} />
    </>

  );
};

export { CategoriesListDialog };
