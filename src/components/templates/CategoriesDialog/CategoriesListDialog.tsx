import { useState } from 'react';
import {
  ListItemButton,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { ICON_SIZE } from '../../../constants';
import { SubcategoriesListDialog } from './SubcategoriesListDialog';
import { CategoryText } from './CategoriesDialog.styled';

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
        <CategoryText primary={categoryName} />
        {openList ? <ExpandLess sx={ICON_SIZE} /> : <ExpandMore sx={ICON_SIZE} />}
      </ListItemButton>
      <SubcategoriesListDialog categoryName={categoryName} subCategories={subCategories} openList={openList} />
    </>

  );
};

export { CategoriesListDialog };
