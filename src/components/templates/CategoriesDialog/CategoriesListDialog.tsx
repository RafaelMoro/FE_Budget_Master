import { useState } from 'react';
import {
  ListItemButton, ListItemText,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { ICON_SIZE } from '../../../constants';
import { SubcategoriesListDialog } from './SubcategoriesListDialog';

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
      <SubcategoriesListDialog categoryName={categoryName} subCategories={subCategories} openList={openList} />
    </>

  );
};

export { CategoriesListDialog };
