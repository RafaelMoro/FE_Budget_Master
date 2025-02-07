import { useState } from 'react';
import {
  ListItemButton,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { ICON_SIZE } from '../../../constants';
import { CategoriesListDialogProps } from './CategoryDialog.interface';
import { SubcategoriesListDialog } from './SubcategoriesListDialog';
import { CategoryText } from './CategoriesDialog.styled';

const CategoriesListDialog = ({
  categoryName, subCategories, categoryId, updateAction, updateEditCategory, updateCategoryToDelete,
}: CategoriesListDialogProps) => {
  const [openList, setOpenList] = useState(false);

  const handleClick = () => {
    setOpenList((prevState) => !prevState);
  };

  const handleEdit = () => {
    updateAction('edit');
    updateEditCategory(categoryId);
  };

  const handleDelete = () => {
    updateAction('delete');
    updateCategoryToDelete(categoryId);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <CategoryText primary={categoryName} />
        {openList ? <ExpandLess sx={ICON_SIZE} /> : <ExpandMore sx={ICON_SIZE} />}
      </ListItemButton>
      <SubcategoriesListDialog
        categoryName={categoryName}
        subCategories={subCategories}
        openList={openList}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </>

  );
};

export { CategoriesListDialog };
