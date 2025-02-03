import { useState, useEffect } from 'react';
import {
  Dialog, Typography, List,
} from '@mui/material';

import { useCategories } from '../../../hooks';
import { CategoryUI } from '../../../globalInterface';
import { AppIcon } from '../../UI/Icons';
import { CategoriesListDialog } from './CategoriesListDialog';
import { CloseIconButton, CategoriesDialogContainer } from './CategoriesDialog.styled';

interface CategoriesModalProps {
  open: boolean
  onClose: () => void
}

const CategoriesDialog = ({ open, onClose }: CategoriesModalProps) => {
  const {
    currentData, isError, isFetching, isSuccess,
  } = useCategories();
  const [categories, setCategories] = useState<CategoryUI[]>([]);

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

  return (
    <Dialog onClose={onClose} open={open}>
      <CategoriesDialogContainer>
        <CloseIconButton onClick={onClose}>
          <AppIcon icon="Close" />
        </CloseIconButton>
        <Typography variant="h4" align="center">Categorías</Typography>
        <Typography>
          Haga click en cualquier categoría para ver sus subcategorías. Dentro encontrará los botones para editar o eliminar esa categoría.
        </Typography>
        <List
          sx={{
            width: '100%', maxWidth: 360, bgcolor: 'background.paper', justifySelf: 'center',
          }}
          component="nav"
          aria-labelledby="nested-list-categories"
        >
          {
            (categories.length === 0 && isFetching) && (
              <Typography>Cargando categorías</Typography>
            )
          }
          {
            (categories.length === 0 && isError) && (
              <Typography>Error al cargar categorías</Typography>
            )
          }
          {
            (categories.length > 0) && categories.map(({ category, subcategories, categoryId }) => (
              <CategoriesListDialog key={categoryId} subCategories={subcategories} categoryName={category} />
            ))
          }
        </List>
      </CategoriesDialogContainer>
    </Dialog>
  );
};

export { CategoriesDialog };
