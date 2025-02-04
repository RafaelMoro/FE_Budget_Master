import { useState, useRef } from 'react';
import {
  Dialog, Typography,
} from '@mui/material';

import { ShowCategories } from './ShowCategories';
import { EditCategory } from './EditCategory';
import { AppIcon } from '../../UI/Icons';
import { CategoryDialogAction, CategoriesModalProps } from './CategoryDialog.interface';
import { CategoryUI } from '../../../globalInterface';
import { CATEGORY_DIALOG_ACTIONS } from './CategoryDialog.constant';
import { CloseIconButton, CategoriesDialogContainer } from './CategoriesDialog.styled';

const CategoriesDialog = ({ open, onClose }: CategoriesModalProps) => {
  const [action, setAction] = useState<CategoryDialogAction>('show');
  const categoryIdRef = useRef<string>('');
  const [categoryToEdit, setcategoryToEdit] = useState<CategoryUI | null>(null);

  const updateCategoryToEdit = (newCategory: CategoryUI | null) => {
    setcategoryToEdit(newCategory);
  };
  const updateAction = (newAction: CategoryDialogAction, categoryId: string) => {
    setAction(newAction);
    categoryIdRef.current = categoryId;
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
        { action === 'show' && (<ShowCategories updateCategoryToEdit={updateCategoryToEdit} updateAction={updateAction} />) }
        { action === 'edit' && (<EditCategory categoryToEdit={categoryToEdit} />) }
      </CategoriesDialogContainer>
    </Dialog>
  );
};

export { CategoriesDialog };
