import { useState } from 'react';
import {
  ListItemButton, ListItemText,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { SubcategoriesListDialog } from './SubcategoriesListDialog';
import { ICON_SIZE } from '../../../constants';

interface CategoriesListDialogProps {
  categoryName: string;
  subCategories: string[];
}

const CategoriesListDialog = ({ categoryName, subCategories }: CategoriesListDialogProps) => {
  const [openList, setOpenList] = useState(false);

  const handleClick = () => {
    setOpenList((prevState) => !prevState);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={categoryName} />
        {openList ? <ExpandLess sx={ICON_SIZE} /> : <ExpandMore sx={ICON_SIZE} />}
      </ListItemButton>
      <SubcategoriesListDialog subCategories={subCategories} openList={openList} />
    </>

  );
};

export { CategoriesListDialog };
