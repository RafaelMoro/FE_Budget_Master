import { useState, useEffect } from 'react';
import {
  Typography, List,
} from '@mui/material';

import { CategoryUI } from '../../../globalInterface';
import { ShowCategoriesProps } from './CategoryDialog.interface';
import { useCategories } from '../../../hooks';
import { CategoriesListDialog } from './CategoriesListDialog';
import { SecondaryButton } from '../../../styles';
import { CategoriesSkeleton } from './CategoriesSkeleton';
import { ERROR_MESSAGE_FETCH_CATEGORY, ERROR_MESSAGE_GENERAL } from '../../../constants';

const ShowCategories = ({
  updateAction, updateCategoryToEdit, updateCategoryToDelete, setActionCreate, updateError, error,
}: ShowCategoriesProps) => {
  const {
    currentData, isError, isFetching, isSuccess,
  } = useCategories();
  const [categories, setCategories] = useState<CategoryUI[]>([]);

  const updateEditCategory = (categoryId: string) => {
    const newCategorySelected = categories.find((category) => category.categoryId === categoryId) ?? null;
    updateCategoryToEdit(newCategorySelected);
  };

  useEffect(() => {
    if (isSuccess && currentData) {
      const newCategories: CategoryUI[] = currentData?.map((category) => ({
        category: category.categoryName,
        categoryId: category._id,
        subcategories: category.subCategories,
      }));
      setCategories(newCategories);
    }
  }, [currentData, isSuccess]);

  useEffect(() => {
    // The condition means that the error is not shown yet but there's an error
    if (isError && !error) {
      updateError({ newTitle: ERROR_MESSAGE_FETCH_CATEGORY, newDescription: ERROR_MESSAGE_GENERAL });
    }
  }, [error, isError, updateError]);

  return (
    <List
      sx={{
        width: '100%', maxWidth: 360, bgcolor: 'background.paper', justifySelf: 'center',
      }}
      component="nav"
      aria-labelledby="nested-list-categories"
    >
      {
            (categories.length === 0 && isFetching) && Array.from({ length: 10 }).map((_, index) => (
              <CategoriesSkeleton key={`${index + 1}-skeleton`} />
            ))
          }
      { (categories.length === 0 && isSuccess) && (
        <>
          <Typography>No tiene categorías creadas aún. Empiece creando una categoría.</Typography>
          <SecondaryButton onClick={setActionCreate}>Crear categoría</SecondaryButton>
        </>
      )}
      {
            (categories.length > 0) && categories.map(({ category, subcategories, categoryId }) => (
              <CategoriesListDialog
                updateAction={updateAction}
                key={categoryId}
                categoryId={categoryId}
                subCategories={subcategories}
                categoryName={category}
                updateEditCategory={updateEditCategory}
                updateCategoryToDelete={updateCategoryToDelete}
              />
            ))
          }
    </List>
  );
};

export { ShowCategories };
