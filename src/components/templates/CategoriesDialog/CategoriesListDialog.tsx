import { useState } from 'react';
import {
  ListItemButton, ListItemText,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { SubcategoriesListDialog } from './SubcategoriesListDialog';

const CategoriesListDialog = ({ categoryName }: { categoryName: string }) => {
  const [openList, setOpenList] = useState(false);

  const handleClick = () => {
    setOpenList((prevState) => !prevState);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={categoryName} />
        {openList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <SubcategoriesListDialog openList={openList} />
    </>

  );
};

export { CategoriesListDialog };
