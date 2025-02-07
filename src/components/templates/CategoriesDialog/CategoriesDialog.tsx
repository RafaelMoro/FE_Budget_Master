import { useState } from 'react';
import {
  Dialog, Typography,
} from '@mui/material';

import { ShowCategories } from './ShowCategories';
import { CreateCategory, EditCategory } from './CategoryTemplate';
import { DeleteCategory } from './DeleteCategory';
import { AppIcon } from '../../UI/Icons';
import {
  CategoryDialogAction, CategoriesModalProps, CategoryError, UpdateErrorProps,
} from './CategoryDialog.interface';
import { CategoryUI } from '../../../globalInterface';
import { CATEGORY_DIALOG_ACTIONS } from './CategoryDialog.constant';
import {
  CloseIconButton, CategoriesDialogContainer, GoBackIconButton, WarningText,
} from './CategoriesDialog.styled';
import { AlertMessageSection } from '../../UI';
import { SecondaryButton } from '../../../styles';
import { SelectCategoryIcon } from './SelectCategoryIcon';

const CategoriesDialog = ({ open, onClose }: CategoriesModalProps) => {
  const [action, setAction] = useState<CategoryDialogAction>('show');
  const [error, setError] = useState<CategoryError>({ showError: false, title: '', description: '' });
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
  const changeSelectCategoryIcon = () => setAction('addSubcategoryIcon');
  const setActionCreate = () => setAction('create');
  const goBackAction = () => setAction('show');
  const updateError = ({ newTitle, newDescription }: UpdateErrorProps) => {
    setError({ showError: true, title: newTitle, description: newDescription });
  };
  const resetError = () => setError({ showError: false, title: '', description: '' });
  const closeModal = () => {
    resetError();
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <CategoriesDialogContainer>
        { action !== 'show' && (
          <GoBackIconButton aria-label="boton-ir-atras-ver-categorias" onClick={goBackAction}>
            <AppIcon icon="GoBack" />
          </GoBackIconButton>
        )}
        <CloseIconButton aria-label="boton-cerrar-dialogo-ver categorias" onClick={closeModal}>
          <AppIcon icon="Close" />
        </CloseIconButton>
        <Typography variant="h4" align="center">{CATEGORY_DIALOG_ACTIONS[action].title}</Typography>
        { error.showError && (
          <AlertMessageSection onClose={resetError} title={error.title} description={error.description} />
        )}
        <Typography>
          {CATEGORY_DIALOG_ACTIONS[action].description}
        </Typography>
        { action === 'show' && (
          <SecondaryButton onClick={setActionCreate}>Crear categoría</SecondaryButton>
        )}
        { CATEGORY_DIALOG_ACTIONS[action]?.warning && (
          <WarningText>
            {CATEGORY_DIALOG_ACTIONS[action].warning}
          </WarningText>
        ) }
        { action === 'show' && (
          <ShowCategories updateCategoryToDelete={updateCategoryToDelete} updateCategoryToEdit={updateCategoryToEdit} updateAction={updateAction} />
        ) }
        { action === 'edit' && (
          <EditCategory
            goBackAction={goBackAction}
            categoryToEdit={categoryToEdit}
            updateError={updateError}
            changeSelectCategoryIconFn={changeSelectCategoryIcon}
          />
        ) }
        { action === 'create' && (
          <CreateCategory changeSelectCategoryIconFn={changeSelectCategoryIcon} goBackAction={goBackAction} updateError={updateError} />
        )}
        { action === 'delete' && (<DeleteCategory updateError={updateError} goBackAction={goBackAction} categoryToDelete={categoryToDelete} />) }
        { action === 'addSubcategoryIcon' && (
          <SelectCategoryIcon />
        )}
      </CategoriesDialogContainer>
    </Dialog>
  );
};

export { CategoriesDialog };
