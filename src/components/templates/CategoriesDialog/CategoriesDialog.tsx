import { useState, useRef } from 'react';
import {
  Dialog, Typography,
} from '@mui/material';

import { CategoryDialogAction, CategoriesModalProps } from './CategoryDialog.interface';
import { CATEGORY_DIALOG_ACTIONS } from './CategoryDialog.constant';
import { AppIcon } from '../../UI/Icons';
import { CloseIconButton, CategoriesDialogContainer } from './CategoriesDialog.styled';
import { ShowCategories } from './ShowCategories';
import { EditCategory } from './EditCategory';

const CategoriesDialog = ({ open, onClose }: CategoriesModalProps) => {
  const [action, setAction] = useState<CategoryDialogAction>('show');
  const categoryIdRef = useRef<string>('');

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
        { action === 'show' && (<ShowCategories updateAction={updateAction} />) }
        { action === 'edit' && (<EditCategory />) }
      </CategoriesDialogContainer>
    </Dialog>
  );
};

export { CategoriesDialog };
