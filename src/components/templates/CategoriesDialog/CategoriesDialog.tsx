import { useState } from 'react';
import {
  Dialog, Typography,
} from '@mui/material';

import { ShowCategories } from './ShowCategories';
import { EditCategory } from './EditCategory';
import { DeleteCategory } from './DeleteCategory';
import { AppIcon } from '../../UI/Icons';
import { CategoryDialogAction, CategoriesModalProps } from './CategoryDialog.interface';
import { CategoryUI } from '../../../globalInterface';
import { CATEGORY_DIALOG_ACTIONS } from './CategoryDialog.constant';
import { CloseIconButton, CategoriesDialogContainer } from './CategoriesDialog.styled';

const CategoriesDialog = ({ open, onClose }: CategoriesModalProps) => {
  const [action, setAction] = useState<CategoryDialogAction>('show');
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [categoryToEdit, setcategoryToEdit] = useState<CategoryUI | null>(null);

  const updateCategoryToEdit = (newCategory: CategoryUI | null) => {
    setcategoryToEdit(newCategory);
  };
  const updateCategoryToDelete = (categoryId: string) => {
    setCategoryToDelete(categoryId);
  };
  const updateAction = (newAction: CategoryDialogAction) => {
    setAction(newAction);
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <CategoriesDialogContainer>
        <CloseIconButton onClick={onClose}>
          <AppIcon icon="Close" />
        </CloseIconButton>
        <Typography variant="h4" align="center">{CATEGORY_DIALOG_ACTIONS[action].title}</Typography>
        <Typography>
          {CATEGORY_DIALOG_ACTIONS[action].description}
        </Typography>
        { action === 'show' && (
          <ShowCategories updateCategoryToDelete={updateCategoryToDelete} updateCategoryToEdit={updateCategoryToEdit} updateAction={updateAction} />
        ) }
        { action === 'edit' && (<EditCategory categoryToEdit={categoryToEdit} />) }
        { action === 'delete' && (<DeleteCategory categoryToDelete={categoryToDelete} />) }
      </CategoriesDialogContainer>
    </Dialog>
  );
};

export { CategoriesDialog };
